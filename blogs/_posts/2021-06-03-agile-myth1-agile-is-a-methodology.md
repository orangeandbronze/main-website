---
layout:       blog
title:        "Agile Myth #1: Agile is a Methodology"
authors:      Calen Legaspi
tags:         agile
header-image: /assets/images/2021-06-03-agile-myth1-agile-is-a-methodology/agile-myth1-agile-is-a-methodology.jpg
---
*Calen discusses why he thinks Agile itself is not a process. Rather, Agile is the values and principles that allow software development processes to be successful. This is part of a series where Calen will discuss twelve common myths about Agile Software Development. See the whole series [here](/blogs/2021/05/agile-myths-and-misconceptions).*

First of all, if you look up the word "methodology" in the dictionary, it says, "study of methods". When people in the technical or research fields say "methodology", they really mean "process".

So what is a process? A process is basically a set of instructions:  You follow Step 1, Step 2, Step 3... You use this activity in situation A, you use another activity in situation B. You use this document template, that design notation, etc.

![A process is basically a set of instructions or steps](/assets/images/2021-06-03-agile-myth1-agile-is-a-methodology/002-1.jpeg "A process is basically a set of instructions or steps"){:style="float: right; margin: 1rem 0 1rem 1rem"}

Now process is essential to writing good software. All the "Agile Methodologies" - Scrum, XP, Kanban, etc. - prescribe processes. However, what differentiates Agile processes from other processes like RUP (which is a very good process if evaluated solely on process) is the underlying ***values and principles***.

So Scrum, XP, Kanban - these are processes that are founded on Agile. But Agile itself is not a process. Rather, Agile is the values and principles that allow software development processes to be successful. Read the [Agile Manifesto](http://agilemanifesto.org/){:target="_blank"}, the [Principles Behind the Agile Manifesto](http://agilemanifesto.org/principles.html){:target="_blank"}, the [Values of Extreme Programming](http://www.extremeprogramming.org/values.html){:target="_blank"}, the [7 Key Principles of Lean Software Development](https://www.101ways.com/our-blog/){:target="_blank"}. Agile processes try to reduce the amount of process in software development, but something has to replace the what has been removed, or the remaining lightweight processes fall apart. It is values and principles that replace the heavyweight processes that have been removed, so that the lightweight processes have a foundation to stand.

Let me go through some of the values and principles common to many Agile processes:

## Customer Value

Kent Beck, the inventor of XP, said the reason he invented XP was “to heal the divide between business people and programmers.” Traditional processes tend to put development teams and business stakeholders at odds with each other, which is wrong, since the very purpose of a development team is to create something that is valuable and useful for the business stakeholders.

Agile reminds development teams of this primary purpose - that we exist to create things of value to our customers. This is the main motivation for everything we do - why we solicit feedback, why we deliver in short iterations, why we allow changes even late in a project, why we place such strong emphasis on testing... The first characteristic of a team that is really Agile, as opposed to one that is just going through the motions of Agile, is that the members of the team are primarily motivated by the desire to create things of value for their customers.

## Evidence-Based Decision-Making

In Agile, emphasis is placed on making decisions based on evidence. We make estimates after we've done a few iterations and have an idea of our team's velocity, not estimates just pulled out of someone's butt without any basis. We derive requirements based on actual customer feedback, not what we think our customers will want even if the customers have not had the chance to try out a working system. We base our architectures on Spikes – small prototypes which we subject to analysis and tests – not just vendor documentation or articles that we've read, or whatever is the hype technology of the year.

## Technical Excellence

Of the 17 authors of the Agile Manifesto, many of them are thought leaders in the engineering side of software development - Kent Beck is the creator of JUnit and Test-Driven Development, Martin Fowler has written several books on Design Patterns and Refactoring, Robert Martin has written several books on Object-Oriented Design and code quality... A lot of people think Agile is mainly about project management, but the creators of Agile put equal if not greater emphasis on engineering as well.

## Feedback, Visibility, Courage

Agile is about *bringing up problems early and often*, when they're still easier to fix. We have stand-up meetings not so that we can update the project manager of our work, but so that we can bring up issues that others can help us with. We have big visible charts so that everyone, not just in the team but in the organization, knows about the progress of the work and if there are any issues. We emphasize testing so that we can discover issues earlier rather than later.

For all this to work, there needs to be a culture of courage. This is especially difficult for Filipino culture. When there's a problem, we Filipinos tend to keep it to ourselves and fix it ourselves - we'll work unpaid overtime and weekends to try to fix a problem, but when we fail the problem just ends up bigger then when we started. A culture of courage is fundamental in creating a culture and process of feedback and visibility.

## Eliminating Waste

One way we eliminate waste is with requirements. When we specify a lot of requirements upfront, a lot of work in specifying and building the requirements gets wasted, since it's only when customers are actually able to use a product do we realize that a lot of the requirements were wrong. Instead, in Agile, we specify enough requirements to build the smallest releasable system, so that we can get reliable feedback from customers before building more requirements.

Another example is by limiting a team's "Work in Process" or WIP. For example, if the team notices that number of stories are "in process" exceeds their self-designated "WIP Limit", they stop and check what's causing the problem. If, for example, the problem is that the developers are building more features than the testers can test, the developers should stop working and instead help with the testing. Otherwise, untested work just piles up behind the testers as waste.

## Human Interaction

One of the most wasteful things I've seen is how people hide behind emails, documents and issue-tracking tools to communicate, and this just leads to issues dragging on and on. A single issue discussed over email might end up being a thread of over a hundred emails, across several departments separated by different floors, with multiple managers CC'd to the discussion. Often, many of these issues that drag on for days or weeks could be resolved in minutes with people just having a conversation with one another.

This is why Agile advocates a co-located, interdisciplinary team. A developer can just talk to the DBA across the table in order to resolve an issue within minutes, in less time than it would have taken the issue to be typed up on an email or as a ticket. This is why requirements are initially written as very brief User Stories, to serve simply as a placeholder for face-to-face discussions between the Product Owner and the development team. This is why stand-up meetings are preferred to status reports, because spontaneous collaboration can be initiated there, whereas status reports are largely ignored except for the most meticulous of project managers.

## Others

There's a number of other principles and values that I haven't covered here, that are probably much better explained at their respective sources, anyway. Again, I recommend reading up on the [Agile Manifesto](http://agilemanifesto.org/){:target="_blank"}, the [Principles Behind the Agile Manifesto](http://agilemanifesto.org/principles.html){:target="_blank"}, the [Values of Extreme Programming](http://www.extremeprogramming.org/values.html){:target="_blank"}, and the [7 Key Principles of Lean Software Development](https://www.101ways.com/our-blog/){:target="_blank"}.

This is the first in a series of twelve myths of Agile that I will be discussing, based on [my presentation](https://www.slideshare.net/CalenLegaspi1/agile-myths-and-misconceptions-36398946){:target="_blank"} at SofTech 2014 software engineering conference. Hang on for my next blog post, where I will discuss Agile Myth #2: "Agile is About Project Management".

Originally posted at: [Agile Myth #1: "Agile is a Methodology"](http://calenlegaspi.blogspot.com/2014/07/agile-myth-1-agile-is-methodolgy.html){:target="_blank"}