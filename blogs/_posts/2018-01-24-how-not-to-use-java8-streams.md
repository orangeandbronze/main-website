---
layout:       blog
title:        "How not to use Java 8 Streams"
authors:      Sam Ong
tags:         java
header-image: /assets/images/2018-01-24-how-not-to-use-java8-streams/HowNotToUseJava8Streams.png
---

Now (it’s been years) that Java has gotten functional programming syntax, it can be pretty easy to get carried away and use it unnecessarily. Take for instance, this piece of code someone I know has written:

```java
List<String> listToReturn = listOfAcceptableCountries.stream()
          .filter(c -> c.getCode().equals(user.getCountryCode())
          .findFirst()
          .map(countryCode -> customList)
          .else(defaultList);
```

I’ll give you a few **minutes** to read that and please form some opinion on what it’s supposed to do.

<hr style="margin: 2em 2rem">

Done? The fact that I said “minutes” should have been a red flag. If you can’t decipher the intention of 5 lines of code by literally just reading it, then you have a big problem right there.

The *supposed* intention of the code was:

> Check if a user is from a list of countries and return a “custom list”, otherwise return a default list.

Surprised? I’ll try to go through the code to explain what’s wrong with the Java-8 code. This FP-style syntax was meant to give programmers a way to declaratively say what to do rather than **how** to do it.

## First line:

```java
listOfAcceptableCountries.stream()
```
So we convert the list of country objects to a stream so we can iterate over it. Let’s use <code style="white-space: nowrap">[philippines, unitedStates, mexico]</code> as our test case and assume that they’re objects.

## Second line:

```java
.filter(c -> c.getCode().equals(user.getCountryCode())
```
Next we filter out the countries that match our user’s country. Since the country is only tested against one source, which is the user’s getter method, we can assume that only one country is ever matched and that the list would need to handle duplicates or explicitly allows it.

## Third line:

```java
.findFirst()
```
We get the first value and also the **only** value that matches the user’s country. So if our user is from the US, we have the variable, `unitedStates`.

## Fourth line:

```java
.map(countryCode -> customList)
```

This part is where it **literally** gets unnecessary. Our object (`unitedStates`) is mapped to customList. The word "map" as a verb (as per Google) is defined as

* <small style="padding: 0.125rem 0.5rem; background-color: lightgray; color: gray">MATHEMATICS</small> 
  <div>associate each element of (a set) with an element of another set.</div>
  <div style="color: gray">“the direct sum of two rings A and B may be mapped homomorphically on the summand”</div>
* <small style="padding: 0.125rem 0.5rem; background-color: lightgray; color: gray">MATHEMATICS</small>
  <div>be associated with or linked to.</div>
  <div style="color: gray">“if more than one suffix can be mapped on to the end of a word then the longest is chosen for removal”</div>

Even a non-programmer reading the symbols would get confused as he would read it as countryCode **turning into** customList, which doesn’t make sense at all without context. As developers, we read it as “Given this variable countryCode, simply return customList” and the nature of its pointlessness is made even more evident when you write it down as a method. We literally just throw away the value and not care about it, as long as it exists.

## Fifth line:

```java
.else(defaultList);
```

The last line is simply a glorified else statement since `findFirst()` returns an `Optional` object.

<hr style="margin: 2em 2rem">

## A better solution

To give a better solution to the problem, let’s read through the problem statement again.

> Check if a user is from a list of countries and return a “custom list”, otherwise return a default list.

The simplest answer is simply:

```java
List<String> listToReturn = defaultList;
if (listOfAcceptableCountryCodes.contains(user.getCountryCode)) {
    listToReturn = customList;
}
```

That is **literally** 4 lines of code. And one of them is a bracket, and the other is a variable declaration.

## An even better and more readable solution

Let’s read the problem statement again.

> Check if a user is from a list of countries and return a “custom list”, otherwise return a default list.

Notice that every time (which is like, only two times) I’ve tried to suggest a solution I keep going back to the problem statement. That is because when you want to write good code, it is important to have a clear vision of what your code does or should do.

A lot of OOP concepts like Law of Demeter encourage encapsulation and information hiding. I particularly like the rule that says “The object that has the data should do the job”. In this regard, our service code can simply ***ask*** the user object if he is from a special country (I made up this domain term). We’ll modify the problem statement to:

> Check if a user is from a special country and return a “custom list”, otherwise return a default list.

In code terms, this would be:

```java
List<String> listToReturn = defaultList;
if (user.isFromSpecialCountry()) {
    listToReturn = customList;
}
```

Now, when you read it out loud, it **clearly** states the intent so much that any non-programmer can understand what you mean. It also reflects perfectly the problem statement and if being from a special country means something else in the system in the future, it is easily changeable, as well as extensible and easy to find. Notice that in the problem statement we’ve removed the word *“from a list of countries”* and replaced it with a **domain term**, *“special country”* (whatever that means). By this way of thinking, we can even take it one step further.

```java
List<String> listToReturn = user.retrieveCountryBasedList();
```

We can quite literally shorten it to one line of code. Now we have hidden the implementation details inside the user object. The service code just needs to ask the user object what his list should be and the user object can decide for himself what it wants to give. Of course, *“retrieveCountryBasedList”* can be whatever domain related name you need, the important part here is that we have effectively made the service code readable by describing **what** it does and not how it does it.

If you want to know what makes a user *“from a special country”* or how a user gives back its *“country based list”*, you can peer into the user object and see for yourself. But most likely, if you want to read a service method (for example a deposit to bank account service method), you want to abstract away pointless details and be satisfied with knowing that “a user’s list of whatevers is different if it’s from a special country”.

It is up to you, the developer, what level of information hiding you want to implement and what is practical in the system you are working on right now. Maybe the information and logic needed cannot be injected inside the user object for practical reasons. You can use another classes instead and ask it if a user is special or what its special list is. In this case however, whatever may be deemed most appropriate, it is definitely not the Java-8 code.

Originally posted at: [How not to use Java 8 streams](https://medium.com/@samong05/how-not-to-use-java-8-streams-4b399f7af2d4){:target="_blank"}











