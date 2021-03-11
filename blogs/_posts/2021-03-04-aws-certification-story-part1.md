---
layout:       blog
title:        "AWS Certification Story Part1"
authors:      Redan Benedict Alcaide
tags:         cloud-computing java
header-image: /assets/images/2021-03-04-aws-certification-story/aws-certification-story.png
---
The following post is based on the talk I did for one of our weekly **S.K.I.L.L (Skill or Knowledge I've Learned Lately)** learning sessions. Part 1 is mostly a primer on Cloud Computing.

## A primer on "Cloud Computing"...

Let's say for example that you had an awesome idea for a product. This could be anything, but for the sake of brevity, let's say that it's an e-commerce web app for customized kitten beds.

![Two cat in a cat bed](/assets/images/2021-03-04-aws-certification-story/pexels-pixabay-64284.jpg "Two cats in a cat bed") 

Now you spend the next 3 weeks coding on your machine developing the initial MVP (Minimum Viable Product). After spending all-nighter after all-nighter, drinking countless cups of coffee, and writing a gazillion lines of code--you are now done!

You then invite people over so they can come and take a look at the app. After giving a short demo, they love it, people go crazy over your app. They ask you about the possible payment methods, bed types, and badger you about when the app is going to be available. Congratulations! You've now confirmed that people are willing to pay for your service. Since the response to your MVP was a smashing success, you've now decided to take the app live!

### In the olden days of yore...

There were a lot of upfront costs to get you up and running. This was primarily because you had to provision, configure, and maintain your own servers so that you can make your app run (and keep it running). You need specialized knowledge about networking, system administration, database administration, and a lot of other stuff just to make your application run on your server. Also, you had to plan for capacity since there's a huge cost to buying server machines. Stuff like RAM, CPU, network IO, and disk consumption need to be carefully considered when buying each machine. Furthermore, setting up your infrastructure to be scalable, reliable, available, and fault-tolerant is a different type of beast.

I know what I've said sounds daunting, but thanks to Cloud Computing you don't have to worry!

<figure>
  <img src="/assets/images/2021-03-04-aws-certification-story/pexels-christina-morillo.jpg" alt="Woman working on server machine" />
  <figcaption>Image by Christina Morillo via Pexels</figcaption>
</figure>

## Cloud Computing

Cloud Computing can best be described as:

> the on-demand delivery of computing power, database, storage, applications, and other IT resources through a cloud services platform via the Internet with pay-as-you-go pricing.  
>
> Source: https://aws.amazon.com/what-is-cloud-computing/

<figure>
  <img src="/assets/images/2021-03-04-aws-certification-story/pexels-brett-sayles.jpg" alt="Data Center" />
  <figcaption>Image by Brett Sayles via Pexels</figcaption>
</figure>

Cloud Computing makes provisioning resources easy and mundane. Instead of doing the heavy lifting yourself, you can pay for a Cloud Computing platform to do it for you! 

## Types of Cloud Computing

- **Infrastructure as a service** (IaaS) - Rent your own infrastructure like cloud VMs, databases, networking, and compute resources. Most IaaS platforms provide the ff. "base" services:
    - **Compute** - Virtual machines, containers, and serverless computing
    - **Storage** - Databases, file systems, block storage, and object storage
    - **Networking** - DNS, CDN, and VPNs
- **Platform as a service** (PaaS) - Provides a platform where you only need to think about deploying your code and the platform does the rest like resource provisioning and networking.
- **Software as a service** (SaaS) - Apps hosted by a cloud provider that is typically made available to "subscribers" via the internet. Think *Netflix* or *Spotify*.
- **Serverless Computing** - Serverless computing is a more granular form of PaaS. You can upload snippets of "functions" that are executed by your Cloud Computing provider according to some event. The nature of this makes it easier to scale both in terms of cost and performance since you can easily configure parameters for horizontal scaling. Pricing is also based on a pay-per-invocation cost model. 

## Up next...

Thank you for taking the time to read my very first blog post. I could've gone on and on about Cloud Computing but I know that there are much much better resources for this. My goal here is to give people at least a sense of what Cloud Computing is. In the next part of this blog post, I'll share my experience and motivations in taking the AWS Solutions Architect Association (SAA-C02) exam.

Until then!

