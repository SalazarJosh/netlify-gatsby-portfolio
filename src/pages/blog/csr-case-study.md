---
templateKey: 'blog-post'
title: 'Case Study: CSR'
date: 2022-05-05
featuredpost: false
listed: false
featuredimage: /img/case-study-osfa.png
description: The designing behind Course Search and Registration
  
tags:
  - UX
  - Case Study
---

CSR (Course Search and Registration) is a web application that allows students to search and register for courses.

Through a series of user feedback sessions, we were able to identify some pain points with the application and further enhance the experience for students. To get to the root of these problems, we utilized methods presented by Steve Krug is his book Rocket Surgery Made Easy.

## Issue #1

Students were unable to 

## Issue #2

Students did not have the ability to plan for future semesters. Part of the reason undergraduates were not meeting the traditional four-year graduation date was because they were uncertain if a required course would be available when they needed it.

Unfortunately, courses often aren't 

The goal with the research step was to not only understand the process, but identify any pain points that either the student or staff member experienced through the process. In addition to passive observation, we used the user research methodologies offered by Steve Krug in his book [Rocket Surgery Made Easy](https://sensible.com/rocket-surgery-made-easy/) to actively seek out any pain points in the process.

Once we had a solid understanding of this process, we went to work by mapping out some user story maps. The tool was both for the students and the financial aid staff, so we had to think of how each user would be using the tool throughout the financial aid process.

One of the biggest complaints we heard from the students is the lack of any apparent update. Once they submit a financial aid / scholarship request, they're often left in the dark for undisclosed periods of time. To help alleviate this issue, we made the status of their requests a prominent part of the UI. To reinforce this, I made it a point to ensure that every action, even the small input actions while using the app, always had immediate feedback. Constant reassurance on a micro level helped the student feel like they were constantly making progress.

![User flow map showing processes input and status messages](/img/osfa5.png)

## Low-Fi Mockups

At this point the team had a solid understanding of the financial aid process. Early on we identified the most important aspects of the process for students, and built a dashboard to highlight that information.

I designed the dashboard to quickly highlight the most important information for the student (status of requests, current progress, next steps, etc.). 

The aid details were one of the several pages where students could drill down further. Though we had a lot of information to present, the Dashboard was always intended to be the "spring-board" to these more complex pages.

<div class="columns is-mobile widealign">
<div class="column is-6">

![User flow map showing processes input and status messages](/img/osfa1.png)

</div>
<div class="column is-6">

![User flow map showing processes input and status messages](/img/osfa2.png)

</div>
</div>

We also wanted to provide a way for the students to interact with the Office of Scholarships and Financial Aid staff. Again, one of their biggest complaints was not knowing who to contact and when. The message center allowed them to have a direct line of communication to staff, and staff could see the student's dashboard to quickly garner what information they needed.

Another cumbersome part of the process for students was knowing what forms they needed to fill out, when to fill them out, and how to submit them. I created a document center to bring all the relevant forms to a single location. Like the rest of the sub-pages, the document center had a lot of information that the user could pour through. The dashboard widget for this page pulled the most important details from this page and prominently displayed it for the student.

<div class="columns is-mobile widealign">
<div class="column is-6">

![User flow map showing processes input and status messages](/img/osfa3.png)

</div>
<div class="column is-6">

![User flow map showing processes input and status messages](/img/osfa4.png)

</div>
</div>

## Final Application

During this time, I was also creating a new design system for our web applications based on the [Material Design](https://material.io/design) design system. This application served as the guinea pig for this new design system.

We ran through several iterations of user feedback sessions before we started writing any code.

![User flow map showing processes input and status messages](/img/osfa6.png)
<small>Above: Cost breakdown analysis chart using d3.js</small>

![User flow map showing processes input and status messages](/img/osfa7.png)
<small>Above: Message and action widgets on student homepage</small>