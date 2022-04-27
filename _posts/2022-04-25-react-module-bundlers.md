---
layout: post
title: react module bunlders
date: 2022-04-26
updated: 
artist: 
artistLink: 
track: 
trackLink: 
tags: [react, module bundlers]
---

# Bundlers: 

- bundlers optmize files for delivery over the network
- examples:
  - parcel: zero configuration
  - webpack: highly configurable
  - rollup.js: good for tree-shaking (removed used code before bundling)  

- things are always evolving: so some specific construct that applied 2 years ago might not apply now

## webpack

- used in Create React App (APP)
- 'bundles' JS modules and dependencies into static assets 

- webpack setup and configuration is very instense and also prone to change!

### loader 

- webpack enables use of loaders to preprocess files which allows bundling static resources (including but not limited to JS) 
- write your own loaders using Node.js

#### babel

- transpiles ES6 and ES7 etc to ES5 JS to maintain browser compatibility

#### eslint 

- code linter with customizable rules 
- use airbnb's open source config as a starting point for this config file (`airbnb-base`)

# resources

- [Frontend build config generator](https://createapp.dev/webpack/react--babel--react-hot-loader)
