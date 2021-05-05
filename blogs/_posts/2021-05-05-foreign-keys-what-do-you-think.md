---
layout:       blog
title:        "Foreign Keys - What Do You Think?"
authors:      Calen Legaspi
tags:         sql
header-image: /assets/images/2021-05-05-foreign-keys-what-do-you-think/ForeignKeysWhatDoYouThink.png
---

*Join the discussion about the pros and cons of using Foreign Keys*

One of my trainees is a seasoned database guy with experience in a lot of critical systems. He said he doesn't use foreign keys because it makes maintenance of a DB hard. In my experience, foreign keys make integration testing hard, because you have to add data that you don't need for the test; but then again, maybe referential integrity should be part of the integration tests anyway.

Ultimately, I think it depends on how important referential integrity is to your application. Different types of data will need different levels of integrity. If a social networking site's comment data gets orphaned it's not a big deal, whereas if banking transaction data gets orphaned, that's a different situation.

I found a pretty good listing of pros and cons on [StackOverflow](http://stackoverflow.com/a/83393){:target="_blank"}.

Originally posted at: [Foreign Keys - What Do You Think?](http://calenlegaspi.blogspot.com/2014/09/foreign-keys-what-do-you-think.html){:target="_blank"}
