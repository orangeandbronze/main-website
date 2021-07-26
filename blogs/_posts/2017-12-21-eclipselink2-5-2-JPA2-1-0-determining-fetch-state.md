---
layout:       blog
title:        "Eclipselink 2.5.2 (JPA 2.1.0): Determining Fetch State"
authors:      Brian Ramos
tags:         [eclipselink, jpa]
header-image: /assets/images/2017-12-21-eclipselink-determining-fetch-state/Eclipselinkbanner.png
---
This discussion made use of **JPA 2.1.0** and **Eclipselink 2.5.2.** Specs and implementation and may change in future releases. It might be helpful to test with different versions by (locally) modifying the pom.xml file that appears in the github repository [Eclipselink Fetch State Experiment](https://github.com/bryke201/eclipselink-fetch-state-experiment){:target="_blank"} that contains in-depth code and discussion for the concepts relevant to this post.

Also, here is another great reference for when reading through the code: [Eclipselink JPA 2.0 Persistence Utils](https://wiki.eclipse.org/EclipseLink/Development/JPA_2.0/persistence_utils){:target="_blank"}

This "issues" disucussed here do not seem to have been resolved yet as of Eclipselink 2.6.x releases.


Lazy-loading (in various degrees) definitely benefits optimization, and being able to tell whether certain attributes of JPA entities are loaded or not pretty much lies in cusps between such decisions.

At the forefront, JPA actually provides a way to inspect an entity (or its attributes) to determine its fetch state - whether they are loaded or not - through [PersistenceUtil](https://docs.oracle.com/javaee/6/api/javax/persistence/PersistenceUtil.html){:target="_blank"}.

It can be invoked via the following code:
Looks simple enough. However, is it reliable? 

Because it relies on provider implementation, that greatly depends. 

To be fair, aside from the method semantics, JPA (as of 2.0, and even in 2.1) provides specification described in the comments in an interface used in the implementation internals of PersistenceUtil, [ProviderUtil](http://www.grepcode.com/file/repository.jboss.org/nexus/content/repositories/releases/org.hibernate.javax.persistence/hibernate-jpa-2.1-api/1.0.0.Final/javax/persistence/spi/ProviderUtil.java){:target="_blank"}: 

- *isLoadedWithoutReference* and *isLoadedWithReference*, both with arguments (Object entity, String attributeName)

    "If the provider determines that the entity has been provided by itself and that the state of the specified attribute has been loaded, this method returns LoadState.LOADED."

    "If the provider determines that the entity has been provided by itself and that either entity attributes with FetchType.EAGER have not been loaded or that the state of the specified attribute has not been loaded, this methods returns LoadState.NOT_LOADED"; and

    "If a provider cannot determine the load state, this method returns LoadState.UNKNOWN."

    These two methods are differentiated in that WithReference is permitted to obtain/initialize a reference, whereas the other is not. Note that Eclipselink does not obtain a reference for either one anyway.

- *isLoaded(Object entity)*

    "If the provider determines that the entity has been provided by itself and that the state of all attributes for which FetchType.EAGER has been specified have been loaded, this method returns LoadState.LOADED."

    "If the provider determines that the entity has been provided by itself and that not all attributes with FetchType.EAGER have been loaded, this method returns LoadState.NOT_LOADED"; and

    "If the provider cannot determine if the entity has been provided by itself, this method returns LoadState.UNKNOWN."

    This method is also not permitted to obtain/initialize references.

To put it simply, JPA specifies that an *entity is loaded if all the attributes and associations configured to be EAGER by "DEFAULT" have been initialized; if the entity is found to be loaded, then checking for attributes can be done properly and predictably.*

The word "default" is stressed here because it actually describes explicit configuration via ORM XML or annotations - pretty much whatever you define at the beginning.

Watch how your provider implements the specification metioned in the comments in ProdivderUtil.

Eclipselink holds true to this (tested in version 2.5.2), and only to this extent. When dynamic configuration is done through runtime application of FetchGroups, PersistenceUtil becomes completely unusable.

## Experiment-discussion

The meat of this discussion actually appears in the test class found in this github repository:

[Eclipselink Fetch State Experiment](https://github.com/bryke201/eclipselink-fetch-state-experiment){:target="_blank"}

Simply run the *"mvn test"* Maven command from the directory that contains the pom.xml file to see if all the test pass (they should). After this, read the code found in the only test class under *src/test/main/*....

With all the technicalities discussed in the github repository linked previously, I'll just leave y'all with a summary of what was in there. 

## Summary

For Eclipselink, there are actually two main ways to accurately determine entity/attribute/association fetch state. Furthermore, they only work for entities that have been [woven](https://www.eclipse.org/eclipselink/documentation/2.5/concepts/app_dev007.htm){:target="_blank"}. Then again, weaving is what enables lazy loading, and we'd only need to determine fetch state at all if lazy loading was enabled. Anyway, here they are:

- org.eclipse.persistence.queries.FetchGroupTracker, the simpler (but not the best) way
    - FetchGroupTracker is one of the interfaces that entity weaving adds to your entities. It tracks the FetchGroup used when the specific entity was loaded. A FetchGroup is simply a group of attributes used by Eclipselink to specify which attributes and associations a query or fetch should use.

    - FetchGroupTracker has the _persistence_isAttributeFetched(String attributeName) with which the load state of an attribute can be determined.

    Do this by simply casting the entity to FetchGroupTracker, and use the method accordingly:
    
    ```java
    FetchGroupTracker fgTracker = (FetchGroupTracker)entity;
    fgTracker._persistence_isAttributeFetched("some_attribute_or_association");
    ```

    - Now, the problem (or maybe the cool thing) here is that this method is the counterpart of PersistenceUtil; it is unreliable when a FetchGroup is not present for the entity - this means that the entity was fetched using default configuration, where no basic attributes were made LAZY (if a basic attribute was made LAZY, it would have had a default FetchGroup). So if PersistenceUtil works on entities that used defaults while FetchGroupTracker works on entities that used a custom FetchGroup, perhaps they can be made to work together to cover each other's weaknesses (this is only an option; the better ways are described below).

- org.eclipse.persistence.internal.jpa.EntityManagerFactoryImpl, the actual correct way
    - Even though Eclipselink's PersistenceUtil uses the relevant EntityManagerFactoryImpl methods internally, PersistenceUtil fails due to some of the logic written to follow JPA's specification. However, using EntityManagerFactoryImpl's various isLoaded(...) methods actually work properly (isLoaded(entity) follows JPA's definition of a loaded entity; you'll be using the more attribute-specific overloads).

    - The following snippet describes the methods in question:

        ```java
        EntityManagerFactory emf = Persistence.create ...
        
        EntityManagerFactoryImpl emfi = (EntityManagerFactoryImpl)emf;
        
        //the static methods; they accept as the third parameter either an AbstractSession or a DatabaseMapping
        
        //obtaining the DatabaseMapping you need requires a bit more of digging, so the other options might be easier
        isLoaded = EntityManagerFactoryImpl.isLoaded(entity, "attribute_or_association", databaseMapping);
        
        //OBTAINING A SESSION
        //it is easier to obtain a Session
        AbstractSession session = emfi.getServerSession();
        //you can also obtain one from an EntityManager (it might be better to use the unwrap() method)!
        EntityManagerImpl emi = (EntityManagerImpl)entityManager;
        session = emi.getAbstractSession();
        //my favorite: EntityManagerFactoryProvider
        //-assuming we only have ONE persistence unit (and is already loaded; the unit property "deploy-on-startup" can help), the following way is alright:
        session = EntityManagerFactoryProvider.getEmSetupImpls().get(0).getSession();
        //NOTE!: When deployed to servers such as Weblogic, Eclipselink can be made aware of units FROM OTHER APPLICATIONS, storing them with lengthy
        //strings that also describe the location of the unit - be very careful when using the method above and the one that follows:
        session = EntityManagerFactoryProvider.getEntityManagerSetupImpl("persistence_unit_identifier").getSession();
        
        
        
        //finally, execute the method!
        isLoaded = EntityManagerFactoryImpl.isLoaded(entity, "attribute_or_association", session);
        
        //the instance method, which does not need a third parameter; easiest to use if you have access to the factory instance
        isLoaded = emfi.isLoaded(entity, "attribute_or_association"); 
            
        ```

And that’s pretty much it. Hope this helped!

Originally posted at: [Eclipselink 2.5.2 (JPA 2.1.0): Determining Fetch State](http://briaguy.blogspot.com/2017/09/eclipselink-252-jpa-210-determining.html){:target="_blank"}

