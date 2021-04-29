---
layout:       blog
title:        "Template Method Pattern Example Using Java Generics"
authors:      Calen Legaspi
tags:         [java]
header-image: /assets/images/2021-04-29-template-method-pattern-example-using-java-generics/TemplateMethodPatternExampleUsingJavaGenerics.jpg
---

*A tutorial on how to use the Template Method to eliminate error-prone code duplication.*

If you find that a lot of your routines are exactly the same except for certain sections, you might want to consider the Template Method to eliminate error-prone [code duplication](https://en.wikipedia.org/wiki/Duplicate_code#Problems_associated_with_duplicate_code){:target="_blank"}.

Here's an example: Below are two classes that do similar things:

1. Instantiate and initialize a Reader to read from a CSV file.
2. Read each line and break it up into tokens.
3. Unmarshal the tokens from each line into an entity, either a Product or a Customer.
4. Add each entity into a Set.
5. Return the Set.

As you can see, it's only in the third step that there's a difference - unmarshalling to one entity or another. All other steps are the same. I've highlighted the line where the code is different in each of the snippets.

## ProductCsvReader.java

```java
public class ProductCsvReader {
 
    Set<Product> getAll(File file) throws IOException {
        Set<Product> returnSet = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line = reader.readLine();
            while (line != null && !line.trim().equals("")) {
                String[] tokens = line.split("\\s*,\\s*");
                Product product = new Product(Integer.parseInt(tokens[0]), tokens[1],
                        new BigDecimal(tokens[2]));
                returnSet.add(product);
                line = reader.readLine();
            }
        }
        return returnSet;
    }
}
```

## CustomerCsvReader.java 

```java
public class CustomerCsvReader {
 
    Set<Customer> getAll(File file) throws IOException {
        Set<Customer> returnSet = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line = reader.readLine();
            while (line != null && !line.trim().equals("")) {
                String[] tokens = line.split("\\s*,\\s*");
                Customer customer = new Customer(Integer.parseInt(tokens[0]), tokens[1],
                        tokens[2], tokens[3]);
                returnSet.add(customer);
                line = reader.readLine();
            }
        }
        return returnSet;
    }
}
```
For this example, there are only two entities, but a real system might have dozens of entities, so that's a lot of error-prone duplicate code. You might find a similar situation with DAOs, where the select, insert, update, and delete operations of each DAO would do the same thing, only work with different entities and tables.

Let's start [refactoring](http://www.extremeprogramming.org/rules/refactor.html){:target="_blank"} this troublesome code. According to one of the design principles found in the first part of the GoF Design Patterns book, we should "Encapsulate the concept that varies." Between ProductCsvReader and CustomerCsvReader, what varies is the highlighted code. So our goal is to encapsulate what varies into separate classes, while moving what stays the same into a single class.

Let's start editing just one class first, ProductCsvReader. We use [Extract Method](https://sourcemaking.com/refactoring/extract-method){:target="_blank"} to extract the line into its own method:

## ProductCsvReader.java after Extract Method 

```java
public class ProductCsvReader {
 
    Set<Product> getAll(File file) throws IOException {
        Set<Product> returnSet = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line = reader.readLine();
            while (line != null && !line.trim().equals("")) {
                String[] tokens = line.split("\\s*,\\s*");
                Product product = unmarshall(tokens);
                returnSet.add(product);
                line = reader.readLine();
            }
        }
        return returnSet;
    }

    Product unmarshall(String[] tokens) {
        Product product = new Product(Integer.parseInt(tokens[0]), tokens[1], 
                new BigDecimal(tokens[2]));
        return product;
    }
}
```

Now that we have separated what varies with what stays the same, we will create a parent class that will hold the code that stays the same for both classes. Let's call this parent class AbstractCsvReader. Let's make it abstract since there's no reason for the class to be instantiated on its own. We'll then use the [Pull Up Method](https://sourcemaking.com/refactoring/pull-up-method){:target="_blank"} refactoring to move the method that stays the same to this parent class.

## AbstractCsvReader.java

```java
abstract class AbstractCsvReader {

    Set<Product> getAll(File file) throws IOException {
        Set<Product> returnSet = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line = reader.readLine();
            while (line != null && !line.trim().equals("")) {
                String[] tokens = line.split("\\s*,\\s*");
                Product product = unmarshall(tokens);
                returnSet.add(product);
                line = reader.readLine();
            }
        }
        return returnSet;
    }
}
```

## ProductCsvReader.java after Pull Up Method 

```java
public class ProductCsvReader extends AbstractCsvReader {

    Product unmarshall(String[] tokens) {
       Product product = new Product(Integer.parseInt(tokens[0]), tokens[1], 
                new BigDecimal(tokens[2]));
        return product;
    }
}
```

This class won't compile since it calls an "unmarshall" method that's found in the subclass, so we need to create an abstract method called unmarshall.

## AbstractCsvReader.java with abstract unmarshall method

```java
abstract class AbstractCsvReader {

    Set<Product> getAll(File file) throws IOException {
        Set<Product> returnSet = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line = reader.readLine();
            while (line != null && !line.trim().equals("")) {
                String[] tokens = line.split("\\s*,\\s*");
                Product product = unmarshall(tokens);
                returnSet.add(product);
                line = reader.readLine();
            }
        }
        return returnSet;
    }

    abstract Product unmarshall(String[] tokens);
}
```

Now at this point, AbstractCsvReader will make a great parent for ProductCsvReader, but not for CustomerCsvReader. CustomerCsvReader will not compile if you extend it from AbstractCsvReader. To fix this, we use Generics.

## AbstractCsvReader.java with Generics

```java
abstract class AbstractCsvReader<T> {

    Set<T> getAll(File file) throws IOException {
        Set<T> returnSet = new HashSet<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line = reader.readLine();
            while (line != null && !line.trim().equals("")) {
                String[] tokens = line.split("\\s*,\\s*");
                T element = unmarshall(tokens);
                returnSet.add(element);
                line = reader.readLine();
            }
        }
        return returnSet;
    }

    abstract T unmarshall(String[] tokens);
}
```

## ProductCsvReader.java with Generics 

```java
public class ProductCsvReader extends AbstractCsvReader<Product> {

    @Override
    Product unmarshall(String[] tokens) {
       Product product = new Product(Integer.parseInt(tokens[0]), tokens[1], 
                new BigDecimal(tokens[2]));
        return product;
    }
}
```

## CustomerCsvReader.java with Generics 

```java
public class CustomerCsvReader extends AbstractCsvReader<Customer> {

    @Override
    Customer unmarshall(String[] tokens) {
        Customer customer = new Customer(Integer.parseInt(tokens[0]), tokens[1], 
                tokens[2], tokens[3]);
        return customer;
    }
}
```

And that's it! No more duplicate code! The method in the parent class is the "template", which holds the code that stays the same. The things that change are left as abstract methods, which are implemented in the child classes.

Remember that when you refactor, you should always have automated Unit Tests to make sure you don't break your code. I used [JUnit](https://junit.org/junit5/){:target="_blank"} for mine.

One of the most commonly-used implementations of Template Pattern is the Spring Framework's [JdbcTemplate (src)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html){:target="_blank"}.

You can find the code I've posted here, as well as a few other Design Patterns examples, at this [Github repository](https://github.com/calen-legaspi/design-patterns-exercises){:target="_blank"}.

Before I go, I'd like to leave a quick note on the disadvantage of the Template Method. The Template Method relies on inheritance, which suffers from the [the Fragile Base Class Problem](https://stackoverflow.com/questions/2921397/what-is-the-fragile-base-class-problem){:target="_blank"}. In a nutshell, the Fragile Base Class Problem describes how changes in base classes get inherited by subclasses, often causing undesired effects. In fact, one of the underlying design principles found at the beginning of the GoF book is, "favor composition over inheritance", and many of the other design patterns show how to avoid code duplication, complexity or other error-prone code with less dependence on inheritance. Inheritance is fine if the parent class is not likely to change, or whatever changes to the parent class will be appropriate to all child classes.

Please give me feedback so I can continue to improve my articles.

Originally posted at: [Template Method Pattern Example Using Java Generics](http://calenlegaspi.blogspot.com/2014/07/template-method-pattern-example-using.html){:target="_blank"}