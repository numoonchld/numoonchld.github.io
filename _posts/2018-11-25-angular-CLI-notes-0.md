---
layout: post
title: angular CLI notes 0
artist: Filterheadz
artistLink: https://en.wikipedia.org/wiki/Filterheadz
track: Everything Explained 
trackLink: https://www.youtube.com/watch?v=wScsg7F5pEM
tags: [angular 6, notes]
updated: 2019-02-06
---

### Setup Pre-requisites:

<br>
#### Required:

- node.js - Development Environment
    - [Download](https://nodejs.org/en/download/){: target="_blank"}
    - [Install via Package Manger](https://nodejs.org/en/download/package-manager){: target="_blank"}

- npm - Package Manager
    - [How to Install npm](https://blog.npmjs.org/post/85484771375/how-to-install-npm){: target="_blank"}

#### Optional:

- git - Version Control
    - [Download](https://git-scm.com/downloads){: target="_blank"}

- vscode - Text Editor (with git and console integration)
    - [Download](https://code.visualstudio.com/download){: target="_blank"}


<hr/>

### Angular CLI Setup:

<br>
#### Test pre-reqs and Install: 

```node -v```
- must return 8.x or 10.x

```npm -v```
- must be more than 5.x

If both thse conditions are met, [install Angular CLI](https://cli.angular.io)

```npm install -g @angular/cli```

<br>
#### Test installation: 

Create test project:

```ng new test-app```

- say no to adding routing and use default (CSS) stylesheet for this example

Change working directory to newly created app directory:

```cd test-app```

Serve app to default web browser:

```ng serve --open```

- this opens the app in the browser at the local address: ```http://localhost:4200/```
- the default port is 4200

```ng serve --port 7777 --open```
	
- use this to open at ```http://localhost:7777/```
- or use a custom port of your choice 

This should render the default Angular App, if everything is setup correctly. 

<hr/>

### JavaScript Concepts:
- [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes){:target='_blank'}
- [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export){:target='_blank'}
- [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import){:target='_blank'}

### TypeScript Concepts:
- [type annotation](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html){:target='_blank'} (search for type annotation)
- [JavaScript-TypeScript relationship](https://stackoverflow.com/a/12694578){: target="_blank"}
- [Compile Time vs. Runtime](https://stackoverflow.com/a/846421){: target="_blank"}
- [Static vs. Dynamic, Strong vs. Weak, and Duck Typing](https://www.koffeinfrei.org/2012/03/19/static-vs-dynamic-vs-strong-vs-weak-vs-duck-typing/){: target="_blank"}

### Angular Concepts:
- [decorator function](https://angular.io/guide/glossary#decorator--decoration){: target="_blank"}
- [class decorator](https://angular.io/guide/glossary#class-decorator){: target="_blank"}
- [component](https://angular.io/guide/glossary#component){: target="_blank"}