---
layout:       blog
title:        "JasperReports: The Tricky Parts"
authors:      Lorenzo Dee
tags:         java
header-image: /assets/images/2018-02-27-jasper-reports-the-tricky-part/2018-02-18-jasper-reports-the-tricky-part.jpg
---

If you have been programming in Java long enough, chances are you needed to generate reports for business users. In my case, I’ve seen several projects use [JasperReports® Library](https://community.jaspersoft.com/project/jasperreports-library){:target="_blank"} to generate reports in PDF and other file formats. Recently, I’ve had the privilege of observing Mike and his team use the said reporting library and the challenges they faced.

### JasperReports in a Nutshell
In a nutshell, generating reports using JasperReports (JR) involves three steps:
* Load compiled report (i.e. load a JasperReport object)
* Run report by filling it with data (results to a JasperPrint object)
* Export filled report to a file (e.g. use JRPdfExporter to export to PDF)

In Java code, it looks something like this.

```java
JasperReport compiledReport = JasperCompileManager.compileReport(
        "sample.jrxml");
Map<String, Object> parameters = ...;
java.sql.Connection connection = dataSource.getConnection();
try {
    JasperPrint filledReport = JasperFillManager.fillReport(
            compiledReport, parameters, connection);
    JasperExportManager.exportReportToPdf(
            filledReport, "report.pdf");
} finally {
    connection.close();
}
```
*Thanks to the facade classes, this looks simple enough. But looks can be deceiving!*

Given the above code snippet (and the outlined three steps), which parts do you think takes the most amount of time and memory? (Sounds like an interview question).

<span style="color:gray">If you answered (#2) filling with data, you’re correct! If you answered #3, you’re also correct, since #3 is proportional to #2.</span>

IMHO, most online tutorials only show the easy parts. In the case of JR, there seems to be a lack of discussion on the more difficult and tricky parts. Here, with Mike’s team, we encountered two difficulties: out of memory errors, and long running reports. What made these difficulties particularly memorable was that they only showed up during production (not during development). I hope that by sharing them, they can be avoided in the future.

### Out of Memory Errors
The first challenge was reports running out of memory. During development, the test data we use to run the report would be too small when compared to real operating data. So, design for that.

In our case, all reports were run with a <span style="color:green">JRVirtualizer</span>. This way, it will flush to disk/file when the maximum number of pages/objects in memory has been reached.

During the process, we also learned that the virtualizer needs to be cleaned-up. Otherwise, there will be several temporary files lying around. And we can only clean-up these temporary files after the report has been exported to file.

```java
Map<String, Object> parameters = ...;
JRVirtualizer virtualizer = new JRFileVirtualizer(100);
try {
    parameters.put(JRParameter.REPORT_VIRTUALIZER, virtualizer);
    ...
    ... filledReport = JasperFillManager.fillReport(
            compiledReport, parameters, ...);
    // cannot cleanup virtualizer at this point
    JasperExportManager.exportReportToPdf(filledReport, ...);
} finally {
    virtualizer.cleanup();
}
```
For more information, please see [Virtualizer Sample – JasperReports](http://jasperreports.sourceforge.net/sample.reference/virtualizer/index.html){:target="_blank"}.

Note that JR is not always the culprit when we encountered out-of-memory errors when running reports. Sometimes, we would encounter an out-of-memory error even before JR was used. We saw how JPA can be misused to load the entire dataset for the report <span style="color:green">(Query.getResultList()</span> and <span style="color:green">TypedQuery.getResultList()</span>). Again, the error does not show up during development since the dataset is still small. But when the dataset is too large to fit in memory, we get the out-of-memory errors. We opted to avoid using JPA for generating reports. I guess we’ll just have to wait until JPA 2.2’s <span style="color:green">Query.getResultStream()</span> becomes available. I wish JPA’s <span style="color:green">Query.getResultList()</span> returned <span style="color:green">Iterable</span> instead. That way, it is possible to have one entity is mapped at a time, and not the entire result set.

For now, avoid loading the entire dataset. Load one record at a time. In the process, we went back to good ol’ JDBC. Good thing JR uses ResultSets well.

### Long Running Reports
The second challenge was long running reports. Again, this probably doesn’t happen during development. At best, a report that runs for about 10 seconds is considered long. But with real operating data, it can run for about 5-10 minutes. This is especially painful when the report is being generated upon an HTTP request. If the report can start to write to the response output stream within the timeout period (usually 60 seconds or up to 5 minutes), then it has a good chance of being received by the requesting user (usually via browser). But if it takes more than 5 minutes to fill the report and another 8 minutes to export to file, then the user will just see a timed-out HTTP request, and log it as a bug. Sound familiar?

Keep in mind that reports can run for a few minutes. So, design for that.

In our case, we launch reports on a separate thread. For reports that are triggered with an HTTP request, we respond with a page that contains a link to the generated report. This avoids the time-out problem. When the user clicks on this link and the report is not yet complete, s/he will see that the report is still being generated. But when the report is completed, s/he will be able to see the generated report file.

```java
ExecutorService executorService = ...;
... = executorService.submit(() -> {
    Map<String, Object> parameters = ...;
    try {
        ...
        ... filledReport = JasperFillManager.fillReport(
                compiledReport, parameters, ...);
        JasperExportManager.exportReportToPdf(filledReport, ...);
    } finally {
        ...
    }
});
```

We also had to add the ability to stop/cancel a running report. Good thing JR has code that checks for <span style="color:green">Thread.interrupted()</span>. So, simply interrupting the thread will make it stop. Of course, you’ll need to write some tests to verify (expect <span style="color:green">JRFillInterruptedException</span> and <span style="color:green">ExportInterruptedException)</span>.

And while we were at it, we rediscovered ways to add “listeners” to the report generation (e.g. <span style="color:green">FillListener</span> and <span style="color:green">JRExportProgressMonitor</span>) and provide the user some progress information.

We also created utility test classes to generate large amounts of data by repeating a given piece of data over and over. This is useful to help the rest of the team develop JR applications that are designed for handling long runs and out-of-memory errors.

### Further Design Considerations

Another thing to consider is the opening and closing of the resource needed when filling the report. This could be a JDBC connection, a Hibernate session, a JPA EntityManager, or a file input stream (e.g. CSV, XML). Illustrated below is a rough sketch of my design considerations.

![dependency-injection](/assets/images/2018-02-27-jasper-reports-the-tricky-part/image-1-300x91.jpg)

We want to isolate #2 and define decorators that would open the resource, fill the report, and close the opened resource in a <span style="color:green">finally</span> block. The resource that is opened may depend on the element (if present) inside the report. In some cases, where there is no element, there is probably no need to open a resource.

```java
<queryString language="hql">
    <![CDATA[ ... ]]>
</queryString>
...
<queryString language="csv">
    <![CDATA[ ... ]]>
</queryString>
```

Furthermore, we also want to combine #2 and #3 as one abstraction. This single abstraction makes it easier to decorate with enhancements, like flushing the created page objects to files, and load them back during exporting. As mentioned, this is what the <span style="color:green">JRVirtualizer</span> does. But we’d like a design where this is transparent to the object(s) using the combined-#2-and-#3 abstraction.

### Acknowledgements
That’s all for now. Again, thanks to [Mike](https://www.entrepreneur.com.ph/startup-tips/this-pinoy-app-developer-donates-his-earnings-to-charity-a1148-20170616-lfrm){:target="_blank"} and his team for sharing their experiences. Yup, he’s the same guy who donates his app’s earnings to charity. Also, thanks to [Claire](https://www.blogger.com/profile/09491302535338840746){:target="_blank"} for the ideas on testing by repeating a given data again and again. The relevant pieces of code can be found on GitHub.
