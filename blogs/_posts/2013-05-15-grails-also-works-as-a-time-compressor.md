---
layout:       blog
title:        "Grails, also works as a time compressor"
authors:      KARL BENAVIDEZ 
tags:         [ grails, groovy, java]
header-image: /assets/images/2013-05-15-grails-works-also-as-a-time-compressor/grails-works-also-as-time-compressor.png
---

*Karl gives us a brief on how Grails works, why it is the convenient app development framework of choice, and how it can save Java developers a lot of time creating web applications.*

Grails is basically a framework for web pages that uses the Groovy programming language (loosely based on JAVA’s own syntax) to generate web pages which utilize Spring MVC and Hibernate. All this culminates into perhaps one of the most convenient ways to generate web functioning pages with only the business model in mind.

Keep in mind though that Grails’ specialty is that of inventory systems. In this case, it specializes in CRUD (Create, Read, Update, Delete) applications. So if that’s not the type of site you want, then you may have to edit it accordingly. My point being: Grails will save you time by creating all of the parts necessary to get a working, **functional**, inventory application.

How does this all work? Grails builds the site for you from a predetermined template. All you really need to do after installation is to invoke the grails create-appand it will generate a project for you in the current directory. It generates a default page for you as well! This default page has all the shortcuts to the domain classes you have (or will) create.

What about the controllers you say? Well they don’t exist yet, because you haven’t created objects / models. In this case, Grails calls them domain classes. How do you make one? As simple as the previous example. Try create-domain-class org.mycompany.Object. Now you have defined a domain class! Remember to put the package name just to maintain rules on packaging.

Then you can make a controller using another similar command: create-controller org.mycompany.Object. This generates a controller class which applies to your object. And guess what? It covers all CRUD functions! You can now deploy your application with it working.

Now that you have an idea how Grails can create and deploy web applications with only a few commands, then you can probably tell how much it saves on time and effort making them. A general web page involves modelling, logic, database management, front-end to back-end, among other things. This process can take hours. With Grails and the help of Spring and Hibernate, you can create a functional program in mere minutes.

A word of advice though. Given the convenience of such features, the downside would have to be visibility. You won’t know how it works if you did not already understand how servlets would behave. Over-dependency may also lead to getting rusty on your web page-making skills, kids! So use sparingly and review your web frameworks. Good luck and enjoy Grails though – it will definitely save you time in the future. Try it for rapid prototyping, it’s a life saver.