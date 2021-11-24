---
layout:       blog
title:        "Pupose of SOA"
photo:		   "https://www.orangeandbronze.com/assets/images/2014-10-02-purpose-of-soa/FBimage-PurposeOfSOA.png"
authors:      Lorenzo Dee
tags:         [service-oriented architecture]
header-image: /assets/images/2014-10-02-purpose-of-soa/PurposeOfSOA.png
---
*An overview of Service-Oriented Architecture, including benefits, concepts, and limitations.*

After having a few more discussions about SOA ([after my previous post on the topic](https://lorenzo-dee.blogspot.com/2014/05/service-orientation-object-orientation.html){:target="_blank"}), I happen to watch this video (again) where Anne Thomas Manes (now with Gartner via the acquisition of Burton Group) gave a talk at QCon London 2007 entitled [The Business Value of SOA](https://www.infoq.com/presentations/anne-thomas-manes-business-soa/){:target="_blank"}. Yeah, it’s an old video. I’m glad to have watched it again. It helps me go back to the basics, especially with all the on-going confusion with SOA, ESB, SOAP, XML, REST, and the more recent hype around [microservices](https://martinfowler.com/articles/microservices.html){:target="_blankl"} (µservices). In this post, I’ll be quoting Anne and writing my takeaways from her 2007 talk. Near the end, I refer to a 2009 blog post from Anne, and a more recent 2012 interview.

## Why SOA

<aside class="float-md-right my-md-3 ml-md-3 mb-3 p-3 col-md-3" style="border: 1px solid #ccc; border-radius: 4px;">Why are we doing SOA again? So, what?
</aside>

Before I go about dealing with SOA and what it's all about, I'd like [to start with *why*](https://simonsinek.com/){:target="_blank"}. Why SOA? In Anne's talk, she pointed out that about 80% of IT budget goes into maintenance and operations. That was 2007. In a 2013 Computerworld article entitled, [How to Balance Maintenance and IT Innovation](https://www.computerworld.com/article/2486278/how-to-balance-maintenance-and-it-innovation.html){:target="_blank"}, it mentioned that a significant portion of IT budget goes to maintenance and operations:

> In a recent Forrester Research survey of IT leaders at more than 3,700 companies, respondents estimated that they spend an average 72% of the money in their budgets on such keep-the-lights-on functions as replacing or expanding capacity and supporting ongoing operations and maintenance, while only 28% of the money goes toward new projects.

It seems that very little has changed. In Anne's 2007 talk, she pointed out that the problem is not the new applications, but the high cost of maintaining and operating existing applications. Why does an enterprise have so many applications? An enterprise would usually have about 20 or so core capabilities. But why would it have over 400 applications?

Anne points out that *redundancy* is the source of the problem. She says that there are too many applications, databases, too much money spent on [boat anchors](https://en.wikipedia.org/wiki/Boat_anchor_%28metaphor%29#Software){:target="_blank"}, and very little money left for innovation. **The purpose of SOA is to reduce redundancy**.

So, why SOA? SOA tries to reduce the cost of maintenance and operations by refactoring redundancy. Newer applications should cost less to build too, since there would be a set of services to re-use. With new applications, or newly applied changes to existing applications, organizations can cope with changes in business and become more agile.

## SOA Concepts

SOA is an architecture for designing systems. … What is architecture? Architecture is a style of design. Anne said. She stressed that it is a design for *systems* and not applications.

She continues by explaining that in SOA, a service is the core unit of design. So what's a service?

"A service is something that implements a discrete piece of functionality. It exposes its functionality through a well-defined interface.… so that applications can consume it." Anne said.

She points out that the service should be consumed by *many* applications. "And in fact, the service should be consumed by many applications. And in fact, if you were building a service that is designed to be consumed by a single application, you're probably wasting your time." Anne said. "And I actually want to stress this word consume. Applications consume services. SOA is not about application to application integration. That's how a lot of people use it today. They use SOA technologies to integrate applications. But actually your goal when you're doing SOA is to say what is the capability that is required by multiple applications. Rather than reimplementing that capability many times over in each application that needs it, you refactor the functionality into a service. And then applications consume it."

If you're figuring out which functionality/capability is required by multiple applications, just look around. Look at the existing applications. Look at your application portfolio. Identify which data and/or functionality is being used in multiple applications. Refactor them out as services!

If a functionality is required by many applications, it should be implemented as a service. And it should not be reimplemented in multiple applications.

If the phrase *"shared, reusable services"* is too vague for you or your team, then try using *refactor redundancy*. If the phrases *"suite of small services running in its own process and communicating with lightweight mechanisms, often an HTTP resource API"* or *"services built around business capabilities and independently deployable"*, are a bit confusing, or a bit intimidating, try using *reducing redundancy*.

I find the term microservices to be further misleading. I prefer to focus on the goal of *reducing redundancy*, than using the latest term that is in vogue.

## What SOA is Not?

At about 11:20 into the video, Anne talked about what SOA is not, and touched on why business units are not thrilled about SOA. She says "it is *not* an application-centric approach to building systems. And this is actually one of the most challenging things about SOA, because all your projects are funded based on applications. [If] you think about it, whenever there's a new project, the project that is funded by a business unit, the business unit wants you to build an application to solve a particular problem. The business unit has no interest whatsoever in having you spend extra time to go off and create a piece of capability in this application as a service, which is then gonna get consumed by some other set of business applications by some other business units."

"And so there's a whole lot of business reasons, incentive reasons, why business units aren't too thrilled with the idea of you spending their money that will wind up benefiting other people."

<aside class="float-md-left my-md-3 ml-md-3 mb-3 p-3 col-md-3" style="border: 1px solid #ccc; border-radius: 4px; margin-right:10px;">
"The business unit has no interest whatsoever in having you spend extra time to go off and create a piece of capability in this application as a service, which is then gonna get consumed by some other set of business applications by some other business units."
</aside>

Here, Anne touched a bit on culture and how business units behave. I've witnessed this myself. It's difficult if the incentives of a business unit is just to solve their own problems, and not cooperate with other business units to save organization-wide costs, reduce time to market, and increase competitiveness. So, SOA isn't just an IT initiative. It needs to be a business initiative.

Then Anne continues, "But, that's the way people build systems today. And what they're building are monolithic applications. And when you build monolithic applications, you tend to reproduce the same functionality and comparable data in many different systems. And this duplication, this redundancy is actually the source of most of the trouble in today's IT systems."

Now, here are some more of my takeaways from Anne's talk:

- SOA is about design, not about technology.
- SOA is something you do, and not something you build or buy.
- SOA is much more about culture than about technology.
- You can't buy [SOA] governance. It's something that you do. (from OTN Archbeat Podcast: SOA Governance)

All of the above was from a talk Anne gave in 2007. Forward a little bit into early 2009, Anne blogged that SOA is dead. Three years after that, in 2012, Anne Thomas Manes says, people are starting to actually get the architecture. Well, I'm glad to see that we're all starting to get it.

<aside class="float-md-right my-md-3 ml-md-3 mb-3 p-3 col-md-3" style="border: 1px solid #ccc; border-radius: 4px;">This just happened to me a few months ago. I was in a call with a client relationship manager discussing our approach for a potential project and its proposal. Somehow, the conversation touched on SOA. So, one guy asks if the client is open to using service-oriented architecture. And the client relationship manager answers, Oh yes! They're very much customer service oriented!. Duh?!?
</aside>

## Closing Thoughts

Anne Thomas Manes did a great job peeling away all the technology, and allowed SOA's true value to emerge. For me, she was able to answer the why of SOA, which could be easily lost with all the technology and products that vendors are trying to sell.

After applying SOA to your business, you ought to be asking yourself how much redundancy you've refactored out, and how much time and money these shared services have provided the organization. For measuring the business value of SOA, please watch another [talk by Anne Thomas Manes](https://www.infoq.com/presentations/Proving-Business-Value-of-SOA/){:target="_blank"}.

This post sort of takes me back in time when [SOA was confusing](https://martinfowler.com/bliki/ServiceOrientedAmbiguity.html){:target="_blank"} (and probably still is), and helps me clear some things up. I hope it helps you clear things up too.

Originally posted at: [Purpose of SOA](https://lorenzo-dee.blogspot.com/2014/08/purpose-of-soa.html){:target="_blank"}