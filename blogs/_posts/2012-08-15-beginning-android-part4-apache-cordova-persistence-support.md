---
layout:       blog
title:        "Beginning Android Part 4 - Apache Cordova Persistence Support"
authors:      Ron Ang
tags:         Android
header-image: /assets/images/2012-03-02-beginning-android-part1/beginning-android-part1.jpg
---
**Catch Up!**
If you haven’t seen the first three parts of this Beginning Android tutorial series, please take some time to read it before reading this article. Just click on the following links.

1. [Get started](/blogs/2012/03/beginning-android-part1)
2. [Creating Your First Android Project](/blogs/2012/04/beginning-android-part2)
3. [Creating AdMob Ads](/blogs/2012/05/beginning-android-part3)

Persistence is a means of saving an application’s state, which makes it one of the most important qualities necessary to reuse an application. An application can save its state into a datastore, which can be a relational database (RDBMS) such as MySQL, a flat file, or an XML file.

## Android Storage Quickview

Android supports many storage options for persisting application data. It is important for you to carefully read the official Android [Storage Options](https://developer.android.com/training/data-storage){:target="_blank"} documentation.

The following are the available Android data storage options:

- Shared Preferences – Store private primitive data in key-value pairs.
- Internal Storage – Store private data in device memory.
- External Storage – Store public data in shared external storage.
- SQLite Databases – Store structured data in a private database.
- Network Connection – Store data on the web with your own network server.

## Persistence Strategy: What kind of data storage should I use?

The decision about which of the Android storage options you choose is usually determined by the following:

1. Application Properties – You can use SharePreferences here.
2. Database – You should use SQLite if you need to store structured data.
3. Filesystem – You can use the Internal/External storage options.

This tutorial will focus on storage options provided by Apache Cordova to store structured data in a database.

## Apache Cordova – Android

Apache Cordova (aka PhoneGap) is an HTML5 application platform that allows you to author native applications with web technologies and get access to APIs and app stores. In this tutorial, we will briefly cover using Web SQL on Cordova for storage on mobile devices.

Before proceeding, please carefully read Cordova’s Storage documentation along with the W3C spec for [Web SQL Database support](https://dev.w3.org/html5/webdatabase/){:target="_blank"}. The W3C docs help fill in some things that the Cordova documentation doesn’t cover, such as error-handling and labels for [SQLError](https://dev.w3.org/html5/webdatabase/#sqlerror){:target="_blank"}.

## Working Offline: Caching

Cordova provides two options for persisting your applications data: Web SQL and LocalStorage. Since LocalStorage relies on key-value pairs instead of SQL, I used Web SQL for the demo application in this tutorial.

Web SQL is a thin, asynchronous wrapper around an [SQLite database](https://www.sqlite.org/index.html){:target="_blank"}; it is currently well-implemented on first-class mobile devices (iOS, Android, and BlackBerry OS 6.0). Web SQL offers a useful interface for storing structured data; it works well if you have a remote server that uses SQL databases, and you want to mirror the structure of your data between platforms. It is also [fast and heavy-duty](https://www.sqlite.org/whentouse.html){:target="_blank"} because SQLite’s storage capacity is [much bigger compared to LocalStorage](https://stackoverflow.com/questions/2989284/what-is-the-max-size-of-localstorage-values){:target="_blank"}.

Note that [WebSQL is not supported on Firefox and IE](https://www.html5rocks.com/en/features/storage){:target="_blank"}, and that [the Web SQL spec was deprecated](http://www.webscannotes.com/home.php){:target="_blank"} in Nov. 18, 2010.

## A Simple To-Do Application

My demo application is called TodoListPhoneGap. Its functionality is limited to adding new tasks; if you want to add other functions (such as updating and deleting tasks), you can write them yourself. You can obtain the source code through SVN by issuing the following command in a terminal:
svn co [https://svn.kenai.com/svn/ron-os-sample-code~project-code-repository/BeginningAndroidProjects/TodoListPhoneGap](https://www.oracle.com/splash/kenai.com/decommissioning/index.html){:target="_blank"}


Once you have the source code, open the TodoListPhoneGap project with Eclipse, preferrably Eclipse Indigo.

1. The first thing we need to do when using Cordova is to get a reference to our database using the openDatabase function:

    ```java
    function createTaskDB() {
        db = window.openDatabase(“TaskDB”, “1.0”, “Simple Tasks”, 1000000);
    }
    ```
    The openDatabase function requires four parameters: the name of the dabase, the version of the database, the display name of the database, and the size (in bytes) of the database.
2. The next step is to create a table for our records. To do this, we will start a transaction in db and execute the SQL query asynchronously:

    ```java
    function createTaskDB() {
        db = window.openDatabase(“TaskDB”, “1.0”, “Simple Tasks”, 1000000);
    }
    ```

    The function transaction accepts three parameters: the function that will execute the SQL query; the function to handle the errors (if any), and; the function to call when the transaction is successful.

    ```java
    function createTable(tx) {
        tx.executeSql(“CREATE TABLE IF NOT EXISTS task (id unique, taskname)”);
    }
    ```
3. Finally, we need to populate and query the table in db. To to this, we will start another transaction in db, but this time we will pass a DML statement (such as INSERT, UPDATE, SELECT, DELETE) instead of a DDL statement (such as CREATE, DROP, ALTER).

    ```java
    db.transaction(function(tx) {
        tx.executeSql(“INSERT INTO task (taskname) VALUES (?)”,[ task.taskname ]);
    }, sqlErrH, cb);
    ```

## Running The Demo Application as an Android Application Package (APK)

You can watch the video @ [http://youtu.be/KNVKVzxfwNs](http://youtu.be/KNVKVzxfwNs){:target="_blank"}

## Running The Demo Application as a Dolphin Garage Web-App

Dolphin, a browser for Android, announced its Garage Open API at Google I/O 2012, which includes APIs for Cordova. You can run my demo application as a thin-client web-app on Dolphin by doing the following:

1. Copy the files located in/assets/www to your web server (in this tutorial I used Tomcat 7)

    ![Running the Demo Application Step 1 - Image 1](/assets/images/2012-08-15-beginning-android-part4-apache-cordova-persistence-support/image-1.jpg "Running the Demo Application Step 1 - Image 1")

    ![Running the Demo Application Step 1 - Image 2](/assets/images/2012-08-15-beginning-android-part4-apache-cordova-persistence-support/image2.jpg "Running the Demo Application Step 1 - Image 2")
2. Place [cordova.dolphin.js](http://dolphin-apk.s3.amazonaws.com/Garage/cordova.dolphin.js){:target="_blank"} in your web server’s JavaScript directory

    ![Running the Demo Application Step 2](/assets/images/2012-08-15-beginning-android-part4-apache-cordova-persistence-support/image3.jpg "Running the Demo Application Step 2")
3. Update index.html: replace js/cordova-1.5.0.js with js/cordova.dolphin.js
4. Run the web server.5. Test the demo application:
    - Download [Dolphin Browser HD](https://play.google.com/store/apps/details?id=mobi.mgeek.TunnyBrowser){:target="_blank"} and the PhoneGap add-on.
    - Access <your webserver>/TodoListPhoneGap using the Dolphin Browser HD.

### Summary:
In this tutorial you learned how to:

1. Persist application state by using Web SQL
2. Run an Android application in two ways:

    - as an APK
    - deployed on a Tomcat server using the Dolphin Garage API
