---
layout:       blog
title:        "Agile Myth #6: Agile Means No Upfront Design"
authors:      Calen Legaspi
tags:         agile
header-image: /assets/images/2021-07-15-agile-myth6-agile-means-no-upfront-design/AgileMyth6-AgileMeansNoUpfrontDesign-banner.png
---
*This is Calen’s seventh post in a 13-part series, [“Agile Myths and Misconceptions”](/blogs/2021/05/agile-myths-and-misconceptions){:target="_blank"} where he strives to correct 12 common misconceptions about Agile Software Development.*

First of all, let me correct the notion that Agile has little to no concern about design. Many if not most of the signatories of the Agile Manifesto are thought leaders in design. The two people who called the seminal ["Lightweight Process Summit"](https://sites.google.com/site/unclebobconsultingllc/the-founding-of-the-agile-alliance){:target="_blank"} in Snowbird resort in 2001, where the term "Agile Software Development" was coined and the Agile Manifesto was written, were Martin Fowler and Robert Martin. Martin Fowler is synonymous with Design Patterns. Robert Martin wrote one of the first books with "Agile" in the title - the book "Agile Software Development". This is the book where he outlined the now famous ["SOLID" principles](https://en.wikipedia.org/wiki/SOLID){:target="_blank"}, and most of the rest of the book dealt with Design Patterns, Refactoring, and Test-Driven Development.

<figure style="float: right; margin: 1rem 0 1rem 1rem">
    <img src="/assets/images/2021-07-15-agile-myth6-agile-means-no-upfront-design/0135974445.jpg"/>
    <figcaption style="width:400px"><a href="https://books.google.com.ph/books?id=0HYhAQAAIAAJ" target="_blank"><em>One of the first books on Agile. Its coverage mostly on design - This was where the SOLID principles were introduced, and most of the rest of the book dealt with Design Patterns, Refactoring, and Test-Driven Development.</em></a></figcaption>
</figure>

So now let's discuss upfront design. Agile teams have been told that "Big Design Upfront" is bad, so some interpret that to mean that "No Design Upfront" must be good. The truth is somewhere in the middle - "Minimal Design Upfront", supported by Spikes.

## What's Wrong with Big Upfront Design?

The main problem with "Big Upfront Design" is that after all the time and energy spent in creating a design, we almost always find out that much of the design is wrong only when the team starts coding, or even worse, when the team starts performance testing towards the end of the project!

For the Java developers, do you remember the dark days of EJB2? All of us lept like lemmings to adopt EJB into our projects, since it was the Sun Microsystems standard designed to make systems "scalable". What we ended up was project after project that could only support a fraction of the users they were meant to support. I know of one payroll project that was supposed to support thousands of users, but when it was tested with just ten users the system crawled. The whole project was canceled, after two years of development and huge loses for both client and vendor.

How about Healthcare.gov? A lot of problems were blamed on the use of a very new columnar database that promised performance and scalability, but caused more problems than it solved. And when I myself was a developer, I remember staring at a UML diagram that my boss was forcing me to implement, but was *impossible* to implement in code!

The main problem with Big Upfront Design is that very little of it is ***validated***. And by the time we find out that a design decision is wrong, so much code had already been written, that changing the design becomes expensive, wasteful, and risky.

## Agile Design is Incremental & Evidence-Based

So how is design done in Agile? First is the idea of "Just Enough Design" - The team makes just enough design decisions in order to get going with the project. However, as in all decisions in Agile, decisions need to be *empirical* or evidence-based. Design decisions therefore need to be validated before a large amount of code is invested in the design.

One of the best ways to validate a design decision is through a Spike Solution. The team writes one or more small prototypes that implement the design, often taking actual use cases or features from the project. If performance is a concern of the design, the team may subject the Spike Solution to performance tests. Other kinds of tests may also be applied, depending on what concerns the design is supposed to achieve (security, integrity, scalability, ease-of-use, etc.) So early on, the team finds out if a design approach is easy or hard to use, performs as expected, or is otherwise relevant to the problems the design is meant to solve.

After some initial design decisions have been made, the rest of the design is done incrementally, with every Sprint. This is the concept of ["Emergent Design"](https://www.scaledagileframework.com/emergent-design/){:target="_blank"}. With every Sprint, the team continues to do just *enough design* to implement the near-term work. Improvements or corrections to the design are discovered along the way and implemented, often through Refactoring.

**A Note on UML Tools**

While I'm advocating design, I'm not advocated going out and getting some UML software. I've tried a lot of tools in my years in software - UML tools start out handy for small designs, but as designs get more complex, and the need to collaborate on designs increases, the UML tools just tend to hold the team back rather than help the team forward.

Arguably the best design tool for a team is a whiteboard. It radiates information to the entire team, it allows for impromptu discussions and collaboration, and it's limited space prevents you from overcomplicating the design, so you get on with implementing the code.

<figure>
    <img src="/assets/images/2021-07-15-agile-myth6-agile-means-no-upfront-design/DFS Domain Model.jpg"/>
    <figcaption style="width:600px"><em>Don't waste time detailing your design on some UML tool. Scribble just enough on a whiteboard for the team to get going. Finish your design in the code itself.</em></figcaption>
</figure>

## Which Parts of the Design Are Upfront?

So what specifically are the parts of the design done upfront? For all the projects I've observed, there are at least three aspects of design where some upfront work is done even before the first Sprint begins. These are Domain Model, Architecture, and User Interface. It's pretty much impossible to get a team to work together efficiently unless at least some design in each of these three aspects has been decided on beforehand. Again, only just enough design for the team to get started is done. The rest of the design emerges with each Sprint.

**Domain Model**

The business logic of a system is the most important part, since it's the very reason why the system exists. It's also a part of the system that usually changes the most often.

A lot of teams just cram their business logic into procedural routines called "Transaction Scripts". This is fine for simple systems, but for anything moderately complex, this results in a lot of messy, convoluted, duplicated, hard-to-understand code. And since business logic changes a lot, this kind of confusing code can be a source of bugs. In addition to that, code that's difficult to understand slows the team down.

It's therefore important that the business logic is written in a way that's organized, readable, and easy and safe to change. The recommended way to achieve this is through what's called a "Rich Domain Model", meaning the entities of a particular business domain are modeled as classes, and their interactions with one another coded as method calls to one another.

Designing [domain models is a lengthy topic](http://calenlegaspi.blogspot.com/2014/04/the-lost-art-of-object-oriented.html){:target="_blank"}, and I probably lost some of you already, so let me just point you to a great starting point - [Craig Larman's "Applying UML & Patterns"](https://books.google.com.ph/books/about/Applying_UML_and_Patterns.html?id=r8i-4En_aa4C&redir_esc=y){:target="_blank"}, which is a step-by-step guide to analyzing a business domain to design a domain model. Supplement that with [Len Silverston's The Data Model Resource Book](https://www.amazon.com/Data-Model-Resource-Book-Vol/dp/0471380237){:target="_blank"} series, which is a catalog of industry-tested data models, which are starting points for your domain model designs.

<figure style="float:left; margin: 1rem 1rem 1rem 0;">
    <img src="/assets/images/2021-07-15-agile-myth6-agile-means-no-upfront-design/9780131489066.jpeg"/>
    <figcaption style="width:500px"><a href="https://books.google.com.ph/books/about/Applying_UML_and_Patterns.html?id=r8i-4En_aa4C&redir_esc=y" target="_blank"><em>Best starting point to learning domain analysis and design.</em></a></figcaption>
</figure>
<figure style="float:right; margin: 1rem 1rem 1rem 4rem;">
    <img src="/assets/images/2021-07-15-agile-myth6-agile-means-no-upfront-design/51t5kyuWBDL._SX258_BO1204203200_.jpeg"/>
    <figcaption style="width:500px"><a href="https://www.amazon.com/Data-Model-Resource-Book-Vol/dp/0471380237" target="_blank"><em>3-volume catalog on established data models for various industries, such as manufacturing, accounting and insurance.</em></a></figcaption>
</figure>

I'd suggest that as a team starts with a project, it draws some simple, partial, low-detail UML Class Diagrams to agree on their understanding of the business domain. It would be good if the team can bring in Product Owners or Customers to validate their understanding. This is one reason to be biased towards low-detail diagrams over high-detail diagrams - low-detail diagrams tend to be more understandable and less intimidating to non-technical people.

**Architecture**

"Architecture" is just a fancy term for the part of the design that deals with the "non-functional" requirements, or in other words, requirements that are not business logic. Examples are performance, uptime, security, and cost.

Often, architectural mistakes are only discovered towards the end, or worse, after the system is deployed. Architectural mistakes could manifest themselves as a slow system, or maybe a security breach! It could manifest itself as expensive recurring costs or the cost of scaling the system is high. Since these mistakes are found towards the end, it's very expensive and risky to change these architectural decisions, since so much code has already been invested on top of the chosen architecture.

Why are architectural decisions so often wrong? Architectural decisions are usually based on vendor documentation, vendor demos, or popularity. A vendor may present a demo or a proof-of-concept to sell you on a product, but remember the vendor is biased - he built the proof-of-concept to sell you on the product, not really to test if the product works for your particular project.

There's also such a thing as "Resume-Driven Development". This is where developers choose a technology not because they think it's what's best for their project, but because experience in the technology will look good in their resume. They'll use the technology for a while, put it in their resume, and look for a better job. You're now stuck with a technology that may or may not be the best choice. Oh, have I seen this several times in organizations where their code base is a mess.

**Architectural decisions should be based on tests**, ***done by the team, and specific to the problems to be solved.*** In Agile, we build simple prototypes, called ["Spike Solutions"](http://www.jamesshore.com/v2/books/aoad1/spike_solutions){:target="_blank"}, to resolve technical questions. These Spikes can be subjected to performance tests and other evaluations of suitability. Certain user stories or scenarios can be selected and implemented as a full stack using the technologies in question, and then subjected to various tests and other evaluations.

**User Interface**

High-level themes and layouts for the user interface of a system should be decided early on, for the purposes of consistency in the user interface. This is evolved and detailed based on feedback from the customer, with each iteration.

## Wrap-Up
Good design, especially object-oriented design, is core to Agile. As such, some upfront thought needs to be given design to set the team in the right direction. Agile just emphasizes **simplicity** and **evidence** in design decisions.

Originally posted at: ["Agile Myth #6: Agile Means No Upfront Design"](http://calenlegaspi.blogspot.com/2014/09/agile-myth-6-agile-means-no-upfront.html?q=Agile+Myth){:target="_blank"}
