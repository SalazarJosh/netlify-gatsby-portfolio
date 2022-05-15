---
templateKey: 'blog-post'
title: 'Redesign: LSA Today'
date: 2022-05-13
featuredpost: false
listed: true
featuredimage: /img/lsa-today-feature-image.png
description: Redesigning the LSA Today Quarterly Email
  
tags:
  - UX
  - Redesign
  - Case Study
---

The LSA Today Quarterly email is an email that goes out to roughly 180,000 University of Michigan Alumni that attended the College of Literature, Science, and the Arts (LSA). 

The email serves as a highlight of what has happened over the past quarter at LSA. It contains engaging story-telling and calls to action to allow the user to further engage with the college.

## Old Design to New Design

<div class="columns">
<div class="column is-6">

![OLD LSA Today email design](/img/lsa-today-old-design.png)
<p style="text-align: center;">
  <small><em>OLD LSA Today email design</em></small>
</p>
</div>
<div class="column is-6">

![NEW LSA Today email design](/img/lsa-today-new-design.png)
<p style="text-align: center;">
  <small><em>NEW LSA Today email design</em></small>
</p>
</div>
</div>

The old design had a number of issues that prevented it from being a successful, modern email. Though it was deploying to roughly 180,000 users, there was so much more that could be done to ensure users were getting and engaging with the content.

### Goal #1 - Make it Responsive

The first and biggest issue was the lack of responsive design for the email. On mobile, content outside of the 600px width would simply be cut off if the email client didn't support overflow scrolling.

We had to make the email responsive but also make sure it would be supported on most modern email clients.

### Goal #2 - Personalization

The content of the email is also static. That is, everyone receives the same email. We have data that would allow us to customize and curate content for each recipient. For that data we don't have, we need to ensure we are good data stewards and ask our users to provide that data.

For example, we could include more humanities stories if we know the recipient graduated from a major in the Humanities unit. If the user had previously donated to the college, we could share more stories that are relevant to the area in which they donated.

### Goal #3 - Simplify Presentation

The presentation of the email was rather cumbersome. There was a lot of close, competing content that would be fighting for the user's attention.

### Goal #4 - Utilize Data

Since this email deployed on a semi-regular basis, we could use that opportunity to A/B test certain features and optimize the design and content to bring the best experience to the users.

## New Design

After redeveloping a new email from the ground up, we were able to hit on several of our initial goals. Some of the goals are more long-term and will require a lot of process changes. For now, I'll focus on the new design and how we improved the user experience.

### Responsive and Simple Design

We created a brand new template from the ground up to allow users to view the email on smaller screens. The old template was built on legacy email design practices and contained a lot of nested, fixed-width tables. Though tables are still (unfortunately) the primary layout way to layout content in tables, we reduced the amount of nesting and used more responsive css properties (percentages, em, vh / vw, etc.).

We started by adding a lot of white space to the design and by reducing the amount of competing horizontal content. Though we also included media-queries, [not all email clients support them](https://www.campaignmonitor.com/css/media-queries/media/). In the old design, there were as many as four columns of content all trying to fit within 600 pixels. We reduced the maximum number of columns down to two to allow even the smallest of screens to have a legible experience.

### Data Utilization

Since implementing this new design, we've A/B tested smaller aspects of the design to optimize the experience and provide the most engaging content. For example, one of our most recent A/B tests was to figure out if the teaser text (the text below the titles of each article) was actually necessary. We sent half of our recipients a version without the teaser text, and the other half with the teaser text.

Version A (left) is the version without teaser text. Version B (right) is the version with teaser text.

<div class="columns">
<div class="column is-6">

![Comparison of version a email to version b email. Version A does not have teaser text under the stories](/img/lsa-today-ab-comparison.png)

</div>
<div class="column is-6">

![Data showing interaction between version a and version b. version a has more views but version b has more engagement](/img/lsa-today-ab-results.png)

</div>
</div>

From the data, we found that more users interacted with the version without the teaser text. However, we also found that that version also had lower engagement.

We felt engagement was more important than open count. Not only were more people engaging with the email content in Version B, but those that went to the website from Version B stayed longer and visited more pages.

## Closing Remarks

This email is still one of the largest email campaigns I am a part of. We have a long way to go with our initial goals but we continue to refine our design and content and utilize data in decision making.

***

**If you enjoyed this and want to see more UX work, [view all blog posts by UX tag](https://joshuasalazar.net/tags/ux/).**