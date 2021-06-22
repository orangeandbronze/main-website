---
layout:       blog
title:        "Gaining Domain Knowledge of ISO-8583 Messages"
authors:      Lorenzo Dee
tags:         [domain-driven-design, java]
header-image: /assets/images/2014-02-22-gaining-domain-knowledge-of-ISO-8583-messages/GainingDomainKnowledgeOf-ISO-8583Messages-Banner.png
---
Let's talk about how we improved code readability and gained domain knowledge in creating [ISO 8583](https://en.wikipedia.org/wiki/ISO_8583){:target="_blank"} messages in [jPOS](http://jpos.org/){:target="_blank"}.

At first, we were writing code like this. And the team started asking about field `2`. The code didn't help in providing much domain knowledge about financial transaction card originated messages.

```java
import org.jpos.iso.*;
 
ISOMsg m = new ISOMsg();
m.setMTI("0100");
m.set(2, "...");
m.set(3, "000000"); // purchase; no account type specified
m.set(4, "000000001500"); // in acquirer's currency (e.g. USD 15.00)
```

So, we wanted to improve things and here's what we had in mind.

```java
import static org.junit.Assert.*;
  
import java.util.*;
import org.junit.*;
  
import org.jpos.iso.*;
 
public class AuthorizationRequestBuilderTest {
  @Test
  public void test() throws Exception {
    ISOMsg msg = new AuthorizationRequestBuilder()
            .withPrimaryAccountNumber(...)
            .withProcessingCode("000000")
            .withTransactionAmount(...)
            .build();
    assertEquals("0100", msg.getMTI());
    assertEquals("...", msg.getString(2));
    assertEquals("000000", msg.getString(3));
    assertEquals("...", msg.getString(4));
  }
}
```
We wanted to use the names of the fields, instead of referring to them as field numbers. This helps improve readability and adds to the team's domain knowledge, as they now know that field number `2` is the **primary account number** (or PAN for short). We also applied the [builder pattern](https://en.wikipedia.org/wiki/Builder_pattern){:target="https://en.wikipedia.org/wiki/Builder_pattern"} and used a [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface){:target="_blank"}.

```java
public class AuthorizationRequestBuilder {
  …
 
  public AuthorizationRequestBuilder() {
  }
 
  public ISOMsg build() {
    ISOMsg msg = new ISOMsg();
    msg.setMTI("0100");
    msg.set(2, this.pan);
    msg.set(3, this.processingCode);
    msg.set(4, this.transactionAmount);
    return msg;
  }
 
  public AuthorizationRequestBuilder withPrimaryAccountNumber(String pan) {
    if (!pan.matches("[0-9]{12,19}")) {
      throw new IllegalArgumentException("PAN must be a minimum of 12 digits");
    }
    this.pan = pan;
    return this;
  }
 
  public AuthorizationRequestBuilder withProcessingCode(String processingCode) {
    this.processingCode = processingCode;
    return this;
  }
 
  public AuthorizationRequestBuilder withTransactionAmount(String transactionAmount) {
    this.transactionAmount = transactionAmount;
    return this;
  }
 
  …
}
```

## Primary Account Number
As it turns out, PANs are not just a minimum of 12 (and maximum of 19) digits. It consists of three primary components:

- [Issuer identification number (IIN)](https://en.wikipedia.org/wiki/Payment_card_number#Issuer_identification_number_.28IIN.29){:target="_blank"} (formerly Bank Identification Number)
- Individual account identification number
- PAN check digit

To illustrate, say we have the following PAN, <code>554177<span style="color:#159">10000xxxx</span><span style="color:#000">3.</span></code>

- 554177 is the IIN
- 10000xxxx is the individual account identification number
- 3 is the PAN check digit

With this added knowledge, we can enhance the builder to validate the PAN.

```java
public class AuthorizationRequestBuilder {
 
  …
 
  public AuthorizationRequestBuilder withPrimaryAccountNumber(String pan) {
    if (!pan.matches("[0-9]{12,19}")) {
      throw new IllegalArgumentException("PAN must be a minimum of 12 digits and a maximum of 19 digits");
    }
    if (!CheckDigit.isValid(pan)) {
      throw new IllegalArgumentException("PAN contains invalid check digit");
    }
    this.pan = pan;
    return this;
  }
 
  …
}
```

ISO specification 7812 and 7813 details the specific requirements for PAN composition. All PANs used in ISO 8583–1987 messages must conform to the ISO PAN encoding requirements.

## Processing Code
The processing code (DE 3) contains even more knowledge to be gained. At first, we thought they were just digits. Later, we found out (thanks to the domain experts and supporting documents) that it was a series of six (6) digits used to describe the effect of a transaction on the customer account and the type of accounts affected.

These six (6) digits are composed of three (3) subfields:

1. Cardholder Transaction Type Code
2. Cardholder Account Type (From)
3. Cardholder Account Type (To)

To get a better sense of what transaction types can be used in an authorization request, here are some transaction types (**NOTE**: Your payment network may differ. Please refer to its documents/manuals):

| Values  | Description      |
|---------|------------------|
|   00    | Purchase         |
|   01    | Withdrawal       |
|   28    | Payment          |
|   30    | Balance Inquiry  |
|   40    | Account Transfer |

Cardholder account types can have the following values:

| Values  |	Description                                |
|---------|--------------------------------------------|
|   00	  | No account specified (NAS)/Default Account |
|   01	  | Savings Account                            |
|   02	  | Checking Account                           |
|   03	  | Credit Card Account                        |

So, when a business user says, "balance inquiry on savings account", s/he means processing code `300100`.

*Did you get a light-bulb moment like I did when I first found out?*

Given the above domain knowledge, we initially set out to create a builder for the processing code to do something like this.

```java
ISOMsg msg = new AuthorizationRequestBuilder()
        .withPrimaryAccountNumber(...)
        .withProcessingCode(new ProcessingCode.Builder()
            .purchase()
            .from(AccountType.NOT_SPECIFIED)
            .to(AccountType.NOT_SPECIFIED)
            .build())
        .withTransactionAmount(...)
        .build();
```

But then, we later found out that the payment network only supports specific processing code combinations. Here are some (**NOTE**: Table below does not provide a complete list of valid processing codes):

| Values	| Description                                                                                             |
|-----------|---------------------------------------------------------------------------------------------------------|
| 000000	| Purchase; no account specified                                                                          |
| 001000	| Purchase from savings account                                                                           |
| 002000	| Purchase from checking account                                                                          |
| 280000	| Payment; No account specified                                                                           |
| 280010	| Payment to savings account                                                                              |
| 280020	| Payment to checking account                                                                             |
| 280030	| Payment to credit card account                                                                          |
| 300000	| Balance inquiry; no account specified.When no account is specified on a balance inquiry transaction, the issuer may return both checking and savings account balances if applicable.                                          |
| 301000	| Balance inquiry on savings account                                                                      |
| 302000	| Balance inquiry on checking                                                                             |
| 303000	| Balance inquiry on credit card (credit line)                                                            |

Since not all combinations (between transaction type and to-/from- account types) are valid, we thought it would be best to create a builder that helps with the creation of valid processing codes (and not just a simple string of six digits). Here's our rough idea.

```java
public enum AccountType {
  NOT_SPECIFIED, SAVINGS, CHECKING, CREDIT_CARD
}
 
. . .
 
public class PurchaseProcessingCodeBuilder {
  public PurchaseProcessingCodeBuilder from(AccountType type) {. . .}
  // does not support a To- account
  public String build() {. . .}
}
 
. . .
 
public class PaymentProcessingCodeBuilder {
  // does not support a From- account
  public PaymentProcessingCodeBuilder to(AccountType type) {. . .}
  public String build() {. . .}
}
 
. . .
 
public class BalanceInquiryProcessingCodeBuilder {
  public BalanceInquiryProcessingCodeBuilder from(AccountType type) {. . .}
  // does not support a To- account
  public String build() {. . .}
}
 
. . .
 
    ISOMsg msg = new AuthorizationRequestBuilder()
            .withPrimaryAccountNumber(...)
            .withProcessingCode(new PurchaseProcessingCodeBuilder()
                // From- account type is NOT_SPECIFIED
                .build())
            .withTransactionAmount(...)
            .build();
 
    ISOMsg msg2 = new AuthorizationRequestBuilder()
            .withPrimaryAccountNumber(...)
            .withProcessingCode(new PurchaseProcessingCodeBuilder()
                // From- account type is NOT_SPECIFIED
                .to(...) // <-- results into a compiler error!
                .build())
            .withTransactionAmount(...)
            .build();
```
Notice that purchase transactions only support a "from" account type, but no "to" account type. Payment transactions support a "to" account type, but no "from" account type. And, balance inquiry only supports a "from" account type.

The astute reader would probably notice that in the given sample transaction types, only one account type is used (either "from" or "to"), but not both. So, you might ask, "Is there a transaction type that needs both 'from' and 'to' account type values?" Yes, there is — transfers.

Another possible idea is to create separate builders for the transaction types. Something like this,

```java
ISOMsg msg = new AuthorizationRequestBuilder()
        .withPrimaryAccountNumber(...)
        .balanceInquiry()
            // no account type is specified
            // .withTransactionAmount(...) <-- no transaction amount is needed
        .build();
 
. . . = new AuthorizationRequestBuilder()
        .withPrimaryAccountNumber(...)
        .balanceInquiry()
            .onSavingsAccount() // or .onCheckingAccount() or .onCreditCardAccount()
        .build();
 
. . . = new AuthorizationRequestBuilder()
        .withPrimaryAccountNumber(...)
        .accountTransfer()
            .fromSavingsAccount()
            .toCheckingAccount()
        .withTransactionAmount(...)
        .build();
```

## Transaction Amount
At first, we simply thought that the transaction amount was a left-zero-padded string with two decimal places, but without the separator (i.e. decimal point). Again, after learning much more from the domain, the amount was actually based on the acquirer's currency. The sample from the document helps explain this.

| DE 4 (Amount, Transaction) |	DE 49 (Currency Code) |	Currency Exponent |	 Currency Name    |	Actual Monetary Value of DE 4 |
|----------------------------|------------------------|-------------------|-------------------|-------------------------------|
| 000000001500	             |          949           |	        0	      |  New Turkish Lira |	        1500 Lira             |           
| 000000001500	             |          124	          |         2	      |  Canadian Dollar  |	        15.00 Dollars         |
| 000000001500	             |          788	          |         3	      |  Tunisian Dinar   |	        1.500 Dinars          |

Notice that while the transaction amount (DE 4) value is the same, it means differently based on the value of the currency (DE 49). We've used [java.util.Currency#getDefaultFractionDigits()](https://docs.oracle.com/javase/7/docs/api/java/util/Currency.html#getDefaultFractionDigits()){:target="_blank"} for this.

## Message- vs. Domain- Centric
I consider the above ideas to be rather message-centric. After gaining more domain knowledge, I believe a domain-centric design would be of greater help. This domain-centric design would revolve around [issuers](https://en.wikipedia.org/wiki/Issuing_bank){:target="_blank"}, [acquirers](https://en.wikipedia.org/wiki/Acquiring_bank){:target="_blank"}, card holders, [merchants](https://en.wikipedia.org/wiki/Merchant_account){:target="_blank"}, and more. I hope to write more about this when I get some free time in the near future.

## Acknowledgements
There is just so much more to learn about ISO-8583 and payment networks. One blog post is definitely not enough. Hopefully, I was able to share some of the things I've learned. Thanks to my team mates, Edge, Claire, and [JC](https://coderwall.com/jc){:target="_blank"}, for encouraging me to write this. I've learned so much while working with you guys.

More power to the team, and have fun learning more about the domain.

Originally posted at: [Gaining Domain Knowledge of ISO-8583 Messages](https://lorenzo-dee.blogspot.com/2013/11/gaining-domain-knowledge-of-iso-8583.html){:target="_blank"}