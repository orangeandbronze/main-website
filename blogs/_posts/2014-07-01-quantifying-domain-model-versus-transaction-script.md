---
layout:       blog
title:        "Quantifying Domain Model versus Transaction Script"
authors:      Lorenzo Dee
tags:         [domain-driven-design, java]
header-image: /assets/images/2014-07-01-quantifying-domain-model-versus-transaction-script/QuantifyingDomainModelVersusTransactionScript-Banner.png
---
I've been conducting training classes (with [Orange and Bronze](https://www.orangeandbronze.com/)) that cover topics like TDD, design patterns (GoF), patterns of enterprise application architecture (based on PoEAA book by Martin Fowler), and others. And a question keeps coming up about comparing (and quantifying) the benefits of [domain model](https://martinfowler.com/eaaCatalog/domainModel.html){:target="_blank"} pattern compared to [transaction script](https://martinfowler.com/eaaCatalog/transactionScript.html){:target="_blank"}. So, I thought I'd post an explanation here.

Note that the Transaction Script pattern is not bad. Fowler himself says that there are virtues to this pattern:

> The glory of Transaction Script is its simplicity. Organizing logic this way is natural for applications with only a small amount of logic, and it involves very little overhead either in performance or in understanding.
> 
> …
> It's hard to quantify the cutover level, especially when you're more familiar with one pattern than the other. You can refactor a Transaction Script design to a Domain Model design, but it's harder than it needs to be.
However much of an object bigot you become, don't rule out Transaction Script. there are a lot of simple problems out there, and a simple solution will get you up and running faster.
> 
> (PoEAA p.111-112)

Here, I used a simple banking example to illustrate the difference between Transaction Script and Domain Model patterns in organizing domain logic. Then, I'll use metrics like method lines of code, and [cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity){:target="_blank"}.

## Banking Example
In the banking example, we shall implement a very simple money transfer, where an amount is transferred from one account to another.

The `MoneyTransferService` shall be implemented in two ways: one using *Transaction Script*, and another using *Domain Model*.

```java
public interface MoneyTransferService {
  BankingTransaction transfer(
      String fromAccountId, String toAccountId, double amount);
}
```
## Transaction Script
Using a Transaction Script design, the domain logic for transferring money between two accounts is *all* placed inside the `MoneyTransferService` implementation.

```java
public class MoneyTransferServiceTransactionScriptImpl
      implements MoneyTransferService {
  private AccountDao accountDao;
  private BankingTransactionRepository bankingTransactionRepository;
  . . .
  @Override
  public BankingTransaction transfer(
      String fromAccountId, String toAccountId, double amount) {
    Account fromAccount = accountDao.findById(fromAccountId);
    Account toAccount = accountDao.findById(toAccountId);
    . . .
    double newBalance = fromAccount.getBalance() - amount;
    switch (fromAccount.getOverdraftPolicy()) {
    case NEVER:
      if (newBalance < 0) {
        throw new DebitException("Insufficient funds");
      }
      break;
    case ALLOWED:
      if (newBalance < -limit) {
        throw new DebitException(
            "Overdraft limit (of " + limit + ") exceeded: " + newBalance);
      }
      break;
    }
    fromAccount.setBalance(newBalance);
    toAccount.setBalance(toAccount.getBalance() + amount);
    BankingTransaction moneyTransferTransaction =
        new MoneyTranferTransaction(fromAccountId, toAccountId, amount);
    bankingTransactionRepository.addTransaction(moneyTransferTransaction);
    return moneyTransferTransaction;
  }
}
```

The `Account` entity is merely a bag of getters and setters.

```java
// @Entity
public class Account {
  // @Id
  private String id;
  private double balance;
  private OverdraftPolicy overdraftPolicy;
  . . .
  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public double getBalance() { return balance; }
  public void setBalance(double balance) { this.balance = balance; }
  public OverdraftPolicy getOverdraftPolicy() { return overdraftPolicy; }
  public void setOverdraftPolicy(OverdraftPolicy overdraftPolicy) {
    this.overdraftPolicy = overdraftPolicy;
  }
}
```

The `OverdraftPolicy` is an enumerated type.

```java
public enum OverdraftPolicy {
  NEVER, ALLOWED
}

```

## Domain Model
Using a Domain Model design, the domain logic for transferring money between two accounts is spread across. This keeps it simple and easier to maintain.

```java
public class MoneyTransferServiceDomainModelImpl
      implements MoneyTransferService {
  private AccountRepository accountRepository;
  private BankingTransactionRepository bankingTransactionRepository;
  . . .
  @Override
  public BankingTransaction transfer(
      String fromAccountId, String toAccountId, double amount) {
    Account fromAccount = accountRepository.findById(fromAccountId);
    Account toAccount = accountRepository.findById(toAccountId);
    . . .
    fromAccount.debit(amount);
    toAccount.credit(amount);
    BankingTransaction moneyTransferTransaction =
        new MoneyTranferTransaction(fromAccountId, toAccountId, amount);
    bankingTransactionRepository.addTransaction(moneyTransferTransaction);
    return moneyTransferTransaction;
  }
}
```

The `Account` entity contains behavior and domain logic. Notice how it contains `#debit(double)` and `#credit(double)` methods, and not just getters and setters.

```java
// @Entity
public class Account {
  // @Id
  private String id;
  private double balance;
  private OverdraftPolicy overdraftPolicy;
  . . .
  public double balance() { return balance; }
  public void debit(double amount) {
    this.overdraftPolicy.preDebit(this, amount);
    this.balance = this.balance - amount;
    this.overdraftPolicy.postDebit(this, amount);
  }
  public void credit(double amount) {
    this.balance = this.balance + amount;
  }
}
```
The `OverdraftPolicy` has two implementations that contain logic. Based on business rules, the `OverdraftPolicy` implementations throw exceptions to prevent the `Account` balance from being debited.

```java
public interface OverdraftPolicy {
  void preDebit(Account account, double amount);
  void postDebit(Account account, double amount);
}
```
```java
public class NoOverdraftAllowed implements OverdraftPolicy {
  public void preDebit(Account account, double amount) {
    double newBalance = account.balance() - amount;
    if (newBalance < 0) {
      throw new DebitException("Insufficient funds");
    }
  }
  public void postDebit(Account account, double amount) {
  }
}
```
```java
public class LimitedOverdraft implements OverdraftPolicy {
  private double limit;
  . . .
  public void preDebit(Account account, double amount) {
    double newBalance = account.balance() - amount;
    if (newBalance < -limit) {
      throw new DebitException(
          "Overdraft limit (of " + limit + ") exceeded: " + newBalance);
    }
  }
  public void postDebit(Account account, double amount) {
  }
}
```

## Metrics
Now here are some of the metrics (via [Eclipse Metrics Plugin](http://metrics2.sourceforge.net/){:target="_blank"}).

|                              | Transaction Script  | Domain Model  |
|------------------------------|---------------------|---------------|
| **Metric**                   | Maximum             | Maximum       |
| McCabe Cyclomatic Complexity | 5                   | 2             |
| Number of Classes            | 4                   | 6             |
| Method Lines of Code         | 25                  | 9             |
|                              | Total               | Total         |
|Total Lines of Code	         | 82                  | 96            |

Now here are the metrics screenshots for *transaction script* 

![Metrics for transaction script](/assets/images/2014-07-01-quantifying-domain-model-versus-transaction-script/metrics-banking-transaction-script.png "Metrics for transaction script")

and *domain model*. 

![Metrics for domain model](/assets/images/2014-07-01-quantifying-domain-model-versus-transaction-script/metrics-banking-domain-model.png "Metrics for domain model")

## Conclusion
The resulting overall lines of code are almost the same. The Domain Model pattern produces more classes, and simpler methods.

There are more things to compare than just lines of code and cyclomatic complexity. For example, the Domain Model pattern needs more OO design skill, and Transaction Script pattern is so easy to implement.

The good thing is, there's no need to make a decision up-front. One can always start with a Transaction Script (i.e. [do the simplest thing that could possibly work](https://ronjeffries.com/xprog/Practices/PracSimplest.html){:target="_blank"}), and when complexity starts to set in, it can be refactored to have richer domain entities, and work its way to using a Domain Model pattern.

Let me know if anyone wants to see the code. I can upload it to GitHub.

Originally posted at: [Quantifying Domain Model versus Transaction Script](https://lorenzo-dee.blogspot.com/2014/06/quantifying-domain-model-vs-transaction-script.html){:target="_blank"}
