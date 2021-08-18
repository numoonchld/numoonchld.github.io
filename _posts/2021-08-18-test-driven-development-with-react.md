---
layout: post
title: test-driven-development-with-react
date: 2020-11-22
updated: 
artist: 
artistLink: 
track: 
trackLink: 
tags: [react, tdd]
---


# Test Driven Development With React

> > > 'A way of managing fear during programming' - Kent Beck

- Cycles of `Red - Green - Refactor`
  - `Red`: start with failing tests
  - `Green`: write as less code as possible to get the failing test to pass
  - `Refactor`: after accumulating a whole bunch of such code, refactor to follow current best practices

**End-To-End Testing** vs. **Unit Tests**

- End-to-End Tests have a larger scope than Unit Tests
- End-to-End tests are fewer but take longer to run
- Unit Tests are the smallest unit of tests, so these are usually many in number
  - Each one takes a very samll time to run, but cumulatively, time taken depends on the number of tests

## Why TDD?

- **Confidence**
  - Code only does what is tested
- **Cleaner Code**
  - Design based on test scenarios

## TDD Requirements

- Create epics and user stories based on the requirements.
- Create tests based on user stories.
- Develop a React app using TDD.

_Remember:_

- tests should give us the confidence to ship, not necessarily cover every bit of implementation detail

# Reference

- [React + TDD === ♥️](https://youtu.be/IzAX80fWrOQ)
- [React Test-driven Development: From User Stories to Production](https://www.toptal.com/react/tdd-react-user-stories-to-development)
- [Test-Driven Development, Functions, and React Components](https://www.freecodecamp.org/news/tdd-functions-and-react-components/)


