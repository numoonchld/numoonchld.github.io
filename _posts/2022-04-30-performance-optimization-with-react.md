---
layout: post
title: performance optimization with react
date: 2022-04-30
updated: 
artist: 
artistLink: 
track: 
trackLink: 
tags: [frontend performance, react performance]
---

- from a JS view point, the heaviest part of the Critical Render Path is 
  - parsing and compilation of JS files that's received by the browser from the server!
- Chrome developer tools for instance allows developers to analyse and assess the parse and compile operations
- use the record function, reaload the page and stop recording after the page has completed loading, 
  - green line: layout painting
  - blue line: DOM loading start
  - red line: DOM loading complete

- in the summary tab,
  - the scripting piece of the pie chart includes parse and compile time
  - more JS, more load time before website is ready
 
- JS execution adds even more time before page is ready for user interaction!
  - browsers typically do JIT (just-in-time) compilation
  - however, note that angular does ahead of time compilation

- one of the biggest performance drains is triggering animations, especially during scroll events

- `<script>` is a render blocking element

## goals for front end performance

- fast time to first meaningful paint
- fast time for page to be interactive