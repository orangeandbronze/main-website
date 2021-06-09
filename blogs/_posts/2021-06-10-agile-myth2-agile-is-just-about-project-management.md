---
layout:       blog
title:        "Agile Myth #2: Agile is Just About Project Management"
authors:      Calen Legaspi
tags:         agile
header-image: /assets/images/2021-06-09-agile-myth2-agile-is-just-about-project-management/AgileMyth2-Agile-is-AboutProjectManagement-banner.png
---
*This is part of a series where Calen will discuss twelve common myths about Agile Software Development. See the whole series [here](/blogs/2021/05/agile-myths-and-misconceptions){:target="_blank"}.*

*This is my third post on a multi-part series entitled, ["Agile Myths and Misconceptions"](/blogs/2021/05/agile-myths-and-misconceptions){:target="_blank"}. It's based on the talk I gave at the first PSIA Softech Philippine Software Engineering Conference.  I am striving to correct 12 common misconceptions about Agile Software Development.*

Agile has equal or more emphasis on engineering than project management. Just check out the authors of the Agile Manifesto - a large number of them are thought leaders in nuts-and-bolts software engineering: Kent Beck is the creator of JUnit and Test-Driven Development, Martin Fowler has written several books on Design Patterns and Refactoring, Robert Martin has written several books on Object-Oriented Design and code quality... If you check out [Extreme Programming](http://www.extremeprogramming.org/){:target="_blank"}, which was the first Agile process to gain popularity, and precedes Agile itself, it leans more towards engineering practices, such as TDD, Continuous Integration, Coding Standards and Pair Programming. If you attended an early Agile training course, it was actually a programming workshop where you pair up with another programmer around a workstation and write code!

Most of the Agile authors were aware that even if you do the project management side well, if you ignore the engineering side, a project will eventually be in quagmire. Consider what Martin Fowler [said in his blog](https://martinfowler.com/bliki/FlaccidScrum.html){:target="_blank"}:

>There's a mess I've heard about with quite a few projects recently. It works out like this:
>    
> - They want to use an agile process, and pick Scrum 
> - They adopt the Scrum practices, and maybe even the principles
> - After a while progress is slow because the code base is a mess
>
>What's happened is that they haven't paid enough attention to the internal quality of their software. If you make that mistake you'll soon find your productivity dragged down because it's much harder to add new features than you'd like. You've taken on a crippling [Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html){:target="_blank"} and your scrum has gone weak at the knees.

Here's an illustration of what Martin Fowler is saying:

![Cost of Bad COde](/assets/images/2021-06-09-agile-myth2-agile-is-just-about-project-management/CostOfBadCode.png "Cost of Bad COde Illustration")

So initially, a team's velocity increases with each iteration, but as the project progresses, the team's velocity starts to steadily degrade, even if people are working just as hard or harder.

Here's a breakdown of what's happening to the team. Let's pretend that a team's capacity is like a pipe. Requirements go in one end, some development happens inside, and then features come out the other end. Just like any pipe, the team's capacity is finite.

![Software Development Productivity Diagram 1](/assets/images/2021-06-09-agile-myth2-agile-is-just-about-project-management/SoftwareDevelopmentProductivityDiagram-1.png "Software Development Productivity Diagram 1"){:style="margin: 2rem 0 2rem"}

Initially, all of the team's capacity is used to turn requirements into features, but later on, naturally, some bugs are found, so part of the team's capacity is now taken up by bug fixing.

![Software Development Productivity Diagram 2](/assets/images/2021-06-09-agile-myth2-agile-is-just-about-project-management/SoftwareDevelopmentProductivityDiagram-2.png "Software Development Productivity Diagram 2"){:style="margin: 2rem 0 2rem"}

That situation is still fine, but if the team neglects the engineering practices, you end up with [Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html){:target="_blank"}. In a nutshell, Technical Debt is difficulty in working code where the design and code quality is bad. The code is very difficult to understand, it's hard to find bugs, a lot of things need to be modified for every change, and the code is very fragile. It's a lot like real debt - when you don't pay your credit card bill, the interest payments eat up your capacity to pay for day-to-day things like food and rent. With technical debt, if the team doesn't take the effort to clean up their code, write automated tests, integrate often, apply proper design approaches, measure code quality, and other engineering practices, eventually the code becomes harder and harder to work with, and just wrestling with the code takes up more and more of the team's capacity, just like interest from debt takes up one's capacity to spend. What's more, since the code is more fragile, the project has more bugs, and so even more of the team's capacity is used up in bug fixing.

![Software Development Productivity Diagram 3 ](/assets/images/2021-06-09-agile-myth2-agile-is-just-about-project-management/SoftwareDevelopmentProductivityDiagram-3.png "Software Development Productivity Diagram 3"){:style="margin: 2rem 0 2rem"}

Just like real debt, if technical debt is not addressed, it just grows - the more code you add to the system, the harder and harder it just gets to work with. Eventually, the majority of the team's capacity is taken up by just technical debt and bug fixing. Very little actual creation of new features comes out of the development team, if any at all. 

![Software Development Productivity Diagram 4](/assets/images/2021-06-09-agile-myth2-agile-is-just-about-project-management/SoftwareDevelopmentProductivityDiagram-4.png "Software Development Productivity Diagram 4"){:style="margin: 2rem 0 2rem"}

I'm not exaggerating in any way. One of the clients I consulted for had development teams in three countries - with none of them producing any new features for months! The teams were bogged down with such a bad codebase that they couldn't change any code without creating a large number of bugs.

Again, the way you avoid this situation is through proper engineering practices. If you're just starting out with engineering practices, I think a good place to start would be at coding practices. If you're a Jave programmer, good book for this is [Robert Martin's "Clean Code"](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882){:target="_blank"}. 

After that, you might want to move to learning Test-Driven Development. My recommended TDD book for Java developers is ["Test-Driven" by Lasse Koskela](https://www.amazon.com/Test-Driven-Acceptance-Java-Developers/dp/1932394850){:target="_blank"}. After that, read up on proper practices for version control and [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html){:target="_blank"}. For those of us working on legacy code, which is the majority I would think, a good reference is ["Working Effectively with Legacy Code" by Michael Feathers](https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052){:target="_blank"}.

For those further along, you might want to start exploring approaches to design. Domain-model design is a good place to start. Some recommended references are ["Applying UML and Patterns" by Craig Larman](https://www.amazon.com/Applying-UML-Patterns-Introduction-Object-Oriented/dp/0131489062){:target="_blank"}, ["The Data Model Resource Book" by Len Silverston](https://www.amazon.com/Data-Model-Resource-Book-Vol/dp/0471380237){:target="_blank"}, ["Domain-Driven Design" by Eric Evans](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215){:target="_blank"}, and ["Implementing Domain-Driven Design" by Vaughn Vernon](https://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577){:target="_blank"}.

For the other areas of design, you can check out the various design patterns books around such as [Head First Design Patterns](https://www.amazon.com/Head-First-Design-Patterns-Freeman/dp/0596007124){:target="_blank"}, [Patterns of Enterprise Application Architecture](https://www.amazon.com/Enterprise-Application-Architecture-Addison-Wesley-Signature-ebook/dp/B008OHVDFM){:target="_blank"}, [Enterprise Integration Patterns](https://www.amazon.com/Enterprise-Integration-Patterns-Designing-Deploying/dp/0321200683){:target="_blank"} and [Service Design Patterns](https://www.amazon.com/Service-Design-Patterns-Fundamental-Solutions/dp/032154420X){:target="_blank"}.

The next myth I will tackle is Agile Myth #3: "Agile is Short Milestones".

Originally posted at: [Agile Myth #2: "Agile is Just About Project Management"](http://calenlegaspi.blogspot.com/2014/07/agile-myth-2-agile-is-about-project.html){:target="_blank"}