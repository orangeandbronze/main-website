---
layout:       blog
title:        "Agile Myth #3: Agile is Short Milestones"
authors:      Calen Legaspi
tags:         agile
header-image: /assets/images/2021-06-17-agile-myth3-agile-is-short-milestones/AgileIsShortMilestonesBanner.png
---
*This is Calen’s fourth post in a 13-part series, [“Agile Myths and Misconceptions”](/blogs/2021/05/agile-myths-and-misconceptions){:target="_blank"} where he strives to correct 12 common misconceptions about Agile Software Development.*

This is my fourth post in my 13-part series, [“Agile Myths and Misconceptions”](/blogs/2021/05/agile-myths-and-misconceptions){:target="_blank"}, It’s based on the talk I gave at the first PSIA Softech Philippine Software Engineering Conference. I am striving to correct 12 common misconceptions about Agile Software Development.

When most people think of Agile, they’re often actually thinking of Iterative Development. Iterative Development is an important part of Agile, but as I’ve discussed in previous posts, Agile itself is much, much broader than just Iterative Development, covering such things as coding practices, design, testing, integration, requirements, etc. You can even have Agile without Iterative Development (ex. Kanban), or Iterative Development without Agile (ex. RUP), but those are other stories that we’ll have to discuss at another time.

## What Iterative Development Is Not
For now, let’s clear up the misconceptions on Iterative Development. When an organization that’s used to Waterfall tries to start on Iterative Development, they often end up with something like this:

- Iterations 1 – 4:   Requirements Gathering
- Iterations 5 – 8:   Design
- Iterations 9 – 16:   Implementation
- Iterations 17 – 20:   SIT/UAT
- Iterations 21 – 24: Production Support

It's still **Waterfall, with many short milestones**! It still has all the problems of Waterfall:  

- The schedule is not based on evidence of velocity from early sprints. 
- The requirements are only validated during UAT, where they're usually found to be wrong, and where it's very expensive and wasteful to change all the code already written. 
- The architectural design is also only validated during testing, or worse, during production.

A little better is the situation in the example below, which I call "**Module Milestones**".

- Phase 1: User Management
- Phase 2: Ordering Module
- Phase 3: Order Processing Module
- Phase 4: Billing Module

This is actually just a series of *small Waterfalls*. I say this is a little better than a single grand Waterfall, since at least at the end of each phase, the Customers are given something that they can evaluate to some degree, and the team has at least some basis to better estimate and design succeeding phases. 

The severe shortcoming of this approach is that usually *most modules are dependent on other modules to be useful*. Customers are therefore not able to properly evaluate a module until the other modules are built, which results in a lot of change requests in the end. In the example above, even if the individual modules can be tested, the modules cannot be tested in a real scenario until all modules are built. So we still get to the usual situation when the change requests happen only at the end of the project, often times *during production*, when the system is actually subjected to real end-to-end use.

## So What is Iterative Development? 

Iterative development is about the *evolution* of software. Let's talk about biological evolution for a while.

A species starts out very simple - say, some sort of worm. It's very simple but complete, able to fully interact with its environment - it's able to find food, convert food into energy and tissue, reproduce... As the species interacts with the environment, natural selection provides feedback to the design - the DNA - on which features the species has that are good, and which ones are bad.

The species evolves to have new features based on this feedback - maybe now the worm starts to evolve simple sight and smell, maybe fins to swim or legs to crawl. This process goes on and on - iterates - until the species becomes more and more complex, better adapted to the environment, better at competing and surviving against other species. Again at each point in the evolution, the species is complete and full able to interact with the environment.

<figure>
    <img src="/assets/images/2021-06-17-agile-myth3-agile-is-short-milestones/IterativeDevelopmentIsEvolution1-300x220.gif" alt="Iterative Development Is Evolution" />
    <figcaption>Iterative Development is not just short milestones. It's about evolving software. Software is complete and end-to-end usable early on, and then requirements are added based on feedback, preferably from actual use.</figcaption>
</figure>

Compare this with the Module Milestones approach. It's like designing and building just one complete, complex body part - say, an arm. There's no way to validate if the arm has all the right features to properly interact with the environment and compete with other species, without the rest of the body.

<figure>
    <img src="/assets/images/2021-06-17-agile-myth3-agile-is-short-milestones/arm-300x137.jpg" alt="Arm" />
    <figcaption>Module Milestones approach is like trying to design and build just one complex body part perfectly. There's no way to effectively validate if all the features are correct without the rest of the body.</figcaption>
</figure>

Iterative Development is about getting to a "Potentially Shippable State" as early as possible, subjecting it to as realistic validation as possible - ideally, actual production use by real users - and then getting real feedback in order to adjust plans, before expensive investment in designing and building wrong features had begun. Then, with each succeeding iteration, continuing to develop requirements that are based on feedback from previous iterations, **maintaining very high quality** at each iteration, in order to keep each evolution in a *Potentially Shippable State*.

## Early ROI

A very important benefit of Iterative Development is early return on investment. A product is made usable towards the beginning of a project, not at the end. The organization has the option to actually deploy the early system and begin receiving early benefits from the system - revenue from customers, cost savings, business visibility, etc. In fact, deploying to production early is actually what is desired in Agile, so that the team and the organization can get real feedback on the requirements.

## Definition of "Done"

For the system to maintain a Potentially Shippable State, it's important that the team has a firm "Definition of Done". A product that is "Potentially Shippable" should have a low probability of breaking in production, and so the quality of the system needs to stay very high throughout the project, as opposed to Waterfall projects where deployability is only a concern towards the end, and so quality only becomes a major concern towards the end.

In Iterative Development, a feature is not considered "Done" unless it has been tested thoroughly, ideally using a lot of automated tests. Automated tests allow a team to do regression testing several times a day, a process that is usually very difficult and expensive in Waterfall projects, and thus often only done towards the end of a project.

An emphasis on testing, especially automated testing, is therefore an essential characteristic of Iterative Development for it to work. The team needs to understand that the "Definition of Done" is a thoroughly tested codebase, ready for deployment, throughout the project.

## Visible, Measurable Progress

In Waterfall projects, how do you track progress? Usually, by status reports. And what is the basis of these status reports? What is the basis of saying that a task is 90% done?

In Iterative Development, progress is based on on *working*, tested, deployable features. The progress of project is more visible, based on features that users can interact with and validate. Progress is based on things that can be seen and counted.

## Summary of Benefits of Iterative Development

When you're really doing Iterative Development, not just short milestones or Module Milestones, here are the benefits you get:

- **Early ROI**
    - The organization starts to receive the benefits of the project - revenue from customers, cost savings, business visibility - towards the beginning of the project, instead of towards the end.
- **Avoiding Waste**
    - Wrong requirements or wrong design are uncovered early, when they're still easy to fix.
    - Succeeding requirements and designs are more reliable, since they are based on feedback from previous iterations, avoiding the waste of specifying a lot of wrong requirements or design upfront.
- **High Quality**
    - Since the system always needs to be maintained in a Potentially Shippable State, testing is done throughout the project, with a preference for automated tests. Early testing means early catching of problems, when they are still easy and cheap to fix.
- **Visible Progress**
    - Delivery is not based on status reports, but on *working, tested, deployable features*, that users can interact with.
- **Staying On-Budget**
    - Budgets? Did we discuss budgets? No we didn't, because that's the topic of our next installment:  Agile Myth #4:  "Agile Cannot Work with Fixed Budgets".

Originally posted at: [Agile Myth #3: "Agile is Short Milestones"](http://calenlegaspi.blogspot.com/2014/07/agile-myth-3-agile-is-short-milestones.html?q=Agile+Myth+){:target="_blank"}
