---
layout: post
title: generate an express app
updated: 2019-01-21
artist: Komytea
artistLink: https://www.discogs.com/artist/458873-Komytea
track: 9
trackLink: https://youtu.be/hjDS9N76zCQ
tags: [expressjs, git, nodejs, npm, notes]
---


## Goal: 

to generate a barebones *nodejs* app named *tupla-gen* powered by *pug* and *sass*, and create a *remote* copy of the app's code on GitHub

#### Required:

- node.js - Development Environment
    - [Download](https://nodejs.org/en/download/){: target="_blank"}t
    - [Install via Package Manger](https://nodejs.org/en/download/package-manager){: target="_blank"}

- npm - Package Manager
    - [Install npm](https://blog.npmjs.org/post/85484771375/how-to-install-npm){: target="_blank"}

- express - Web Framework
    - [Install ExpressJS](https://expressjs.com/en/starter/installing.html){: target="_blank"}

- git - Version Control
    - [Download](https://git-scm.com/downloads){: target="_blank"}

#### Install and Update: 
 
check version of *node*, *npm* and *express*
```
node --version
npm --version
express --version
```

update all npm packages 
```
npm update -g
```

then install (or update) express app generator
```
npm install -g express-generator
```

#### Optional (makes app writing easier):

- vscode - Text Editor (with git and console integration)
    - [Download](https://code.visualstudio.com/download){: target="_blank"}

<br>
## Generate:

navigate to the parent folder in which you want your newly generated app to reside

generate a barebones express app with:
```
express tulpa-gen --view=pug --css=sass
```

this creates a folder dedicated to the app, all of the next steps happen inside this, navigate into it
```
cd tulpa-gen
```

open the *package.json* file (in vs-code) and review the dependencies (i.e. node packages needed to run the newly created app)

check for the latest dependency package versions on *npm* package website or install a dedicated package
```
npm install -g npm-check-updates
```

then check for available updates in the CLI using
```
ncu
```

update the version numbers in *package.json* manually OR use

```
ncu -u
```

be cautious with upgrading the *package.json* file dependency versions while dealing with mature code as changing package versions might inadvertently break a fully functional app

make other changes to *package.json* at this point as desired - i.e.

- set the app version:
    ```
    "version": "0.0.1",
    ```
- add app description:
    ```
    "description": "express app to demo generation of tulpas",
    ```
- add node engine version:
    ```
    "engines": { 
        "node": "10.x" 
    },
    ```

<br>
## Install Dependencies:

all the dependencies listed in *package.json* are installed to the app's root by
```
npm install
```

when this step is successfully completed, a *package-lock.json* file is created, and CLI will state that this needs to be committed

so initialize a git repository in the app root by 
```
git init
```

this initializes a repository with a default `master` branch in the app's root folder 

then create a *.gitignore* file (if you've been using vs-code, *file > new file* and name file *.gitignore*)

open this file and add relevant folders to ignore i.e. paste into *.gitignore*

```
# Dependency directories
node_modules/

# Optional npm cache directory
.npm
```

here is an extensive [list of nodejs gitignores](https://github.com/github/gitignore/blob/master/Node.gitignore){: target="_blank"}


_**new dependencies**_

install new dependencies using 
```
npm install dotenv --save
npm install mongodb --save
```

*dotenv* is for enabling the use of a *.env* file in the app root folder, *mongodb* is a database driver package for *nodejs*

the `--save` option automatically adds the dependency in the *package.json* file in addition to installing the package files into *node_modules* folder

remember to `require` the installed dependencies as per the package's documentation on the npm website - i.e.
```
require('custom-env').env()
const MongoClient = require('mongodb').MongoClient
```

_**delete dependencies**_

uninstall unnecessary existing dependencies using
```
npm uninstall cookie-parser --save
npm uninstall debug --save
```

including `--save` removes entry in the *package.json* file in addition to uninstalling. remember to remove the `require` statements from `app.js`

_**development-only dependencies**_

to install dev only dependencies, use the option `--save-dev`
```
npm install nodemon --save-dev
```
*nodemon* is for auto sever refresh when new file saves are detected - useful for development, but negatively affects performance, so exclusively a development dependency


then add `"devstart": "nodemon ./bin/www"` to the scripts object in *package.json*

<br>
## Serve: 

begin serving the app by 
```
npm run devstart
```
watch the CLI for errors; (*morgan* package with `dev` level logging is enabled by default in the auto-generated `app.js` file)

if no errors are thrown, the served app can be locally accessed with a browser @ `localhost:3000` 

to end the app server, hit `Ctrl + C` in the CLI

to run app without *nodemon*, use 
```
npm start
```
make sure app serves the default index.pug content @ `localhost:3000` without errors in the CLI 


<br>
## Commit:

stage and commit the git repository 
```
git add . 
git commit -m "Zeroth Commit"
```
the *package-lock.json* file has been committed. *tupla-gen* can be a starting point for developing complex apps



<br>
## Remote:

this app can be pushed to a *remote* repository on hosting services like Github, Gitlab, or Bitbucket


#### set *origin* url:
for this *tulpa-gen* example, first a *remote* called *origin* is set 

for this, create a **blank** GitHub repository (needs an active GitHub account) and copy it's url - lets call that _remote-url-slug_

then, add a *remote* for this url (to the *git config* file of the local repository) by 
```
git remote add origin _remote-url-slug_
```
by convention, the name *origin* is intended to be the first remote (or the direct) clone of the local repository



verify that *origin* url has been set correctly 
```
git remote --verbose 
```

*origin* must be listed twice in the output for this command with the specified *remote_url*, one for *push* and another for *fetch*

#### push to *origin*:

having set *origin* successfully, push the local code repository to the remote repository using 
```
git push -u origin master
```
here `master` is the default branch, which is pushed to the *remote* repository named as *origin*

if you encounter errors in this step, it's very likely your remote repository is not totally empty and was initialized with a file 


here is my [tulpa-gen](https://github.com/numoonchld/tulpa-gen){: target="_blank"} *remote*


<hr>
## Reading: <br>

##### ExpressJS:
* [ExpressJS - generator](https://expressjs.com/en/starter/generator.html){: target="_blank"}
* [ExpressJS on npm](https://www.npmjs.com/package/express){: target="_blank"}

##### npm:
* [npm-check-updates](https://www.npmjs.com/package/npm-check-updates){: target="_blank"}
* [npm-update](https://docs.npmjs.com/cli/update.html){: target="_blank"}

##### GitHub:
* [Creating Github Remotes](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/){: target="_blank"}

##### Tulpas:
* [Wikipedia](https://en.wikipedia.org/wiki/Tulpa){: target="_blank"}