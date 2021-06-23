---
layout:       blog
title:        "Changing The Way We Use JPA"
authors:      Lorenzo Dee
tags:         [domain-driven-design, java, JPA]
header-image: /assets/images/2021-06-24-changing-the-way-we-use-JPA/ChangingTheWayWeUse-JPA-Banner.png
---
I've been updating some training materials recently, and thinking about better ways of teaching and talking about JPA. One of the things I've been thinking about is how we have typically used JPA, and how that should change given the pains I've experienced (and observed).

JPA is often seen as a set of annotations (or XML files) that provide O/R (object-relational) mapping information. And most developers think that the more mapping annotations they know and use, the more benefits they get. But the past few years of wrestling with small to medium monoliths/systems (with about 200 tables/entities) have taught me something else.

## TL;DR

1. Reference entities by ID (only map entity relationships *within* an aggregate)
2. Don't let JPA steal your Identity (avoid `@GeneratedValue` when you can)
3. Use ad-hoc joins to join unrelated entities

## Reference Entities by Identifier
*Only map entity relationships **within** an aggregate.*

Tutorials (and training) would typically go about teaching and covering all possible relationship mappings. After basic mappings, many would start from simple uni-directional `@ManyToOne` mapping. Then proceed to bi-directional `@OneToMany` and `@ManyToOne`. Unfortunately, most often than not, they fail to explicitly point out that it is perfectly fine to not map the relationship. So, beginners would often complete the training thinking that it would be a mistake to not map a related entity. They mistakenly think that a foreign key field must be mapped as a related entity.

In fact, it is not an error, if you change the `@ManyToOne` mapping below…

```java
@Entity
public class SomeEntity {
    // ...
    @ManyToOne private Country country;
    // ...
}
 
@Entity
public class Country {
    @Id private String id; // e.g. US, JP, CN, CA, GB, PH
    // ...
}
```

…into a basic field that contains the primary key value of the *related* entity.

```java
@Entity
public class SomeEntity {
    // ...
    @Column private String countryId;
    // ...
}
 
@Entity
public class Country {
    @Id private String id; // e.g. US, JP, CN, CA, GB, PH
    // ...
}
```

*Why is this a problem?*

Mapping all entity relationships increases the chances of unwanted traversals that usually lead to unnecessary memory consumption. This also leads to an unwanted cascade of `EntityManager` operations.

This may not be much if you're dealing with just a handful of entities/tables. But it becomes a maintenance nightmare when working with dozens (if not hundreds) of entities.

*When do you map a related entity?*

Map related entities only when they are `within` an [Aggregate](https://martinfowler.com/bliki/DDD_Aggregate.html){:target="_blank"} (in DDD).


> Aggregate is a pattern in Domain-Driven Design. A DDD aggregate is a cluster of domain objects that can be treated as a single unit. An example may be an order and its line-items, these will be separate objects, but it's useful to treat the order (together with its line items) as a single aggregate.
>
> [https://martinfowler.com/bliki/DDD_Aggregate.html](https://martinfowler.com/bliki/DDD_Aggregate.html){:target="_blank"}

```java
@Entity
public class Order {
    // ...
    @OneToMany(mappedBy = "order", ...) private List<OrderItem> items;
    // ...
}
 
@Entity
public class OrderItem {
    // ...
    @ManyToOne(optional = false) private Order order;
    // ...
}
```

More modern approaches to aggregate design (see Vaughn Vernon's *Implementing Domain-Driven Design*) advocate a cleaner separation between aggregates. It is a good practice to refer to an aggregate root by storing its ID (unique identifier), not a full reference.

If we expand the simple order example above, the line-item (`OrderItem` class) should not have a `@ManyToOne` mapping to the product (since it is another aggregate in this example). Instead, it should just have the ID of the product.

```java
@Entity
public class Order {
    // ...
    @OneToMany(mappedBy = "order", ...) private List<OrderItem> items;
    // ...
}
 
@Entity
public class OrderItem {
    // ...
    @ManyToOne(optional = false) private Order order;
    // @ManyToOne private Product product; // <-- Avoid this!
    @Column private ... productId;
    // ...
}
```
But… what if the `Product` (aggregate root entity) has its `@Id` field mapped as `@GeneratedValue`? Are we forced to persist/flush first and then use the generated ID value?

And, what about joins? Can we still join those entities in JPA?

## Don't Let JPA Steal Your `Id`entity

Using `@GeneratedValue` may initially make the mapping simple and easy to use. But when you start referencing other entities by ID (and not by mapping a relationship), it becomes a challenge.

If the `Product` (aggregate root entity) has its `@Id` field mapped as `@GeneratedValue`, then calling `getId()` may return `null`. When it returns `null`, the line-item (`OrderItem` class) will not be able to reference it!

In an environment where all entities always have a non-`null` `Id` field, referencing any entity by ID becomes easier. Furthermore, having non-`null` `Id` fields all the time, makes `equals(Object)` and `hashCode()` easier to implement.

And because all `Id` fields become explicitly initialized, all (aggregate root) entities have a `public` constructor that accepts the `Id` field value. And, as I've [posted long ago](/blogs/2016/09/jpa-pitfalls-mistakes){:target="_blank"}, a `protected` no-args constructor can be added to keep JPA happy.

```java
@Entity
public class Order {
    @Id private Long id;
    // ...
    public Order(Long id) {
        // ...
        this.id = id;
    }
    public Long getId() { return id; }
    // ...
    protected Order() { /* as required by ORM/JPA */ }
}
```
While writing this post, I found an article by James Brundege (posted back in 2006), [Don't Let Hibernate Steal Your Identity](https://web.archive.org/web/20171211235806/http://www.onjava.com/pub/a/onjava/2006/09/13/dont-let-hibernate-steal-your-identity.html){:target="_blank"} (thanks to Wayback Machine), where he says, Don't let Hibernate manage your ids. I wish I heeded his advice earlier.

But beware! When using Spring Data JPA to `save()` an entity that does not use `@GeneratedValue` on its `@Id` field, an unnecessary SQL `SELECT` is issued before the expected `INSERT`. This is due to `SimpleJpaRepository`'s `save()` method (shown below). It relies on the presence of the `@Id` field (non-`null` value) to determine whether to call `persist(Object)` or `merge(Object)`.

```java
public class SimpleJpaRepository // ...
    @Override
    public <S extends T> save(S entity) {
        // ...
        if (entityInformation.isNew(entity)) {
            em.persist(entity);
            return entity;
        } else {
            return em.merge(entity);
        }
    }
}
```

The astute reader will notice that, if the `@Id` field is never `null`, the `save()`method will always call `merge()`. This causes the unnecessary SQL `SELECT` (before the expected `INSERT`).

Fortunately, the work-around is simple — implement `Persistable<ID>`.

```java
@MappedSuperclass
public abstract class BaseEntity<ID> implements Persistable<ID> {
    @Transient
    private boolean persisted = false;
    @Override
    public boolean isNew() {
        return !persisted;
    }
    @PostPersist
    @PostLoad
    protected void setPersisted() {
        this.persisted = true;
    }
}

```
The above also implies that *all* updates to entities must be done by loading the existing entity into the persistence context first, and applying changes to the *managed* entity.

## Use Ad-hoc Joins to Join Unrelated Entities

And, what about joins? Now that we reference other entities by ID, how can we join unrelated entities in JPA?

In JPA version 2.2, unrelated entities *cannot* be joined. However, I cannot confirm if this has become a standard in version 3.0, where all `javax.persistence` references were renamed to `jakarta.persistence`.

Given the `OrderItem` entity, the absence of the `@ManyToOne` mapping causes it to fail to be joined with the `Product` entity.

```java
@Entity
public class Order {
    // ...
}
 
@Entity
public class OrderItem {
    // ...
    @ManyToOne(optional = false) private Order order;
    @Column private ... productId;
    // ...
}
```
Thankfully 😊, [Hibernate 5.1.0+](https://in.relation.to/2016/02/10/hibernate-orm-510-final-release/){:target="_blank"} (released back in 2016) and [EclipseLink 2.4.0+](https://wiki.eclipse.org/EclipseLink/UserGuide/JPA/Basic_JPA_Development/Querying/JPQL#ON){:target="_blank"} (released back in 2012) have been supporting joins of unrelated entities. These joins are also referred to as *ad-hoc joins*.

<pre>
SELECT o
  FROM Order o
  JOIN o.items oi
  JOIN Product p ON (p.id = oi.productId) -- supported in Hibernate and EclipseLink
</pre>

Also, this has been raised as an API issue ([Support JOIN/ON for two root entities](https://github.com/eclipse-ee4j/jpa-api/issues/128){:target="_blank"}). I really hope that it will become a standard soon.

In Closing
What do you think about the above changes? Are you already using similar approaches? Do you use native SQL to explicitly retrieve a generated value (e.g. sequence object) to create an entity with a non-`null` `Id` field? Do you use entity-specific ID types to differentiate ID values? Let me know in the comments below.  

Originally posted at: [Changing The Way We Use JPA](https://lorenzo-dee.blogspot.com/2021/06/changing-way-we-use-jpa.html){:target="_blank"}
