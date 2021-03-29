---
layout:       blog
title:        "Spring-managed Transactions Explained - Part 1 (JDBC)"
authors:      Lorenzo Dee
tags:         [java, jdbc, jpa, spring]
header-image: /assets/images/2016-09-13-spring-managed-transactions-explained-part1-JDBC/Spring-managedTransactionsExplainedPart-1-JDBC-banner.png
---
*Learn how transactions work in plain-vanilla JDBC and how Spring manages JDBC-based transactions.*

I've been meaning to write about this for quite some time now. In the [training courses](https://university.orangeandbronze.com/){:target="_blank"} I've been privileged to conduct, I've noticed that course participants have had the most difficulty trying to understand how Spring manages transactions. In the first part of this series, I'll start by showing how transactions work in plain-vanilla JDBC. And then show how Spring manages JDBC-based transactions.

In the second part of this series, I'll show how transactions work in plain-vanilla JPA. And then show how Spring manages JPA-based transactions.

<aside class="float-md-right my-md-3 ml-md-3 mb-3 p-3 col-md-3" style="border: 1px solid #ccc; border-radius: 4px">
Update: The <a href="https://lorenzo-dee.blogspot.com/2015/12/spring-managed-transactions-part2.html" target="_blank">second part of this series</a> has just been posted.
</aside>

## Funds Transfer

To help illustrate transactions, I'll be using the often used case study of transferring funds from one bank account to another. Here, we show code snippets of debit, credit, and transfer methods.

```java
... class BankAccountService {
  public void transfer(MonetaryAmount amount, ...) {
    debit(amount, ...);
    credit(amount, ...);
    ...
  }
  public void credit(MonetaryAmount amount, AccountId accountId) {
    ...
  }
  public void debit(MonetaryAmount amount, AccountId accountId) {
    ...
  }
  ...
}
```

## JDBC Transactions

<aside class="float-md-right mb-md-3 ml-md-3 mb-3 p-3 col-md-4" style="border: 1px solid #ccc; border-radius: 4px">
By default a <code>Connection</code> object is in auto-commit mode, which means that it automatically commits changes after executing each statement. If auto-commit mode has been disabled, the method <code>commit()</code> must be called explicitly in order to commit changes; otherwise, database changes will not be saved.
</aside>

In plain-vanilla JDBC, transactions are started by setting the `Connection`'s auto-commit mode to `false` (or to manual commit mode). Once the `Connection`'s auto-commit is set to `false`, subsequent database changes are not committed until a call to `commit()` is made. The changes brought about by the SQL operations will not be seen by other connections until the changes are committed. The code snippet below illustrates this.

```java
import java.sql.*;
...
try (Connection conn = dataSource.getConnection()) {
  conn.setAutoCommit(false);
  ... // SQL operations here (inserts, updates, deletes, etc)
  // database changes will not be saved until commit
  conn.commit(); // save changes (all-or-nothing)
} catch (SQLException e) {
  // handle exception
  conn.rollback(); // rollback changes
}
```
{:style="clear: both"}

Now, let's apply this to the funds transfer case study.

The `transfer()` method is now overloaded with an additional connection parameter.

```java
import java.sql.*;
...
... class BankAccountService {
  public void transfer(MonetaryAmount amount, ...)
      throws SQLException {...}
  public void transfer(
        MonetaryAmount amount, ..., Connection conn)
      throws SQLException {...}
  ...
}
```

The method that does not accept a connection, creates a new connection, and calls the same method that accepts a connection parameter. The method that accepts a connection, uses it to carry out debit and credit operations.

```java
import java.sql.*;
 
... class BankAccountService {
  public void transfer(MonetaryAmount amount, ...)
      throws SQLException {
    try (Connection conn = dataSource.getConnection()) {
      conn.setAutoCommit(false);
      transfer(amount, ..., conn);
      conn.commit(); // save changes (all-or-nothing)
    } catch (SQLException e) {
      // handle exception
      conn.rollback(); // rollback changes
    }
  }
  public void transfer(
        MonetaryAmount amount, ..., Connection conn)
      throws SQLException {
    debit(amount, ..., conn);
    credit(amount, ..., conn);
    ...
  }
  public void credit(MonetaryAmount amount, AccountId accountId)
      throws SQLException {...}
  public void credit(MonetaryAmount amount, AccountId accountId,
      Connection conn) throws SQLException {...}
  public void debit(MonetaryAmount amount, AccountId accountId)
      throws SQLException {...}
  public void debit(MonetaryAmount amount, AccountId accountId,
      Connection conn) throws SQLException {...}
  ...
}
```

The `debit()` and `credit()` methods are also overloaded. Just like the `transfer()` methods, the one that does not accept a connection parameter, creates a new connection, and calls the one that accepts a connection object. The method that accepts a connection, uses it to carry out SQL operations.

```java
import java.sql.*;
 
... class BankAccountService {
  public void transfer(MonetaryAmount amount, ...)
      throws SQLException {
    ... transfer(amount, ..., conn); ...
  }
  public void transfer(
        MonetaryAmount amount, ..., Connection conn)
      throws SQLException {
    debit(amount, ..., conn);
    credit(amount, ..., conn);
    ...
  }
  public void credit(MonetaryAmount amount, AccountId accountId)
      throws SQLException {
    try (Connection conn = dataSource.getConnection()) {
      conn.setAutoCommit(false);
      credit(amount, accountId, conn);
      conn.commit(); // save changes (all-or-nothing)
    } catch (SQLException e) {
      // handle exception
      conn.rollback(); // rollback changes
    }
  }
  public void credit(MonetaryAmount amount, AccountId accountId,
      Connection conn) throws SQLException {
    ... = conn.prepareStatement(...);
    ... // SQL operations for credit
  }
  public void debit(MonetaryAmount amount, AccountId accountId)
      throws SQLException {
    try (Connection conn = dataSource.getConnection()) {
      conn.setAutoCommit(false);
      debit(amount, accountId, conn);
      conn.commit(); // save changes (all-or-nothing)
    } catch (SQLException e) {
      // handle exception
      conn.rollback(); // rollback changes
    }
  }
  public void debit(MonetaryAmount amount, AccountId accountId,
      Connection conn) throws SQLException {
    ... = conn.prepareStatement(...);
    ... // SQL operations for debit
  }
  ...
}
```

Notice that we'll need to pass connection objects all over the place. Yes, this looks ugly. But stay with me for a few more minutes and read on.

A pattern emerges from these methods. Whenever a database transaction needs to be made, a connection is either provided or established, then used to carry out SQL operations (or database changes), and the changes are committed (or rolled back) by the method that established the connection.

The method accepting a connection object gives up control of the transaction to its caller (as in the case of `credit(amount)` calling `credit(amount, connection)`). The scope of transactions can span one method call, or several methods calls (as in the case of `transfer(amount)` calling `debit(amount, connection)` and `credit(amount, connection)`).

As already mentioned, this looks ugly and error-prone. The connection object is passed all over the place. So, how can we improve on this?

## Spring-managed JDBC Transactions

First, we'll use Spring's `JdbcTemplate` to help us deal with JDBC boilerplate code and `SQLException`s. Second, we'll use Spring's declarative transaction management.

When we start using a `JdbcTemplate` inside `BankAccountService`, we no longer need to handle connections explicitly, and we can remove those overloaded methods. The connection object actually gets hidden in some thread local object.

```java
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
 
@Transactional
... class BankAccountService {
  private JdbcTemplate jdbcTemplate; // injected via constructor
  ...
  public void transfer(MonetaryAmount amount, ...) {
    ...
  }
  public void credit(MonetaryAmount amount, AccountId accountId) {
    jdbcTemplate.update(...); // SQL operations for credit
    ...
  }
  public void debit(MonetaryAmount amount, AccountId accountId) {
    jdbcTemplate.update(...); // SQL operations for debit
    ...
  }
  ...
}
```

How does `JdbcTemplate` get a `Connection`?

For each `JdbcTemplate` method, it retrieves a connection from the given `DataSource` that is provided (either as constructor argument, or as property `setDataSource(DataSource)`). After the `JdbcTemplate` method returns, the connection is closed. Without transactions, the connection's auto-commit mode remains `true`. The good thing is, `JdbcTemplate` is transaction-aware. That means, it will participate in the on-going transaction, if there is one (i.e. use the on-going transaction's connection).

So, how do we set the connection's auto-commit mode to `false`, so that a transaction can be started and span more than one method call to `JdbcTemplate`?

To use transactions, we do not set the connection's auto-commit mode to `false`. Instead, we tell Spring to start transactions. In turn, Spring will retrieve a connection, set its auto-commit mode to `false`, and keep using this same connection until the transaction is completed (either with all changes saved/committed, or all changes rolled back).

So, how do we tell Spring to start transactions, and what does `@Transactional` do?

As you might have guessed, the `@Transactional` annotation tells Spring when to start a transaction (by setting the connection's auto-commit mode to false).

We tell Spring to start transactions by marking methods as `@Transactional` (or mark the class as `@Transactional` which makes all public methods transactional). And for Spring to start noticing `@Transactional` annotations, we'll need to add `<tx:annotation-driven />` in our XML-based configuration, or add `@EnableTransactionManagement` in our Java-based `@Configuration`.

When Spring encounters this annotation, it proxies the object (usually referred to as a Spring-managed bean). The proxy starts a transaction (if there is no on-going transaction) for methods that are marked as `@Transactional`, and ends the transaction when the method returns successfully.

![Proxy adds transaction behavior](/assets/images/2016-09-13-spring-managed-transactions-explained-part1-JDBC/1f997647.png "Proxy adds transaction behavior")

Since `JdbcTemplate` is transaction-aware, it knows how to get the on-going transaction's connection (if one exists), and not create a new one.

```java
...
import org.springframework.transaction.annotation.Transactional;
 
@Transactional
... class BankAccountService {
  ...
  public void transfer(MonetaryAmount amount, ...) {
    ...
    debit(amount, ...);
    credit(amount, ...);
    ...
  }
  public void credit(MonetaryAmount amount, AccountId accountId) {...}
  public void debit(MonetaryAmount amount, AccountId accountId) {...}
  ...
}
```

So, a call to `debit()` will use a transaction. A separate call to `credit()` will use a transaction. But what happens when a call to `transfer()` is made?

Since the `transfer()` method is marked as `@Transactional`, Spring will start a transaction. This same transaction will be used for calls to `debit()` and `credit()`. In other words, `debit(amount)` and `credit(amount)` will not start a new transaction. It will use the on-going transaction (since there is one).

Here's another good blog post to better understand [Transactions, Caching and AOP in Spring](https://spring.io/blog/2012/05/23/transactions-caching-and-aop-understanding-proxy-usage-in-spring){:target="_blank"}.

Originally posted at: [Spring-managed Transactions Explained - Part 1 (JDBC)](http://lorenzo-dee.blogspot.com/2015/12/spring-managed-transactions-part1.html){:target="_blank"}


