---
layout:       blog
title:        "Beginning Android (Part 1)"
authors:      Ron Ang
tags:         Android
header-image: /assets/images/2012-03-02-beginning-android-part1/beginning-android-part1.jpg
---

*This post will provide a brief overview of the Android platform.*

> Brief Contents
> 1. What is Android? — The Android Platform
> 2. The Android Architecture
> 3. The Android Dalvik VM
> 4. Android Versions 

## What is Android? — The Android Platform

Android is NOT hardware; it is a Linux-based software application platform built for mobile devices and tablets. It is primarily a Google effort in collaboration with the Open-Handset Alliance. All user applications in Android are written in Java, while the native OS component is written in C/C++. To write Android applications, knowing how to write programs with Java technology is required.

The Android platform is licensed under the Apache Software License (ASL), and its Linux kernel was released under the General Public License (GPL).

## The Android Architecture

Basically Android has 4 layers:

- *Applications* – these are the applications written in Java (including the set of core Applications like email, calendar, maps, browser, etc. that ship with Android).

- *Applications Framework* – these are the arrays of managers that provide services for Activities/Views, Windows, Telephony, Location-based services, Content Providers and resources.

- *Libraries and Runtime* – these are the prominent code libraries which include WebKit technology, Sqlite persistence support, and advance graphic libraries (2D/3D/SGL/OpenGL ES). The runtime includes the core Java libraries and the Dalvik VM.

- *Linux Kernel* – a [kernel](https://en.wikipedia.org/wiki/Kernel_(operating_system)){:target="_blank"} provides the core abstraction layer and facilities such as process management, memory management, file system management, device management, etc. The kernel is where hardware-specific drivers are implemented (such as BlueTooth and Wi-Fi). Device drivers are usually written in C/C++.

<figure>
    <img src="/assets/images/2012-03-02-beginning-android-part1/system-architecture.png" alt="The Android Architecture Diagram" />
    <figcaption><a href="https://developer.android.com/images/system-architecture.jpg" target="_blank">The Android Architecture Diagram</a></figcaption>
</figure>

## The Android’s Dalvik Virtual Machine

The Dalvik VM is simply the software that runs the applications on Android devices. The Java .class files are converted into Dalvik-compatible .dex files. Android is NOT a Java ME. Java ME applications cannot run on Android, or vice-versa. If you want to run regular Java ME applications on Android you must have installed a Java ME implementation for Android like PhoneME and [Aplix JBlend](http://www.iasolution.net/products/jblend/){:target="_blank"} (my Android has pre-installed JBlend).

## Android Versions

The latest release (as of the time of this writing) is Android Ice Cream Sandwich. Below is the list of devices that officially run [Ice Cream Sandwich](https://www.android.com/about/ice-cream-sandwich/){:target="_BLANK"}:

- Samsung Galaxy Nexus
- Huawei Honor
- Asus Eee Pad Transformer Prime

Please refer to [Platform Versions](https://developer.android.com/about/dashboards){:target="_blank"} for more information about the relative number of active devices running a given version of the Android platform.

[*View Ron Ang’s Beginning Android Google Docs slides*](https://docs.google.com/presentation/d/1nKxcg6ditCP4F1oewezDYDNEEkvJTs9n8dFvAndUKJY/present?slide=id.i0){:target="_blank"}