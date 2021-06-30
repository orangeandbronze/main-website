---
layout:       blog
title:        "Agile Myth #4: Agile Cannot Work with Fixed Budgets"
authors:      Calen Legaspi
tags:         agile
header-image: /assets/images/2021-07-01-agile-myth4-agile-cannot-work-with-fixed-budgets/Agile-Myth4.png
---
This is my fifth post in my 13-part series,[“Agile Myths and Misconceptions”](/blogs/2021/05/agile-myths-and-misconceptions){:target="_blank"}, It's based on the talk I gave at the first PSIA Softech Philippine Software Engineering Conference. I am striving to correct 12 common misconceptions about Agile Software Development.

Organizations often go for Fixed-Scope projects thinking that it will help them stick to a fixed budget. Here's the typical scenario:

1. Project budget and detailed requirements are set in the beginning.
2. Eventually, requirements are achieved, with plenty of overtime, and usually delays.
3. System is unusable because of mismatch to business needs and wrong technical design decisions!
4. *Additional project* phases needed to accommodate actual business needs and correct technical design.
5. Repeat X times.

So what happened to the fixed-budget?

Here's how we stick to fixed-budgets in Agile:

1. **Budget limits team size, composition. and duration.**
    - Example:  If I have a budget of Php 3 million for a project, and I want to have a team of 1 senior engineer, 2 mid-level engineers and a BA/QA that will cost me Php 500k/mo, then I know I have 6 months of duration on the project.
2. **Business objectives are defined upfront, instead of detailed scope.**
    - Instead of detailing the requirements upfront, which are likely wrong, what is emphasized and made clear to the team are the business objectives of the project. Examples of business objectives:
        - First-to-Market: "We need to launch this product first, before our competitor gets a chance to launch theirs, so we can corner the market before our competitor."
        - Win Market Share: "We want the product to win customers away from our competitor."
        - Reduce Cost: "This business operation costs us Php 20 million a year. We would like to use automation to bring it down to Php 10 million a year."
        - Integrity of Transactions: "We need to make sure that our customers never have reason to lose trust in us, so all transactions need to be secure and accurate."
        - Business Visibility: "It's hard for the management to make decisions because we do not have accurate and timely information. We would like to have sales information available to us in no more than two weeks, cost information available within one month, demographic information on our customers within two months...".
3. **Deliver early.**
    - Release something minimal but fully-functional as early as possible, that begins to meet business objectives.
        - The company begins to derive **early return-on-investment, towards the beginning of the project**, instead of only after the project is done (which is usually after several tries).
        - Assumptions regarding requirements and technical design are validated along the way, before large investment in work on likely wrong requirements or design has been implemented.
    - Practice the discipline of DTSTTCPW: ["Do the Simplest Thing that Could Possibly Work"](https://ronjeffries.com/xprog/Practices/PracSimplest.html){:target="_blank"}.
    - See my previous post on [Iterative Development](/blogs/2021/06/agile-myth3-agile-is-short-milestones){:target="_blank"}.
4. **Base succeeding iterations on feedback.**
    - Expand or change requirements and design based on feedback from early iterations. 
    - Feedback can be based on a number of things: Qualitative feedback from users, the amount of uptake in the market, measured reductions in business process time or cost, web analytics, performance metrics, etc.
    - Maintain high quality through each iteration through heavy emphasis on testing, especially automated testing.
5. **When budget runs out, organization is left with a valuable, useful product that is aligned with business objectives.**
    - Easy to ask for more budget since management sees measurable benefits.
    - Compare this with a typical Fixed-Scope project - Usually after budget is spent, product is still in an unusable state because of false assumptions on requirements and design.
        - Very difficult to ask for more budget from management since no measurable benefits were received from the project.

Here's a question: "This 'working with business objectives instead of fixed-scope' might work if you're working with an internal team,but what if you're working with vendors?" Guess what - Toyota has answered that question. This is actually how they've been working with their suppliers for decades. Instead of providing detailed requirements on a part such as a tire or a car seat, instead, they discuss their business objectives with their suppliers, usually it's a "target cost". Toyota and their suppliers then work together to produce a product that meets the desired business objectives.

We've been using this approach at Orange & Bronze with our clients for years as well, with some very large corporations, on very large and critical projects. They open up to us on budget constraints and business objectives, and then we work with them in providing the right team, the right requirements, and the right design in order to meet objectives and budget.

Usually, the motivation for detailed, upfront scope is being burned by past failed projects. People often blame "scope creep" as the reason for project failure, so they obsess about providing detailed requirements upfront. Experience shows us that this is counterproductive. The only way to get a reasonably large project to succeed is frequent release and validation.

Agile has a mistaken reputation of being undisciplined and unpredictable. However, I hope that at this point in my series, you're starting to see that Agile is actually a very disciplined approach, that brings real predictability and visibility to projects, instead of the false predictability and visibility of Waterfall projects. I'll expound on this a little more on my next blog post in this series - Agile Myth #5: "Agile is Unpredictable".
        
Originally posted at: ["Agile Myth #4: Agile Cannot Work with Fixed Budgets"](http://calenlegaspi.blogspot.com/2014/07/agile-myth-4-agile-cannot-work-with.html){:target="_blank"}
