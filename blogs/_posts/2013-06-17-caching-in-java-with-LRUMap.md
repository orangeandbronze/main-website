---
layout:       blog
title:        "Caching in Java with LRUMap"
photo:		   "https://www.orangeandbronze.com/assets/images/2013-06-17-caching-in-java-with-LRUMap/FBimage-CachingInJavaWithLRUMap.png"
authors:      Ria Mora
tags:         java
header-image: /assets/images/2013-06-17-caching-in-java-with-LRUMap/CachingInJavaWithLRUMap.png
---
*Ria briefs us about the LRUMap and how it is used to cache recently used values.*

So you want to cache recently used values? Well, there’s LRUMap for that!

LRU stands for **Least Recently Used**. LRUMap uses the LRU algorithm to delete the least recently used value in the map (presumably full) to make space for the newest entry.

You can use LRUMap through the Apache Commons Collections library. You can download the jar file [here](http://commons.apache.org/proper/commons-collections/download_collections.cgi){:target="_blank"}.

## So, how do you instantiate this thing?

You can use the default constructor, or you can define its maximum size in the constructor. Its default maximum size is 100.

```java
Map map = new LRUMap();
Map map = new LRUMap(100);
```

## Sample

```java
import java.util.Collections;
import java.util.Map;

import org.apache.commons.collections.map.LRUMap;

public class LRUSample {

    private static final int MAX_CAPACITY = 5;

    public static void main(String[] args) {
        Map lruMap = (Map) Collections.synchronizedMap(new LRUMap(MAX_CAPACITY));

        for(int i = 0; i &lt; 30; i++) {
            String string = "Entry " + (i + 1);
            lruMap.put(i, string);

            System.out.println(lruMap.toString());
        }
    }

}
```
## LinkedHashMap as an Alternative

Okay, well if you don’t feel like using LRUMap, you can also use a [LinkedHashMap](https://docs.oracle.com/javase/6/docs/api/java/util/LinkedHashMap.html){:target="_blank"}. You can read about it (there’s a sample too) from [this blog post](http://java-planet.blogspot.com/2005/08/how-to-set-up-simple-lru-cache-using.html){:target="_blank"}.







