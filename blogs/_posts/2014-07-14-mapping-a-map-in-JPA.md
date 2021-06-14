---
layout:       blog
title:        "Mapping a Map in JPA"
authors:      Lorenzo Dee
tags:         [JPA, java]
header-image: /assets/images/2014-07-14-mapping-a-map-in-JPA/MappingAMapInJPA-Banner.png
---
It's common to see a `java.util.List` being used for a `to-many` mapping (with ORM). And it's also common to need to get an element in that list using some key. So, I thought, why not use a `java.util.Map` instead (and still maintain the `to-many` mapping)?

As I found out, it's not often used, but quite easy to do. So, I'm sharing what we learned here (applying it to a fictitious case of a library app).

## Mapping a Map in JPA
In our library app, we have books and copies of them. One book can have one or more copies. The resulting tables should look something like this.

| Book                                          |
|-----------------------------------------------|
| ID (auto-generated primary key)               |
| TITLE                                         |
| *Other columns like author, publisher, etc.*  |	

| Copy                                |
|-------------------------------------|
| ID (auto-generated primary key)     |
| BOOK_ID (foreign key to Book table) |
| COPY_REF_ID                         |	
| STATUS                              |


In UML, it would look something like this.

![UML Class Diagram](/assets/images/2014-07-14-mapping-a-map-in-JPA/UMLclassDiagram.png "UML Class Diagram")

And the JPA code would look something like this.

```java
@Entity
public class Book {
 
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @Column(name="ID")
  private Long id;
 
  private String title;
 
  @OneToMany(orphanRemoval=true)
  @MapKey(name="referenceId")
  @JoinColumn(name="BOOK_ID", referencedColumnName="ID")
  private Map<String, Copy> copies;
 
  ...
 
  public void borrowCopy(String referenceId) {
    Copy copy = this.copies.get(referenceId);
    if (copy != null) {
      copy.borrowCopy();
    }
  }
  ...
}
```

```java
@Entity
@Table(uniqueConstraints=@UniqueConstraint(
        columnNames = {"BOOK_ID", "COPY_REF_ID"}))
public class Copy {
 
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  @Column(name="ID")
  private Long id;
 
  @Column(name="COPY_REF_ID")
  private String referenceId;
  ...
 
  public void borrowCopy() {...}
  public void returnCopy() {...}
}
```
The other important bit to make the one-to-many `Map` work is the `@MapKey` annotation. This tells the ORM to use that field (of `Copy`) as the key to the `Map`. To ensure that the `referenceId` will be unique for copies of a particular book, we've added a unique constraint on the `Copy` entity.

## Unidirectional One-to-Many
Notice that I'm using a unidirectional one-to-many mapping. Although this is not necessary when mapping a map, this unidirectional one-to-many mapping can make things simpler, since the `Copy` object does not need to have a reference to the `Book` object. This is achieved by removing the `@ManyToOne` annotation on the `Copy` object, and adding a `@JoinColumn` to the `@OneToMany` annotation in the `Book` object. This tells the ORM the column name to use on the many-side of the relationship. In the example above, I've instructed the ORM to use a column named `BOOK_ID` on the `Copy` table (the many-side of the relationship, since one book can have many copies).

## Lazy Collections
My colleague ([Juno Aliento](https://currents.google.com/108603150488137710491){:target="_blank"}) pointed this out to me (`@LazyCollection(LazyCollectionOption.EXTRA)`). This is useful when you don't want the entire collection (or map, as in this case) to be loaded because you're doing a `size()`.

Note that this is Hibernate-specific, and may not be available in other JPA providers.

As of release 3.2, Hibernate can perform per-item lazy initialization of collections. The reference documentation mentions it [here](https://docs.jboss.org/hibernate/orm/3.5/reference/en/html/performance.html#performance-fetching){:target="_blank"}. When the association mapping (`OneToMany or ManyToMany`) is set to `lazy="extra"`, the collection implementation for the mapping takes on "smart" collection behavior, i.e. some collection operations such as size(), contains(), get(), etc. do not trigger collection initialization. This is only sensible for very large collections, but it's quite handy nonetheless.

Originally posted at: [Mapping a Map in JPA](https://lorenzo-dee.blogspot.com/2014/04/mapping-map-in-jpa.html){:target="_blank"}