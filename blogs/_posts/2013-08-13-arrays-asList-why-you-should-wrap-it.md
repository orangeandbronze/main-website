---
layout:       blog
title:        "Arrays.asList() – Why You Should Wrap It"
photo:		   "https://www.orangeandbronze.com/assets/images/2013-08-13-arrays-asList-why-you-should-wrap-it/FBimage-WhyYouShouldWrapIt.png"
authors:      Ria Mora
tags:         java
header-image: /assets/images/2013-08-13-arrays-asList-why-you-should-wrap-it/WhyYouShouldWrapIt-banner.png
---
*Ria shows us why you should wrap a list inside a list implementation if you’re planning to modify it.*

I was trying to get the difference of two lists of files when a wild [UnsupportedOperationException](https://docs.oracle.com/javase/7/docs/api/java/lang/UnsupportedOperationException.html){:target="_blank"} appeared!
My code looked a lil’ something like this:

```java
...
List listOfOtherFiles = Arrays.asList(otherDirectory.listFiles());
List fileList = Arrays.asList(directory.listFiles());
fileList.removeAll(listOfOtherFiles);
...
```

## The culprit: Arrays.asList().

According to the [docs](https://docs.oracle.com/javase/6/docs/api/java/util/Arrays.html#asList(T...)){:target="_blank"}, Arrays.asList() returns a fixed size list. This means that you can’t remove an element from said list nor add to it.

This is why if you’re planning to modify the list, you should wrap it inside a List implementation.

```java
...
List listOfOtherFiles = Arrays.asList(otherDirectory.listFiles());
List fileList = new LinkedList(Arrays.asList(directory.listFiles()));
fileList.removeAll(listOfOtherFiles);
...
```