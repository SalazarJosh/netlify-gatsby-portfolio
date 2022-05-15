---
templateKey: 'blog-post'
title: 'Case Study: CSR'
date: 2022-05-05
featuredpost: false
listed: true
featuredimage: /img/csr-case-study.png
description: The design behind Course Search and Registration
  
tags:
  - UX
  - Case Study
---

CSR (Course Search and Registration) is a web application that allows students to search and register for courses.

Through a series of user feedback sessions, we were able to identify some pain points with the original application. This process allows us to further enhance the experience for students.

To get to the root of these problems, we conducted user feedback sessions from methods presented by Steve Krug is his book [Rocket Surgery Made Easy](https://sensible.com/rocket-surgery-made-easy/).

Traditionally, students had to sign up for courses by browsing a printed catalog of courses available for the semester. This was a very large catalog and any updates to the courses after the catalog was printed would not be reflected. To say the least, it was a very cumbersome process. 

Prior to joining the project there was an application for searching and registering for courses already in place. Our goal was to simplify that interface through the lens of UX case studies.


## Issue #1
Students were not able to view their courses in a cohesive way. When registering for courses, the student had to keep track of which course sections they were signing up for to ensure they didn't overlap with other course times.

To stem off this issue, students were also unable to plan for courses. Instead of committing and registering for the courses to see how it fit into a calendar, we created another option to plan for a course. That is, they're not committing to the registration of the course, they just want to see how it fits in their schedule.

We created a "My Course Week" interface that displayed blocks of courses and the times for which they ran. It's similar to the Google Calendar interface or Microsoft Office interface many of us use today. We also color coded and created unique symbols to represent the current status of the course (Registered, Planned, Waitlisted, Etc.). This allowed the user to quickly build out their schedule, even before registration opened, and get back to the important parts of being a student.

## Issue #2
This was an update we had actually created after the application released. We continued to run usability tests and we found out that students were often overwhelmed with the amount of user interface options that were immediately available. We tried our best to mitigate this by putting the most immediate and actionable items first, but through our attempt to also show how all of the pieces were working together within a single interface, we also added a degree of complexity.

To help guide the user on which actions to take first, we built a simple 6-step tour of the interface. This tour showed the various areas of the interface and what each area was for. For example, we found that users were getting confused on the difference between the "My Courses" section and the "My Course Week" section. This tour explained the difference between the two sections and the intended actions to be completed in each area.

I've always advocated against a "tour" in UI design. I always felt that if your interface required a tour, then you're failing at UX. I still stand by that. This application had so many features and was such a unique experience that I felt a tour was inevitable while we conducted for focused user feedback sessions to continue to improve the experience.

<div class="columns is-mobile widealign">
<div class="column is-6">

![User flow map showing processes input and status messages](/img/csr1.png)

</div>
<div class="column is-6">

![User flow map showing processes input and status messages](/img/CSRpreview.png)

</div>
</div>

## Issue #3
Very little course information was available as part of the old online tool. After finding a course in the online tool, the student had to refer to other materials to learn more about the course such as the course description, the professor, required books, etc. We digitized all this data and created an interface button on all course instances that allowed the user to view course details.

## Issue #4
Students had to log in in order to view courses. If a prospective or incoming student wanted to browse for or plan for courses, they would not be able to. To help these students, we created a public facing interface that allowed the user to search and plan for courses. We saved all this information locally so the user could quickly apply all of their choices to their authenticated profile.

![several sticky notes of varying color grouped on large pieces of paper](/img/csr4.jpg)

## The Design Phase
Now that we had an idea of all the issues with the legacy interface, it was time to get started on a new interface. This is, by far, one of the most complex user interactions I've ever had to design for. So much is happening at once and there's a lot of information that the user can dig into. We had a find a way to make all this information available without overwhelming the user.

Fairly early on we decided we wanted to make this a single-page application. Part of the problem with the legacy process is the student had to have multiple browser tabs and print resources open to complete this process. So we created a feature map and tried to group them in a hierarchical structure. We kept building on this hierarchy and nesting features until we couldn't anymore. This left us with four distinct feature trees that ultimately lead to the four main interface components.

![several sticky notes of varying color grouped on large pieces of paper](/img/csr3.png)

As we built the application, we wanted to integrate our newer visual language. This visual language, inspired by material design, was replacing our legacy Bootstrap 3 interface. It also allowed us to bring more design elements and components into our interface that otherwise wouldn't be available in Bootstrap.

The new visual language was also developed with an eye toward accessibility. Though Bootstrap 3 had some accessibility features, our integration of it had no consideration for accessibility.

<div class="columns is-mobile widealign">
<div class="column is-6">

![User flow map showing processes input and status messages](/img/csr2.png)

</div>
<div class="column is-6">

![User flow map showing processes input and status messages](/img/csr5.png)
*No Dragons were harmed in the making of this application*
</div>
</div>

***

**If you enjoyed this and want to see more UX work, [view all blog posts by UX tag](https://joshuasalazar.net/tags/ux/).**