---
layout:       blog
title:        "Architectural Layers and Modeling Domain Logic"
authors:      Lorenzo Dee
tags:         [domain-driven-design, java, jpa]
header-image: /assets/images/2016-11-14-architectural-layers-and-modeling-domain-logic/ArchitecturalLayersAndModelingDomainLogic-BannerImage.png
---
*Lorenzo corrects the impression that the domain model pattern is always the best to use. He provides options and tips on when to use (and not to use) the domain model pattern.*

As I was discussing the PoEAA patterns used to model domain logic (i.e. transaction script, table module, domain model), I noticed that people get the impression (albeit wrong impression) that the domain model pattern is best. So, they set out to apply it on everything.

## Not Worthy of Domain Model Pattern

Let's get real. The majority of sub-systems are CRUD-based. Only a certain portion of the system requires the domain model implementation pattern. Or, put it in another way, there are parts of the application that just needs forms over data, and some validation logic (e.g. required/mandatory fields, min/max values on numbers, min/max length on text). For these, the domain model is not worth the effort.

For these, perhaps an anemic domain model would fit nicely.

## Anemic Domain Model Isn't As Bad As It Sounds

The anemic domain model isn't as bad as it sounds. There, I said it (at least here in my blog post).

But how does it look like?

![Class Diagram](/assets/images/2016-11-14-architectural-layers-and-modeling-domain-logic/Class-Diagram1.png "Class Diagram")

```java
package com.acme.bc.domain.model;
...
@Entity
class Person {
  @Id ... private Long id;
  private String firstName;
  private String lastName;
  // ...
  // getters and setters
}
...
interface PersonRepository /* extends CrudRepository<Person, Long> */ {
  // CRUD methods (e.g. find, find/pagination, update, delete)
}
```

```java
package com.acme.bc.infrastructure.persistence;
...
class PersonRepositoryJpa implements PersonRepository {
  ...
}
```

In the presentation layer, the controllers can have access to the repository. The repository does its job of abstracting persistence details.

```java
package com.acme.bc.interfaces.web;
 
@Controller
class PersonsController {
  private PersonRepository personRepository;
  public PersonsController(PersonRepository personRepository) {...}
  // ...
}
```

In this case, having the `Person` class exposed to the presentation layer is perfectly all right. The presentation layer can use it directly, since it has a public zero-arguments constructor, getters and setters, which are most likely needed by the view.

And there you have it. A simple CRUD-based application.

Do you still need a service layer? No. Do you still need DTO (data transfer objects)? No. In this simple case of CRUD, you don't need additional services or DTOs.

Yes, the `Person` looks like a domain entity. But it does not contain logic, and is simply used to transfer data. So, it's really just a DTO. But this is all right since it does the job of holding the data stored-to and retrieved-from persistence.

Now, if the business logic starts to get more complicated, some entities in the initially anemic domain model can become richer with behavior. And if so, those entities can merit a domain model pattern.

## Alternative to Anemic Domain Model

As an alternative to the anemic domain model (discussed above), the classes can be moved out of the domain logic layer and in to the presentation layer. Instead of naming it `PersonRepository`, it is now named `PersonDao`.

![Class Diagram](/assets/images/2016-11-14-architectural-layers-and-modeling-domain-logic/Class-Diagram0.png "Class Diagram")

```java
package com.acme.bc.interfaces.web;
 
@Entity
class Person {...}
 
@Controller
class PersonsController {
  private PersonDao personDao;
  public PersonsController(PersonDao personDao) {...}
  // ...
}
 
interface PersonDao /* extends CrudRepository<Person, Long> */ {
  // CRUD methods (e.g. find, find/pagination, update, delete)
}
```

```java
package com.acme.bc.infrastructure.persistence;
 
class PersonDaoJpa implements PersonDao {
  ...
}
```

## Too Much Layering

I think that it would be an overkill if you have to go through a mandatory application service that does not add value.

```java
package com.acme.bc.interfaces.web;
...
@Controller
class PersonsController {
  private PersonService personService;
  public PersonsController(PersonService personService) {...}
  // ...
}
```

```java
package com.acme.bc.application;
...
@Service
class PersonService {
  private PersonRepository personRepository;
  public PersonService(PersonRepository personRepository) {...}
  // expose repository CRUD methods and pass to repository
  // no value add
}
```

<aside class="float-md-right my-md-3 ml-md-3 mb-3" style="max-width: 30rem; padding: 1rem; border: 1px solid #ccc; border-radius: 4px">
<p>Keep the repository in the <code>domain.model</code> package. Place the repository implementations in another package (e.g. <code>infrastructure.persistence</code>). But why?</p>
<p class="mb-0">The <code>domain.model</code> package is where the repository is defined. The elements in the domain model dictate what methods are needed in the repository interface definition. Thus, the repository definition is placed in the <code>domain.model</code> package. The repository implementations need to follow what new methods are added (or remove unused ones). This packaging follows the dependency inversion principle. The <code>infrastructure.persistence</code> package depends on the <code>domain.model</code> package, and not the other way around.</p>
</aside>

## Application Services for Transactions

So, when would application services be appropriate? The application services are responsible for driving workflow and coordinating transaction management (e.g. by use of the declarative transaction management support in Spring).

If you find the simple CRUD application needing to start transactions in the presentation-layer controller, then it might be a good sign to move them into an application service. This usually happens when the controller needs to update more than one entity that does not have a single root. The usual example here is transferring amounts between bank accounts. A transaction is needed to ensure that debit and credit both succeed, or both fail.

![Application Services for Transactions](/assets/images/2016-11-14-architectural-layers-and-modeling-domain-logic/Class-Diagram2.png "Application Services for Transactions")
{:style="min-width: 640px;"}
{:style="overflow: auto"}

```java
package sample.domain.model;
...
@Entity
class Account {...}
...
interface AccountRepository {...}
```

```java
package sample.interfaces.web;
...
@Controller
class AccountsController {
  private AccountRepository accountRepository;
  ...
  @Transactional
  public ... transfer(...) {...}
}
```

If you see this, then it might be a good idea to move this (from the presentation layer) to an application-layer service.

```java
package sample.interfaces.web;
...
@Controller
class AccountsController {
  private AccountRepository accountRepository;
  private TransferService transferService;
  ...
  public ... transfer(...) {...}
}

```

```java
package sample.application;
...
@Service
@Transactional
class TransferService {
  private AccountRepository accountRepository;
  ...
  public ... transfer(...) {...}
}
```

```java
package sample.domain.model;
...
@Entity
class Account {...}
...
interface AccountRepository {...}
```

## Domain Model Pattern (only) for Complex Logic

I'll use the double-entry accounting as an example. But I'm sure there are more complex logic that's better suited.

Let's say we model journal entries and accounts as domain entities. The account contains a balance (a monetary amount). But this amount is not something that one would simply set. A journal entry needs to be created. When the journal entry is posted, it will affect the specified accounts. The account will then update its balance.

```java
package ….accounting.domain.model;
...
/** Immutable */
@Entity
class JournalEntry {
  // zero-sum items
  @ElementCollection
  private Collection<JournalEntryItem> items;
  ...
}
...
/** A value object */
@Embeddable
class JournalEntryItem {...}
...
interface JournalEntryRepository {...}
...
@Entity
class Account {...}
...
interface AccountRepository {...}
...
@Entity
class AccountTransaction {...}
...
interface AccountTransactionRepository {...}
```

Now, in this case, a naive implementation would have a presentation-layer controller create a journal entry object, and use a repository to save it. And at some point in time (or if auto-posting is used), the corresponding account transactions are created, with account balances updated. All this needs to be rolled into a transaction (i.e. all-or-nothing).

Again, this transaction is ideally moved to an application service.

```java
package ….accounting.application;
 
@Service
@Transactional
class PostingService {...}
```

If there's a need to allow the user to browse through journal entries and account transactions, the presentation-layer controller can directly use the corresponding repositories. If the domain entities are not suitable for the view technology (e.g. it doesn't follow JavaBean naming conventions), then the presentation-layer can define DTOs that are suitable for the view. Be careful! Don't change the domain entity just to suit the needs of the presentation-layer.


```java
package ….interfaces.web;
 
@Controller
class AccountsController {
  private AccountRepository accountRepository;
  private AccountTransactionRepository accountTransactionRepository;
  private PostingService postingService;
  ...
}
```

## In Closing...

So, there you have it. Hopefully, this post can shed some light on when (and when not) to use domain model pattern.

![Alternative Anemic Domain Model and Isolated Domain Model Side-by-Side](/assets/images/2016-11-14-architectural-layers-and-modeling-domain-logic/Class-Diagram3.png "Alternative Anemic Domain Model and Isolated Domain Model Side-by-Side"){:style="min-width: 640px;"}
{:style="overflow: auto"}

Now I think I need a cold one.
<figure>
  <img src="/assets/images/2016-11-14-architectural-layers-and-modeling-domain-logic/pexels-nicolas-postiglioni-991970.jpg" />
  <figcaption>Image by Nicolas Postiglioni via Pexels</figcaption>
</figure>


Originally posted at: [Architectural Layers and Modeling Domain Logic](http://lorenzo-dee.blogspot.com/2016/10/architectural-layers-and-modeling.html){:target="_blank"}