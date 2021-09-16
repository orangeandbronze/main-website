---
layout:       blog
title:        "Domain-Driven Design: Cargo Shipping Example"
authors:      Lorenzo Dee
tags:         [DDD, java]
header-image: /assets/images/2014-09-14-domain-driven-design-cargo-shipping-example/Domain-DrivenDesignCargoShippingExample.png
---
*Lorenzo discusses DDD using a cargo shipping scenario.*

I've always found the [cargo shipping example](http://dddsample.sourceforge.net/){:target="_blank"} used in [Eric Evan's book](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215){:target="_blank"} to be quite useful in learning [DDD](https://en.wikipedia.org/wiki/Domain-driven_design){:target="_blank"}. Here are some of my notes.

## Bounded Contexts

Eric Evans did mention in his talk ["What I've Learned About DDD Since the Book" at QCon London 2009](https://www.infoq.com/presentations/ddd-eric-evans/){:target="_blank"}, that ...*in Chapter 14 of the book, I finally got around to talking about context boundaries and context maps... but putting context mapping in Chapter 14 was a mistake. It is fundamental. [You] just can't make models work without establishing context boundaries."*. Evans said that the reality is that there is always more than one model and mapping these models out is crucial to setting the stage for success of a DDD project.

<aside class="float-md-left my-md-3 ml-md-3 mb-3 p-3 col-md-3" style="border: 1px solid #ccc; border-radius: 4px; margin-right:10px;">
Ideally, it would be preferable to have a single, unified model. While this is a noble goal, in reality it typically fragments into multiple models. It is useful to recognize this fact of life and work with it. <a href="https://en.wikipedia.org/wiki/Domain-driven_design#Strategic_domain-driven_design" target="_blank">Wikipedia</a>
</aside>

I believe a lot of teams are struggling with DDD because they're looking for a single, cohesive, all-inclusive model of an organization's entire business domain — you know, like an enterprise model. However, when using DDD, that is not the goal. DDD places emphasis on developing models *within a context* — A description of the conditions under which a particular model applies. Thus, the strategic design principle of *Bounded Context*.

Unfortunately, the cargo shipping example has only one bounded context — *cargo shipping*. I was hoping that it had two or more bounded contexts, so that it can illustrate how context mapping works.

The packages could have been named `cargoshipping`. But the packages were named as follows:

<aside class="float-md-right my-md-3 ml-md-3 mb-3 p-3 col-md-3" style="border: 1px solid #ccc; border-radius: 4px;">
Could carrier movement tracking be another context? What about a billing context (where a someone is billed when the cargo is delivered)?
</aside>

- `se.citerus.dddsample.application`
- `se.citerus.dddsample.domain.model`
- `se.citerus.dddsample.infrastructure`
- `se.citerus.dddsample.interfaces`

In Vernon Vaughn's book, a similar naming convention was suggested (for the "optimal purchasing" context):

- `com.mycompany.optimalpurchasing.application`
- `com.mycompany.optimalpurchasing.domain.model`
- `com.mycompany.optimalpurchasing.infrastructure`
- `com.mycompany.optimalpurchasing.presentation`

## Applications

There are three applications (not three contexts) in the example:

- Booking
- Tracking
- Handling (or Incident Logging)

## Aggregate Roots

There is one package per aggregate, and to each aggregate belongs entities, value objects, domain events, a repository interface and sometimes factories. The aggregate roots are `Cargo`, `HandlingEvent`, `Location`, and `Voyage`.

![Two cat in a cat bed](/assets/images/2014-09-14-domain-driven-design-cargo-shipping-example/cargo-aggregate.png "Two cats in a cat bed") 

## Cargo

The cargo package has the [Cargo](http://dddsample.sourceforge.net/xref/se/citerus/dddsample/domain/model/cargo/Cargo.html){:target="_blank"} entity as the aggregate root. It is made up of `Itinerary-Leg`, `Delivery`, and `RouteSpecification`.

Notice how the [Cargo](http://dddsample.sourceforge.net/xref/se/citerus/dddsample/domain/model/cargo/Cargo.html){:target="_blank"} entity *does not* have getter/setter methods that you'd normally see in anemic domain entities. Instead, it has getters that are differently named (not following JavaBean naming conventions)...

```java
public class Cargo implements Entity<Cargo> {
 
  private TrackingId trackingId;
  private Location origin;
  private RouteSpecification routeSpecification;
  private Itinerary itinerary;
  private Delivery delivery;
 
  public Cargo(
        final TrackingId trackingId,
        final RouteSpecification routeSpecification) {...}
 
  public TrackingId trackingId() { return trackingId; }
 
  public Location origin() { return origin; }
 
  public Delivery delivery() { return delivery; }
 
  public Itinerary itinerary() {
    return DomainObjectUtils.nullSafe(
        this.itinerary, Itinerary.EMPTY_ITINERARY);
  }
 
  public RouteSpecification routeSpecification() {
    return routeSpecification;
  }
  . . .
}
```
...and mutator methods that aren't named as setters.

```java
public class Cargo implements Entity<Cargo> {
 
  . . .
  public void specifyNewRoute(
        final RouteSpecification routeSpecification) {...}
 
  public void assignToRoute(final Itinerary itinerary) {...}
 
  public void deriveDeliveryProgress(
        final HandlingHistory handlingHistory) {...}
  . . .
}
```
The life cycle of a cargo begins with the booking procedure, when the tracking id is assigned. It has an *origin* and a *destination* (via a `RouteSpecification`). As the cargo is being handled (transported to its destination), its delivery and transport status changes (from `NOT_RECEIVED` to `CLAIMED`).

## Handling Event

Although not exactly an aggregate or entity, the [HandlingEvent](http://dddsample.sourceforge.net/xref/se/citerus/dddsample/domain/model/handling/HandlingEvent.html){:target="_blank"} is a *domain event* used to register the handling event when, for instance, a cargo is unloaded from a carrier at some location at a given time. These events are sent from different applications some time after the event occurred and contain information about the cargo (referenced via tracking id), location, timestamp of the completion of the event, and if applicable, a voyage (referenced via voyage number).

Before I illustrate how a `cargo's` delivery status is updated through `handling events`, let me take a closer look at the code behind `handling events`.

```java
public final class HandlingEvent implements DomainEvent<HandlingEvent> {
 
  private Type type;
  private Voyage voyage;
  private Location location;
  private Date completionTime;
  private Date registrationTime;
  private Cargo cargo;
 
  public enum Type implements ValueObject<Type> {
    LOAD(true),
    UNLOAD(true),
    RECEIVE(false),
    CLAIM(false),
    CUSTOMS(false); . . .
  }
  . . .
}
```

I find it interesting that even though [HandlingEvent](http://dddsample.sourceforge.net/xref/se/citerus/dddsample/domain/model/handling/HandlingEvent.html){:target="_blank"} has a public constructor, it also has a factory — `HandlingEventFactory`. While the `HandlingEvent` constructor needs other entities like `Cargo`, `Location`, and `Voyage`, the factory accepts `TrackingId`, `UnLocode`, and `VoyageNumber` to create a new `HandlingEvent`. Notice how the factory uses the unique IDs of the domain entities to retrieve the entities and create the domain event object.

I also find it interesting that there's `HandlingHistory` to represent a list (or collection) of `HandlingEvents`. The list is unmodifiable (i.e. read-only). And has `mostRecentlyCompletedEvent()` and `distinctEventsByCompletionTime()` methods.

The `HandlingEventRepository` is also interesting, since it doesn't have all the CRUD operations. It only has a method to store a `HandlingEvent`, and to retrieve the handling history of a particular cargo via its unique `TrackingId`.

```java
public interface HandlingEventRepository {
  void store(HandlingEvent event);
  HandlingHistory lookupHandlingHistoryOfCargo(
      TrackingId trackingId);
}
```

## Updating a Cargo's Delivery Status

Now, let's see how a `Cargo's` delivery status is updated. Some might be tempted to provide a `setStatus(...)` method. But if we inspect the cargo shipping domain, the delivery status is based on handling events.

`Cargo` (aggregate root) entity has a `Delivery` value object that is the *actual* transportation of the cargo, as opposed to the customer requirement (RouteSpecification) and the *plan* (Itinerary). `Delivery` is updated via a list of handling events (`HandlingHistory`).

```java
public class Cargo implements Entity<Cargo> {
  private TrackingId trackingId;
  private Location origin;
  private RouteSpecification routeSpecification;
  private Itinerary itinerary;
  private Delivery delivery;
  . . .
  public void deriveDeliveryProgress(
        final HandlingHistory handlingHistory) {
    . . .
  }
}
```

The delivery of a cargo is defined by its status at the last known location (e.g. on-board carrier in Hong Kong). It's also possible that the cargo is misdirected.

```java
public class Delivery implements ValueObject<Delivery> {
  private TransportStatus transportStatus;
  private Location lastKnownLocation;
  private Voyage currentVoyage;
  private boolean misdirected;
  private Date eta;
  private HandlingActivity nextExpectedActivity;
  private boolean isUnloadedAtDestination;
  private RoutingStatus routingStatus;
  private Date calculatedAt;
  private HandlingEvent lastEvent;
  . . .
}
 
public enum TransportStatus implements ValueObject<TransportStatus> {
  NOT_RECEIVED, IN_PORT, ONBOARD_CARRIER, CLAIMED, UNKNOWN;
  . . .
}
```

I find that there's overlap between `HandlingEvent`, `HandlingActivity`, and `TransportStatus`. It could have been merged to simplify and clarify the model. If merged, I'd choose the name of `HandlingActivity`, since I find the word "event" to be a bit too technology-centric (probably influenced by "domain event"), and the word "activity" sounds more apt for the domain.

**Why was `HandlingEvent` not part of the `Cargo` aggregate?** Good question. At first, I was also thinking that it would be easier if the handling events were part of a cargo aggregate. According to the [cargo shipping example](http://dddsample.sourceforge.net/characterization.html){:target="_blank"}:

> The main reason for not making `HandlingEvent` part of the cargo aggregate is performance. `HandlingEvents` are received from external parties and systems, e.g. warehouse management systems, port handling systems, that call our `HandlingReportService` webservice implementation. The number of events can be very high and it is important that our webservice can dispatch the remote calls quickly. To be able to support this use case we need to handle the remote webservice calls asynchronously, i.e. we do not want to load the big cargo structure synchronously for each received `HandlingEvent`. Since all relationships in an aggregate must be handled synchronously we put the `HandlingEvent` in an aggregate of its own and we are able processes the events quickly and at the same time eliminate dead-locking situations in the system.

## Anti-corruption Layer
The cargo shipping example may not have shown context mapping. But it did show one strategic DDD pattern — [Anti-corruption Layer](http://dddsample.sourceforge.net/patterns-reference.html){:target="_blank"}. Although not much explanation was put into the code, here's what I can gather from it.

A `HandlingReportService` interface was defined and exposed as a SOAP-based web service.

```java
public interface HandlingReportService {
  public void submitReport(HandlingReport arg0) throws...;
}
```
It accepts a `HandlingReport`. Note that this is not the `HandlingEvent` domain event. HandlingReport is eventually *translated* to a `HandlingEvent`. This effectively shields the cargo shipping context's domain (layer) from being corrupted by all the external applications that would be posting handling events to the system.

```java
<complexType name="handlingReport">
  <complexContent>
    <restriction base="anyType">
      <sequence>
        <element name="completionTime" type="xs:dateTime"/>
        <element name="trackingIds" type="xs:string" maxOccurs="unbounded"/>
        <element name="type" type="xs:string"/>
        <element name="unLocode" type="xs:string"/>
        <element name="voyageNumber" type="xs:string" minOccurs="0"/>
      </sequence>
    </restriction>
  </complexContent>
</complexType>
```
And since the web service needs to return as soon as possible (due to the huge number of events coming in), it does not write directly to the database. It was implemented to create a `HandlingEventRegistrationAttempt` that gets sent to a message queue. The message is then asynchronously consumed by `HandlingEventRegistrationAttemptConsumer` that delegates to `HandlingEventService` (an application service). `HandlingEventServiceImpl` (implementation) simply used the `HandlingEventRepository` to store the handling event. Again, notice how `HandlingEventService` is using unique IDs as input parameters (*not domain entities*).

```java
public interface HandlingEventService {
  void registerHandlingEvent(
          Date completionTime,
          TrackingId trackingId,
          VoyageNumber voyageNumber,
          UnLocode unLocode,
          HandlingEvent.Type type)
      throws CannotCreateHandlingEventException;
}
```

**How does `cargo.deriveDeliveryProgress(HandlingHistory)` get called?** From `HandlingEventService`, the event is stored, and published by calling `ApplicationEvents.cargoWasHandled(...)`. It, in turn, is implemented using a message queue (Yep, another message queue). The event (in the message queue) is consumed by `CargoHandledConsumer` which then calls `CargoInspectionService`. And it finally uses repositories to retrieve the cargo in question, and its related handling history.

1. HandlingEventService -> ApplicationEvents
2. ApplicationEvents -> CargoHandledConsumer (via JMS)
3. CargoHandledConsumer -> CargoInspectionService
4. CargoInspectionService -> cargo.deriveDeliveryProgress(...)

Kinda long-winded if you ask me. But looking at the implementation, I think I can understand why asynchronous events were preferred.

## Ending Thoughts

Boy, was this a long post or what?!

While the cargo shipping example does leave a lot to be desired, it was still a good example. I learned a lot from it. I hope you do too. If you find other things worth noting in the cargo shipping example, please hit the comments and let me know.

Originally posted at: [Domain-Driven Design: Cargo Shipping Example](https://lorenzo-dee.blogspot.com/2014/07/domain-driven-design-cargo-shipping.html){:target="_blank"}


