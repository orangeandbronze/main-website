---
layout:       blog
title:        "DataSource Routing with Spring @Transactional"
authors:      Lorenzo Dee
tags:         java
header-image: /assets/images/2018-02-13-datasource-routing-with-spring-@transactional/2018-02-13-datasource-routing-with-spring-@transactional-banner.png
---

I was inspired by Carl Papa's use of aspects with the Spring Framework to determine the `DataSource` to use (either read-write or read-only). So, I'm writing this post.

I must admit that I have long been familiar with Spring's [AbstractRoutingDataSource](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/datasource/lookup/AbstractRoutingDataSource.html){:target="_blank"}. But I did not have a good idea where it can be used. Thanks to Carl and team, and one of their projects. Now, I know a good use case.

## @Transactional

With Spring, read-only transactions are typically marked with annotations.

```java
public class SomeTransactionalComponent {
    @Transactional(readOnly=true)
    public void ...() {...}
 
    @Transactional // read-write
    public void ...() {...}
}
```
To take advantage of this, we use Spring's [TransactionSynchronizationManager](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/support/TransactionSynchronizationManager.html){:target="_blank"} to determine if the current transaction is read-only or not.

## AbstractRoutingDataSource

![Master and replica databases](/assets/images/2018-02-13-datasource-routing-with-spring-@transactional/imageedit_1_6934082642.png "Master and replica databases"){:style="float: right; margin: 1rem 0 1rem 1rem"}

Here, we use Spring's `AbstractRoutingDataSource` to route to the read-only replica if the current transaction is read-only. Otherwise, it routes to the default which is the master.

<div style="clear: both"></div>

```java
public class ... extends AbstractRoutingDataSource {
    @Override
    protected Object determineCurrentLookupKey() {
        if (TransactionSynchronizationManager
                .isCurrentTransactionReadOnly() ...) {
            // return key to a replica
        }
        return null; // use default
    }
    ...
}
```

Upon using the above approach, we found out that the `TransactionSynchronizationManager` is one step behind because Spring will have already called `DataSource.getConnection()` before a synchronization is established. Thus, a [LazyConnectionDataSourceProxy](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/datasource/LazyConnectionDataSourceProxy.html){:target="_blank"} needs to be configured as well.

As we were discussing this, we figured if there was another way to determine if the current transaction is read-only or not (without resorting to `LazyConnectionDataSourceProxy)`. So, we came up with an experimental approach where an aspect captures the `TransactionDefinition` (from the `@Transactional` annotation, if any) as a thread-local variable, and an `AbstractRoutingDataSource` that routes based on the captured information.

The relevant source code can be found on [GitHub](https://github.com/orangeandbronze/spring-jdbc-routing-datasource){:target="_blank"}. Thanks again, [Carl!](https://www.linkedin.com/in/carl-joseph-echague-papa-59677577/){:target="_blank"} BTW, [Carl](https://www.imdb.com/name/nm5377013/){:target="_blank"} is also an award-winning movie director. Wow, talent definitely knows no boundaries.

Originally posted at: [DataSource Routing with Spring @Transactional](http://lorenzo-dee.blogspot.com/2018/01/datasource-routing-with-spring.html){:target="_blank"}