---
layout: post
title: publishing an angular project to github pages
artist: 
artistLink: 
track: 
trackLink: 
tags: [angular, notes, github-pages]
---

### pre-reqs:

- have a github account 
- have an angular project ready to deploy to github pages
- active version control with git on the angular project

### pick a project name and stick to it

- choose a name for your app's github repo 
- this will be refered to as `<choosen-name>` in this post
- use the same name while building the app in CLI


### github repo setup:

- create a blank repo in github with `<choosen-name>`
- this must NOT be `<github-username>.github.io`

### angular CLI tasks:

- while in the app root directory, build project using:
    - `ng build --prod --output-path docs --base-href <choosen-name>`
- this creates source files in a docs folder in the apps root directory 

- navigate to the newly created docs folder in the angular app's root directory
- make a copy of the `index.html` file and rename the copy to `404.html`
- commit and push entire project to newly created github repo

### github repo config: 

- navigate to the settings of the project 
- in the "GitHub Pages" section, select 'master branch/docs folder' from the options and save

### check project deployment:
- go to `https://<github-username>.github.io/<choosen-name>`

### troubleshooting and reading:

- [github project pages](https://help.github.com/articles/user-organization-and-project-pages/#project-pages-sites){: target="_blank"}
- [angular deployment to github pages](https://angular.io/guide/deployment#deploy-to-github-pages){: target="_blank"}
- [github repo config](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch){: target="_blank"}
