---
layout:       blog
title:        "Health Informatics with OpenMRS"
authors:      Elmer Andes 
tags:         OpenMRS
header-image: /assets/images/2012-05-18-health-informatics-with-openmrs/openmrs-technical-overview.jpg
---
 
The Wikipedia definition of health informatics explains it best: “Health informatics is a discipline at the intersection of information science, computer science and health care.” Health care is clearly one the major industries / service areas that can benefit the most from applying IT solutions. As software engineers and IT practitioners, why should you be interested in health informatics? Because the bottom line is not merely process improvement and efficiency, accurate decision support, and cost savings – it is improving patient outcome. Developing systems that ultimately reduce human deaths – deaths that could have been prevented with timely and accurate information – is one of the most fulfilling functions of information technology.
 
As IT evolves, both private and public sectors in the health care industry are making great strides in their solutions. However, it can be easily surmised that public health efforts in developing countries – or, for that matter, resource-constrained locations in general – are the ones requiring the most help. Software development (and software engineers) is relatively expensive, and long-term maintenance will need to be factored in as well. As a result, the public health sector is the area where open-source solutions abound, and thus is a very good entry vector for software engineers who want to immerse themselves in the domain, get a solid understanding of the problems, and contribute effective solutions.
 
## OpenMRS
 
One of these open-source solutions is [OpenMRS](https://openmrs.org/){:target="_blank"} . Taking a line from the official definition, OpenMRS is a software platform and a reference application over which electronic medical records (EMR) systems can be built upon. While originally intended for supporting HIV care in Kenya and Rwanda in 2004, it has long since evolved to become a generic platform to enable support for a myriad of diseases and conditions. In a nutshell, the system supports patient care by serving as a tool for gathering patient information in encounters (in clinic or hospital visits), observations in those encounters, and notes. It can then render the information gathered into summaries, reports, graphs and views critical for statistical analysis of disease progression and/or treatment effectivity. However, OpenMRS is also described as “the world’s largest international collaboration in health care software.” It is not just the software or the platform itself, but it is also the community of developers, implementers and subject-matter experts that deploy the solution to targeted locations. It is the body of solutions to reported problems, the shared experiences on development and deployment, and the best known practices that is the outcome of collaborative work.
 
![Open MRS Screenshot](/assets/images/2012-05-18-health-informatics-with-openmrs/open-mrs-screenshot-largeimage.jpg "Open MRS Screenshot") 
 
In the Philippines, the [National Telehealth Center](https://telehealth.ph/){:target="_blank"}, under the University of the Philippines Manila, is one of the key proponents of OpenMRS. The value of EMRs is exhibited in the transition from paper-based to computerized patient records. This is one of the most fundamental improvements in any health IT endeavor. Since most rural health units (RHU), clinics and public hospitals in the Philippines are still largely paper-based, OpenMRS has been a key choice to realize this transition.
 
## Concepts are Key
 
There are many ways by which one can come up with a system design for modeling the patient encounter, observations therein, and the programs and regimens that the patient undergoes. The original developers of OpenMRS decided on one specific model, which is a well-defined and open concept dictionary. Concepts are specific information the system gathers. They are treated as question-answer information which can be entered in a form. For example, the ABDOMINAL EXAM FINDINGS concept is available in the dictionary and may have the following values for answers: NORMAL, ABNORMAL, MASS ABDOMINAL, ABDOMINAL TENDERNESS. A clinician performing the abdominal examination in a particular encounter will need only to choose the right answer to store from the known values. The values for the concepts can either be defined (like the above) or data type-driven (e.g., numeric for systolic blood pressure reading).
 
The concept dictionary remains open and generic such that concepts can be added later to support other diseases. For instance, concepts for the treatment of tuberculosis can be provided if none exist. Furthermore, in the interest of data integration, since data collected and maintained through OpenMRS may need to be integrated with other systems, OpenMRS can support mapping to other health information standards like HL7, SNOMED and ICD-10.
 
## Under the Hood
 
<figure>
  <img src="/assets/images/2012-05-18-health-informatics-with-openmrs/openmrs-technical-overview.jpg" alt="Open MRS Technical Overview" />
  <figcaption>Image taken from https://wiki.openmrs.org/display/docs/Technical+Overview</figcaption>
</figure>
 
OpenMRS is a Java-based system, specifically employing Spring and Hibernate. The tiered design has a distinct Service Layer that enables developers access and manipulation of the underlying concept and data model through an API. It is typically deployed in a Tomcat servlet container.
 
The functionalities of the system are implemented in the form of modules, which are self-contained Java packaged components. A specific OpenMRS instance is comprised of a set of modules which depend on the functionalities required. Each module can be fairly generic (e.g., the Patient Image module allows the system to capture the patient’s picture to be posted on the dashboard) or disease-centric (e.g., the Diabetes Management module, for diabetes-related concepts and observations). This characteristic of being module-driven is key as to why OpenMRS is more of a platform or framework, rather than a static, pre-designed application in itself. The community maintains a working database of modules, developed and matured over the course of several deployments. Moreover, the system is flexible enough to allow for the development of new modules.
 
## What’s next?
 
Because it is an open-source effort, there are a lot of ways by which people can contribute to OpenMRS – whether as developers, testers, implementation experts or documentation writers. The system is supported by a healthy community of professionals interfacing primarily through the official site’s wiki and Confluence pages.
 
Within the health informatics sector, enabling integration between health care solutions and mobile clients is a growing trend. This is most relevant in telehealth scenarios wherein health care practitioners can gather and record data through a mobile client in resource-constrained locations, and allow the data to be stored and assessed in a central server. OpenMRS’ current activities in providing this functionality would be an excellent opportunity to maximize the value of the system.
 
Another angle by which to approach OpenMRS is to use it as a springboard to train people in general health informatics, and developers in basic and enterprise Java with Spring and Hibernate. It will provide students with a more relevant domain and real-world problems, promote the existence and value of OpenMRS, and hopefully increase awareness of IT professionals in health informatics and build up the technical experience that implementing organizations crucially require.
 
Locally, the annual global OpenMRS Implementers Meeting **will be held in the Philippines on October 2012. This is an excellent opportunity to connect with OpenMRS deployers, developers and users.

