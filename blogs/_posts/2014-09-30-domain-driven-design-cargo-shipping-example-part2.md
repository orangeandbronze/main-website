---
layout:       blog
title:        "Domain-Driven Design: Cargo Shipping Example (Part 2)"
authors:      Lorenzo Dee
tags:         [DDD, java]
header-image: /assets/images/2014-09-14-domain-driven-design-cargo-shipping-example/Domain-DrivenDesignCargoShippingExample.png
---
*Lorenzo continues the discussion on DDD, this time with a focus on persistence of value objects.*

One of my colleagues asked an interesting question about [my previous post](https://www.orangeandbronze.com/blogs/2014/09/domain-driven-design-cargo-shipping-example){:target="_blank"} that I thought would be worth posting here. He asked about the persistence of value objects. He pointed out that the `Cargo` had a `Delivery` property that was replaced (not modified). So, what happens to its persistence? Does it result into a delete and an insert? Let's see.

Let's see how a `Delivery` object is used in a `Cargo` object. In the highlighted lines, we can see that the property is indeed being assigned (not modified or updated) with a new delivery object.

```java
public class Cargo implements Entity<Cargo> {
 
  private TrackingId trackingId;
  private Location origin;
  private RouteSpecification routeSpecification;
  private Itinerary itinerary;
  private Delivery delivery;
 
  public Cargo(final TrackingId trackingId, final RouteSpecification routeSpecification) {
    Validate.notNull(trackingId, "Tracking ID is required");
    Validate.notNull(routeSpecification, "Route specification is required");
 
    this.trackingId = trackingId;
    // Cargo origin never changes, even if the route specification changes.
    // However, at creation, cargo orgin can be derived from the initial route specification.
    this.origin = routeSpecification.origin();
    this.routeSpecification = routeSpecification;
 
    this.delivery = Delivery.derivedFrom(
      this.routeSpecification, this.itinerary, HandlingHistory.EMPTY
    );
  }
 
  public TrackingId trackingId() { return trackingId; }
 
  public Location origin() { return origin; }
 
  public Delivery delivery() { return delivery; }
 
  public Itinerary itinerary() {
    return DomainObjectUtils.nullSafe(
        this.itinerary, Itinerary.EMPTY_ITINERARY);
  }
 
  public RouteSpecification routeSpecification() { return routeSpecification; }
 
  public void specifyNewRoute(final RouteSpecification routeSpecification) {
    Validate.notNull(routeSpecification, "Route specification is required");
 
    this.routeSpecification = routeSpecification;
    // Handling consistency within the Cargo aggregate synchronously
    this.delivery = delivery.updateOnRouting(this.routeSpecification, this.itinerary);
  }
 
  public void assignToRoute(final Itinerary itinerary) {
    Validate.notNull(itinerary, "Itinerary is required for assignment");
 
    this.itinerary = itinerary;
    // Handling consistency within the Cargo aggregate synchronously
    this.delivery = delivery.updateOnRouting(this.routeSpecification, this.itinerary);
  }
 
  public void deriveDeliveryProgress(final HandlingHistory handlingHistory) {
    // TODO filter events on cargo (must be same as this cargo)
 
    // Delivery is a value object, so we can simply discard the old one
    // and replace it with a new
    this.delivery = Delivery.derivedFrom(routeSpecification(), itinerary(), handlingHistory);
  }
  . . .
}
```

Here is the `Delivery` value object (summarized). It doesn't have mutator methods. The class is immutable. Note that `updateOnRouting()` and `derivedFrom()` methods return new `Delivery` objects.

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
 
  private static final Date ETA_UNKOWN = null;
  private static final HandlingActivity NO_ACTIVITY = null;
 
  /**
   * Creates a new delivery snapshot to reflect changes in routing, i.e.
   * when the route specification or the itinerary has changed
   * but no additional handling of the cargo has been performed.
   *
   * @param routeSpecification route specification
   * @param itinerary itinerary
   * @return An up to date delivery
   */
  Delivery updateOnRouting(RouteSpecification routeSpecification, Itinerary itinerary) {
    Validate.notNull(routeSpecification, "Route specification is required");
 
    return new Delivery(this.lastEvent, itinerary, routeSpecification);
  }
 
  /**
   * Creates a new delivery snapshot based on the complete handling history of a cargo,
   * as well as its route specification and itinerary.
   *
   * @param routeSpecification route specification
   * @param itinerary itinerary
   * @param handlingHistory delivery history
   * @return An up to date delivery.
   */
  static Delivery derivedFrom(
       RouteSpecification routeSpecification,
       Itinerary itinerary,
       HandlingHistory handlingHistory) {
    Validate.notNull(routeSpecification, "Route specification is required");
    Validate.notNull(handlingHistory, "Delivery history is required");
 
    final HandlingEvent lastEvent = handlingHistory.mostRecentlyCompletedEvent();
 
    return new Delivery(lastEvent, itinerary, routeSpecification);
  }
 
  /**
   * Internal constructor.
   */
  private Delivery(
        HandlingEvent lastEvent, Itinerary itinerary,
        RouteSpecification routeSpecification) {
    this.calculatedAt = new Date();
    this.lastEvent = lastEvent;
 
    this.misdirected = calculateMisdirectionStatus(itinerary);
    this.routingStatus = calculateRoutingStatus(itinerary, routeSpecification);
    this.transportStatus = calculateTransportStatus();
    this.lastKnownLocation = calculateLastKnownLocation();
    this.currentVoyage = calculateCurrentVoyage();
    this.eta = calculateEta(itinerary);
    this.nextExpectedActivity = calculateNextExpectedActivity(routeSpecification, itinerary);
    this.isUnloadedAtDestination = calculateUnloadedAtDestination(routeSpecification);
  }
 
  public TransportStatus transportStatus() {...}
 
  public Location lastKnownLocation() {...}
 
  public Voyage currentVoyage() {...}
 
  public boolean isMisdirected() {...}
 
  public Date estimatedTimeOfArrival() {...}
 
  public HandlingActivity nextExpectedActivity() {...}
 
  public boolean isUnloadedAtDestination() {...}
 
  public RoutingStatus routingStatus() {...}
 
  public Date calculatedAt() {...}
  . . .
}
```

The above entities don't use JPA annotations. So, I dug into the example's ORM which happens to be Hibernate `(Cargo.hbm.xml)`. I saw the following:

```java
<hibernate-mapping default-access="field">
  <class name="se.citerus.dddsample.domain.model.cargo.Cargo" table="Cargo">
    <id name="id" column="id">...</id>
 
    <many-to-one name="origin" column="origin_id" not-null="false" cascade="none" update="false" foreign-key="origin_fk"/>
 
    <component name="trackingId" unique="true" update="false">...</component>
 
    <component name="delivery" lazy="true">
      <property name="misdirected" column="is_misdirected" not-null="true"/>
      <property name="eta" column="eta" not-null="false"/>
      <property name="calculatedAt" column="calculated_at" not-null="true"/>
      <property name="isUnloadedAtDestination" column="unloaded_at_dest" not-null="true"/>
 
      <property name="routingStatus" column="routing_status" not-null="true">...</property>
 
      <component name="nextExpectedActivity" update="true">
        <many-to-one name="location" column="next_expected_location_id" foreign-key="next_expected_location_fk" cascade="none"/>
        <property name="type" column="next_expected_handling_event_type">...</property>
        <many-to-one name="voyage" column="next_expected_voyage_id" foreign-key="next_expected_voyage_fk" cascade="none"/>
      </component>
 
      <property name="transportStatus" column="transport_status" not-null="true">...</property>
      <many-to-one name="currentVoyage" column="current_voyage_id" not-null="false" cascade="none" foreign-key="current_voyage_fk"/>
      <many-to-one name="lastKnownLocation" column="last_known_location_id" not-null="false" cascade="none" foreign-key="last_known_location_fk"/>
      <many-to-one name="lastEvent" column="last_event_id" not-null="false" cascade="none" foreign-key="last_event_fk"/>
    </component>
    ...
  </class>
</hibernate-mapping>
```
<aside style="float: right; width: 30%; margin: 1em 0 1em 1em; padding: 1em; border: 1px solid #ccc; border-radius: 8px">
The JPA annotation counterpart of &lt;component&gt; is <a href="http://docs.jboss.org/hibernate/core/3.6/reference/en-US/html/mapping.html#mapping-declaration-component" target="_blank">@Embedded</a>.
</aside>

The delivery value object is declared as a &lt;component&gt;. A component is a contained object that is persisted as a value type and not an entity reference. That means, it does not have its own table. Instead, its properties are mapped as columns in the surrounding &lt;class&gt;'s table. So here, the delivery object's properties are actually columns in the `Cargo` table.

<aside class="float-md-left my-md-3 ml-md-3 mb-3 p-3 col-md-3" style="border: 1px solid #ccc; border-radius: 4px; margin-right:10px;">
Also note how Hibernate was configured to access by *field* and not by property. This tells Hibernate to use direct field injection, and not use setter methods.
</aside>

So, does it result into a delete and an insert? The answer is **neither**. It results into an *update!*

Note that not all value objects will be persisted this way. The `Leg` value objects are deleted whenever a new `Itinerary` object is assigned to a `Cargo`. This results into `Leg` value objects being inserted (after the old ones are deleted). So, please check your ORM and persistence mechanisms to be sure, and see if there are any performance problems.

**But why all the hassle just to use value objects?** Good question. Here's what the [cargo shipping example](http://dddsample.sourceforge.net/characterization.html){:target="_blank"} has to say:

> When possible, we tend to favor Value Objects over Entities or Domain Events, because they require less attention during implementation. Value Objects can be created and thrown away at will, and since they are immutable we can pass them around as we wish.

So, I guess in the cargo shipping example, the likelihood of an itinerary being replaced is quite minimal. Thus, they didn't have performance problems even when the child leg objects were being deleted (and new ones inserted).

Originally posted at: [Domain-Driven Design: Cargo Shipping Example (Part 2)](https://lorenzo-dee.blogspot.com/2014/08/domain-driven-design-cargo-shipping-part-2.html){:target="_blank"}

