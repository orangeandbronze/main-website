---
layout:       blog
title:        "Maven & Archiva – No Dependency Information Available / Missing POM"
authors:      Ria Mora
tags:         [ java, spring and grails, archiva]
header-image: /assets/images/2013-04-29-maven-and-archiva-no-dependency-Information-available-missing-POM/mavenandarchiva.png
---

*Ria tells programmers what she discovered and how she solved the case of the missing POM on Maven.*

```java
Downloading: http://localhost:8080/archiva/repository/internal/com/oracle/ojdbc/10.1.0.4/ojdbc-10.1.0.4.pom
[WARNING] The POM for com.oracle:ojdbc:jar:10.1.0.4 is missing, no dependency information available
```
I got this warning while running mvn clean package. At first I tried the steps from an [answer on this StackOverflow thread](https://stackoverflow.com/questions/6111408/maven2-missing-artifact-but-jars-are-in-place/6112344#6112344){:target="_blank"}, which describes ways on how to deal with the problem when you’re on [Springsource Tool Suite](https://spring.io/tools){:target="_blank"} (and maybe [Eclipse](https://www.eclipse.org/){:target="_blank"} as well) with [Maven integration](https://www.eclipse.org/m2e/){:target="_blank"}.

At first I thought my STS was trolling me again (cause it usually does), but then apparently it was my Archiva repository with the problem all along.

![Missing POM](/assets/images/2013-04-29-maven-and-archiva-no-dependency-Information-available-missing-POM/missingpom.png)

I checked out the artifact on my internal Archiva site and apparently my ojdbc 10.1.0.4′s POM wasn’t there (note that only the Jar was available for download). I facepalmed when I reread the warning and it did say that the POM was missing after all.

## The Solution

Okay, now if you find yourself in the same situation, go to the artifact page, download the Jar file, and take note of all the artifact’s information. Usually copy-pasting the POM Snippet into gedit or notepad should be enough.

While logged in, delete the artifact, then re-upload the artifact, making sure you **tick the checkbox for “Generate Maven 2 POM“**.

![Upload Artifact](/assets/images/2013-04-29-maven-and-archiva-no-dependency-Information-available-missing-POM/uploadartifact.png)

Afterwards, check the artifact page once more and you should see something like this.

![With POM](/assets/images/2013-04-29-maven-and-archiva-no-dependency-Information-available-missing-POM/withpom.png)

If you see the POM available for download, you should be able to run **mvn clean package** without the annoying warning above popping up.

If it still doesn’t work, you can also try deleting the artifact’s folder from your local repository before trying again.