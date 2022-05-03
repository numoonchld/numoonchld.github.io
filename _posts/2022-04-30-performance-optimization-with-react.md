---
layout: post
title: performance optimization with react
date: 2022-04-30
updated: 
artist: 
artistLink: 
track: 
trackLink: 
tags: [frontend performance, react performance, code splitting]
---

## core react optimization strategies:

- only load what's needed
  - code splitting
  - tree shaking
- avoid blocking main browser thread
- avoid memory leaks
- avoid multiple re-rendering

## critical render path

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


# code splitting (progressive bootstrapping)

- JS benefits from being split into smaller chunks 
  - doesnt block rendering while loading a single large JS file

- send only a minimal HTML-CSS-JS pack for that particular route
  - the rest maybe loaded as user action demands (lazy loading)

- use production builds when deploying apps 
  - comes with Create-React-App (`npm run build`)

- there are several to achieve code-splitting in react
  - primarily using [dynamic `import`](https://reactjs.org/docs/code-splitting.html#import) and [HOC `asyncCompoment` techniques](https://reactjs.org/docs/higher-order-components.html)
  - `React.lazy()` is a feature in react to achieve code-splitting as well
    - always use `<Suspense>` wrapper component with a `fallback` when using `React.lazy()`

## `localhost:3000?react_perf`

- since react 15.4.0: use this query `?react_perf` parameter in the browser address bar
  - then open chrome developer tools and go to performance

- 
