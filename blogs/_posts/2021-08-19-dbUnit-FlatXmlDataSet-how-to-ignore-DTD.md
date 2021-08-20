---
layout:       blog
title:        "DbUnit FlatXmlDataSet – How to Ignore DTD"
authors:      Calen Legaspi
tags:         DbUnit
header-image: /assets/images/2021-08-19-dbUnit-FlatXmlDataSet-how-to-ignore-DTD.md/DbUnitFlatXmlDataSet-HowToIgnoreDTD.png
---
*A quick tutorial on DbUnit FlatXmlDataSet.*

I started out trying to use DbUnit FlatXmlDataSet without a DTD, but DbUnit threw an exception, so I generated a DTD from my schema by using [FlatDtdDataSet](http://dbunit.sourceforge.net/faq.html#generatedtd){:target="_blank"}, and put the path to the DTD at the DOCTYPE declaration, and everything worked fine.

However, I was worried that the tests won’t be portable, since there’s no telling how the compiled integration test code was going to be packaged and deployed. Of course, the proper practice in Java for accessing a file is through the classpath, via `class.getResourceAsStream`. I was able to do that for the dataset XML file, but DbUnit was still looking for the DTD at the relative path defined at the DOCTYPE declaration. I couldn’t figure out how to get the DTD from the classpath.

Eventually I just decided to ignore the DTD. I did this via the `FlatXmlDataSetBuilder.setDtdMetadata()` method. See my getDataSet() method implementation below:

```java
protected IDataSet getDataSet() throws Exception {
    FlatXmlDataSetBuilder builder = new FlatXmlDataSetBuilder();
    builder.setDtdMetadata(false);
    return builder.build( getClass().getResourceAsStream("SectionDaoTest.xml") );
}
```

The problem with ignoring the DTD is that if the first row of a table has one or more null values, DbUnit might throw a `NoSuchColumnException`, since without the DTD, DbUnit uses the columns defined in the first row to define the table. The workarounds are either to make sure that their are no nulls in the first row of each table, or to use `ReplacementDataSet`. 

Originally posted at: ["DbUnit FlatXmlDataSet – How to Ignore DTD"](http://calenlegaspi.blogspot.com/2014/09/dbunit-flatxmldataset-ignore-dtd.html?q=DbUnit+FlatXmlDataSet){:target="_blank"}
