---
layout:       blog
title:        "Blob Handling in Java and JDBC"
authors:      Lorenzo Dee
tags:         [Blob, java, JDBC]
header-image: /assets/images/2015-05-10-blob-handling-in-java-and-JDBC/BlobHandlingInJavaAndJDBC-banner.png
---

*Lorenzo simplifies BLOB handling. Read on to find out how.*

Whenever I search the web for storing and retrieving BLOBs to and from a database, I usually get a complicated sample that uses byte arrays (`byte[]`) and JDBC code. Since I usually deal with web-based enterprise applications, I need to store BLOBs (e.g. images, spreadsheets, documents, PDFs) to a database and retrieve them later (e.g. as an `<img>` tag in an HTML page, or downloaded from a URL).

## JDBC and BLOBs

The typical way of storing BLOBs with JDBC is shown below. Note that the created objects need to be closed properly to prevent resource leaks.

```java
Connection connection = ...getConnection();
try {
  PreparedStatement stmt =
        connection.prepareStatement("INSERT...");
  try {
    // Sometimes, a byte[] is used here :(
    InputStream bytes = new FileInputStream("..."); // e.g. image file
    try {
      ... // other parameters set
      // Unsure on how to create a Blob and use setBlob(...)
      stmt.setBinaryStream(..., bytes);
      stmt.execute();
    } finally {
      bytes.close();
    }
  } finally {
    stmt.close();
  }
} finally {
  connection.close();
}
```

Note that the code above is possibly an over-simplification. Most often, the BLOB is embedded with another persistent object (e.g. a `Person` with a photo that is stored as a BLOB).

To retrieve the BLOB, the following code is typically seen. Note that the BLOB is only available while the JDBC connection stays open. Thus, some developers resort to using byte arrays (`byte[]`) to temporarily store and transfer them, before the connection gets closed.

```java
Connection connection = ...getConnection();
try {
  PreparedStatement stmt =
        connection.prepareStatement("SELECT...");
  try {
    ... // other parameters set
    ResultSet rs = stmt.executeQuery();
    try {
      InputStream bytes = rs.getBinaryStream(...);
      // Sometimes, a byte[] is used with rs.getBytes() :(
      try {
        // Must use bytes before JDBC connection gets closed
      } finally {
        bytes.close();
      }
    } finally {
      rs.close();
    }
  } finally {
    stmt.close();
  }
} finally {
  connection.close();
}
```

The astute reader can see (lines also highlighted) how error-prone BLOB handling is with JDBC. The lesser known [Connection.createBlob()](https://docs.oracle.com/javase/6/docs/api/java/sql/Connection.html#createBlob%28%29){:target="_blank"} (introduced in Java 6 / JDBC 4.0) and [ResultSet.getBlob(...)](https://docs.oracle.com/javase/6/docs/api/java/sql/ResultSet.html#getBlob%28int%29){:target="_blank"} is not often used.

## File Systems and BLOBs

Another often seen way of handling BLOBs in Java is to store them as files in a file system. But this has some drawbacks, like the tricky to use unique file names, and possible un-tracked tampering of file contents. In some cases, storing them as files may not be permitted when running in a server with a security manager (e.g. Servlet-container like Tomcat with a [SecurityManager](https://docs.oracle.com/javase/8/docs/api/java/lang/SecurityManager.html){:target="_blank"}). The security manager protects the server from trojan servlets, JSPs, JSP beans, tag libraries, or even inadvertent mistakes (e.g. `<% System.exit(1); %>` in a JSP).

## Introducing [jBlubble](https://github.com/lorenzodee/jBlubble){:target="_blank"}

I find the above handling of BLOBs to be over-complicated. Because of this, I wanted to make BLOB handling easier, and less error-prone. I am also inspired by how Google's AppEngine for Java was handling BLOBs. Thus, I started looking at the BLOB-related code I have worked with in the past years, and came up with a simple API, I called **jBlubble**. The main interface is `BlobstoreService`.

```java
public interface BlobstoreService {
  String createBlob(
      InputStream in,
      String name, String contentType) ...;
  String createBlob(
      BlobstoreWriteCallback callback,
      String name, String contentType) ...;
  BlobInfo getBlobInfo(String blobKey) ...;
  void serveBlob(String blobKey, OutputStream out) ...;
  int[] delete(String... blobKeys);
}
```

The code is available at [my GitHub account](https://github.com/lorenzodee/jBlubble){:target="_blank"}. As of this writing, a JDBC-implementation of the API is available. Other implementations are also welcome.

The `createBlob` methods abstract the JDBC-related code of using [java.sql.Blobs](https://docs.oracle.com/javase/6/docs/api/java/sql/Blob.html){:target="_blank"}, and making sure allocated resources are closed properly. To store BLOBs uploaded to a webapp, the code looks something like:

```java
// Servlet configured to support multipart/form-data
// HttpServletRequest
request.getPart("...").write(fileName);
// Open an input stream with the file (created from uploaded part)
InputStream in = new FileInputStream(fileName);
try {
 ... blobKey = blobstoreService.createBlob(in, ...);
} finally {
 in.close();
}
```

To serve the previously stored BLOB, the code looks something like:

```java
// HttpServletResponse
BlobInfo blobInfo = blobstoreService.getBlobInfo(blobKey);
response.setContentType(blobInfo.getContentType());
OutputStream out = response.getOutputStream();
blobstoreService.serveBlob(blobKey, out);

```

In some cases, like when generating reports, the output stream can be stored as a BLOB too, like so:

```java
... JasperPrint print = ...;
... JRExporter exporter = ...; //  new JRPdfExporter();
... blobKey = blobstoreService.createBlob(
    new BlobstoreWriteCallback() {
      @Override
      public long writeToOutputStream(OutputStream out) ... {
        ...
        exporter.setParameter(JRExporterParameter.JASPER_PRINT, print);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);
        exporter.exportReport();
        ...
      }
    }, ...);
// generated blobKey can then be
// used to identify the generated report

```

Since report generation can take its time (especially when the report has several pages), it is a good idea to store the report in a database, rather than directly writing to a servlet output stream. When the report is complete, it can be downloaded (and re-downloaded) anytime.

The key design consideration was to abstract the persistence-related specifics (like JDBC) and use a simpler API. A callback interface was used to support writing to `OutputStreams` to ensure that it gets closed properly. A higher level method was used to serve the BLOBs directly to an output stream. The `BlobInfo` contains a timestamp field that can be used to support `Last-Modified` HTTP header for caching purposes. As of the moment, BLOBs are immutable and cannot be updated. To change, a new BLOB should be created, delete the old one, and reference the new one.

Instead of embedding the BLOB with their related persistent objects (or entities), I find it better to simply reference the BLOB. So, instead of this...

```java
@Entity
public class Person {
 @Id private Long id;
 @Lob byte[] photo;
 ...
}
```

... I find it better to just reference the BLOB like this.

```java
@Entity
public class Person {
 @Id private Long id;
 String photoId; // retrieved via BlobstoreService
 ...
}
```

I've started replacing existing BLOB handling code with the API we've developed. So far, it has simplified things. I hope this will help others too. Now, it's time for a cold one.

Originally posted at: [Blob Handling in Java and JDBC](https://lorenzo-dee.blogspot.com/search?q=Blob+Handling+in+Java+and+JDBC){:target="_blank"}