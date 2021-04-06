---
layout:       blog
title:        "JPA Pitfalls / Mistakes"
authors:      Lorenzo Dee
tags:         [java, jpa]
header-image: /assets/images/2016-09-13-jpa-pitfalls-mistakes/JPAPitfallsMistakes-ArticleBlogBanner.png
---

*Learn the common pitfalls/mistakes encountered that caused some problems in Java-based systems that use JPA.*

From my experience, both in helping teams and conducting training, here are some pitfalls/mistakes I have encountered that caused some problems in Java-based systems that use JPA.

- Requiring a public no-arg constructor
- Always using bi-directional associations/relationships
- Using `@OneToMany` for collections that can become huge

## Requiring a Public No-arg Constructor

Yes, a JPA `@Entity` requires a zero-arguments (or default no-args) constructor. **But this can be made `protected`. You do not have to make it `public`.** This allows better object-oriented modeling, since you are not forced to have a publicly accessible zero-arguments constructor.

> The entity class must have a no-arg constructor. The entity class may have other constructors as well. The no-arg constructor must be public **or protected**. [emphasis mine]
>
> from Section 2.1 of the [Java Persistence API 2.1 Specification (Oracle)](https://download.oracle.com/otn-pub/jcp/persistence-2_1-fr-eval-spec/JavaPersistence.pdf?AuthParam=1617591159_51c8726d040c0ccd77d82880e821e2c0){:target="_blank"}

If the entity being modeled has some fields that need to be initialized when it is created, this should be done through its constructor.

<aside class="float-md-right mb-md-3 ml-md-3 mb-3 p-3 col-md-4" style="border: 1px solid #ccc; border-radius: 4px">
NOTE: Some JPA providers may overcome a missing no-arg constructor by adding one at build time.
</aside>

Let's say we're modeling a hotel room reservation system. In it, we probably have entities like room, reservation, etc. The reservation entity will likely require start and end dates, since it would not make much sense to create one without the period of stay. Having the start and end dates included as arguments in the reservation's constructor would allow for a better model. Keeping a protected zero-arguments constructor would make JPA happy.

```java
@Entity
public class Reservation { ...
  public Reservation(
      RoomType roomType, DateRange startAndEndDates) {
    if (roomType == null || startAndEndDates == null) {
      throw new IllegalArgumentException(...);
    } ...
  }
  ...
  protected Reservation() { /* as required by ORM/JPA */ }
}
```

<aside class="float-md-right mb-md-3 ml-md-3 mb-3 p-3 col-md-4" style="border: 1px solid #ccc; border-radius: 4px">
NOTE: Hibernate (a JPA provider) allows the zero-arguments constructor to be made private. This makes your JPA code non-portable to other JPA providers.
</aside>

It also helps to add a comment in the zero-arguments constructor to indicate that it was added for JPA-purposes (technical infrastructure), and that it is not required by the domain (business rules/logic).

Although I could not find it mentioned in the JPA 2.1 spec, embeddable classes also require a default (no-args) constructor. And just like entities, the required no-args constructor can be made *`protected`*.

```java
@Embeddable
public class DateRange { ...
  public DateRange(Date start, Date end) {
    if (start == null || end == null) {
      throw new IllegalArgumentException(...);
    }
    if (start.after(end)) {
      throw new IllegalArgumentException(...);
    } ...
  }
  ...
  protected DateRange() { /* as required by ORM/JPA */ }
}
```
The [DDD sample project](https://github.com/citerus/dddsample-core){:target="_blank"} also hides the no-arg constructor by making it package scope (see [Cargo](https://github.com/citerus/dddsample-core/blob/master/src/main/java/se/citerus/dddsample/domain/model/cargo/Cargo.java){:target="_blank"} entity class where no-arg constructor is near the bottom).

## Always Using Bi-directional Associations/Relationships

Instructional material on JPA often show a bi-directional association. But this is not required. For example, let's say we have an order entity with one or more items.

```java
@Entity
public class Order {
  @Id private Long id;
  @OneToMany private List<OrderItem> items;
  ...
}
 
@Entity
public class OrderItem {
  @Id private Long id;
  @ManyToOne private Order order;
  ...
}
```

It's good to know that bi-directional associations are supported in JPA. But in practice, it becomes a maintenance nightmare. If order items do not have to know its parent order object, a uni-directional association would suffice (as shown below). The ORM just needs to know how to name the foreign key column in the many-side table. This is provided by adding the `@JoinColumn` annotation on the one-side of the association.

```java
@Entity
public class Order {
  @Id Long id;
  @OneToMany
  @JoinColumn(name="order_id", ...)
  private List<OrderItem> items;
  ...
}
 
@Entity
public class OrderItem {
  @Id private Long id;
  // @ManyToOne private Order order;
  ...
}
```

Making it uni-directional makes it easier since the `OrderItem` no longer needs to keep a reference to the `Order` entity.

Note that there may be times when a bi-directional association is needed. In practice, this is quite rare.

Here's another example. Let's say you have several entities that refer to a country entity (e.g. person's place of birth, postal address, etc.). Obviously, these entities would reference the country entity. But would country have to reference all those different entities? Most likely, not.

```java
@Entity
public class Person {
  @Id Long id;
  @ManyToOne private Country countryOfBirth;
  ...
}
 
@Entity
public class PostalAddress {
  @Id private Long id;
  @ManyToOne private Country country;
  ...
}
 
@Entity
public class Country {
  @Id ...;
  // @OneToMany private List<Person> persons;
  // @OneToMany private List<PostalAddress> addresses;
}
```

**So, just because JPA supports bi-directional association does not mean you have to!**

## Using `@OneToMany` For Collections That Can Become Huge

Let's say you're modeling bank accounts and its transactions. Over time, an account can have thousands (if not millions) of transactions.

```java
@Entity
public class Account {
  @Id Long id;
  @OneToMany
  @JoinColumn(name="account_id", ...)
  private List<AccountTransaction> transactions;
  ...
}
 
@Entity
public class AccountTransaction {
  @Id Long id;
  ...
}
```

<img border="0" src="/assets/images/2021-02-18-basic-image-editing-with-gimp/JPAPitfallsMistakes-contentImage.png" style="display: block; float: right; margin: 1em 0 1em 1em">

With accounts that have only a few transactions, there doesn't seem to be any problem. But over time, when an account contains thousands (if not millions) of transactions, you'll most likely experience out-of-memory errors. So, what's a better way to map this?

**If you cannot ensure the maximum number of elements in the many-side of the association can all be loaded in memory, better use the `@ManyToOne` on the opposite side of the association.**

```java
@Entity
public class Account {
  @Id Long id;
  // @OneToMany private List<AccountTransaction> transactions;
  ...
}
 
@Entity
public class AccountTransaction {
  @Id Long id;
  @ManyToOne
  private Account account;
  ...
  public AccountTransaction(Account account, ...) {...}
 
  protected AccountTransaction() { /* as required by ORM/JPA */ }
}
```

To retrieve the possibly thousands (if not millions) of transactions of an account, use a repository that supports pagination.

```java
@Transactional
public interface AccountTransactionRepository {
  Page<AccountTransaction> findByAccount(
    Long accountId, int offset, int pageSize);
  ...
}
```

To support pagination, use the `Query` object's `setFirstResult(int)` and `setMaxResults(int)` methods.

## Summary

I hope these notes can help developers avoid making these mistakes. To summarize:

- ~~Requiring a public~~ The JPA-required no-arg constructor can be made `public` or `**protected**`. Consider making it `protected` if needed.
- ~~Always using~~ Consider uni-directional over bi-directional associations/relationships.
- ~~Using~~ Avoid `@OneToMany` for collections that can become huge. Consider mapping the `@ManyToOne`-side of the association/relationship instead, and support pagination.

Originally posted at: [JPA Pitfalls / Mistakes](https://lorenzo-dee.blogspot.com/search?q=JPA+Pitfalls%2FMistakes){:target="_blank"}


