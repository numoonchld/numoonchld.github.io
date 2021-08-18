---
layout: post
title: test-driven-development-with-react
date: 2021-08-18
updated: 
artist: 
artistLink: 
track: 
trackLink: 
tags: [react, tdd, rtl]
---


> 'A way of managing fear during programming' - Kent Beck

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
- **Cheaper**
  - Find bugs *before* going to production

## TDD Requirements

- Create epics and user stories based on the requirements.
- Create tests based on user stories.
- Develop a React app using TDD.

_Remember:_

- tests should give us the confidence to ship, not necessarily cover every bit of implementation detail

## Setup 

### React Testing Library (RTL)

- comes bundled in CRA (`npx create-react-app .`)
- on manual install copy paste the following:
  - `npm install --save-dev @testing-library/react`
  - `npm install --save-dev @testing-library/jest-dom`
  - `npm install --save-dev @testing-library/user-event`
- in CodeSandbox, add the same dependencies
  - `@testing-library/react`
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`

### Mock Service Worker (MSW)

- great companion for RTL
- used to mock API calls during React only development
- `npm install --save-dev msw`

# Reference

- [React + TDD === ♥️](https://youtu.be/IzAX80fWrOQ)
- [React Test-driven Development: From User Stories to Production](https://www.toptal.com/react/tdd-react-user-stories-to-development)
- [Test-Driven Development, Functions, and React Components](https://www.freecodecamp.org/news/tdd-functions-and-react-components/)


