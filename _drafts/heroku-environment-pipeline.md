---
layout: post
title: heroku environment pipeline
artist: 
artistLink: 
track: 
trackLink: 
tags: [heroku, git, nodejs, notes]
---



consider a simple functional *nodejs* app *tulpa-gen-hp* with active git version-control 



<br>
## Goal:

to setup a *heroku* pipeline through *heroku CLI* for this app 



<br>
#### why environments? 

["... help prevent buggy code from being deployed to production by maintaining ... separate environments as different Heroku apps, and by using each environment only for its intended purpose."](https://devcenter.heroku.com/articles/multiple-environments){: target="_blank"}



<br>
#### required for this exercise:

you'll need an active *heroku* account and [*heroku CLI*](https://devcenter.heroku.com/articles/heroku-cli){: target="_blank"} installed on your app development machine, along with the functional *nodejs* app you want to setup the pipeline for 

here is my work-along demo - clone [this](https://github.com/numoonchld/tulpa-gen){: target="_blank"} to your local machine if needed



<br>
#### *tupla-gen-hp* app setup:

if you've cloned the above repository, then navigate into the app's root folder in your CLI, and then install the dependencies, (the rest of this exercise is to take place in the app's root directory)

    npm install

make sure the app runs; serve the app 

    npm run devstart 

and go to `localhost:3000` in your browser to ensure a simple page loads without any errors thrown in the CLI; hit `Ctrl + C` to end server



<br> 
## *Heroku* setup: 

login to your *heroku* account with 
    
    heroku login

this will open a browser to login to your desired *heroku* account, return to the CLI after the authentication is complete

then initialize a *heroku* app *tulpa-gen* with the current *nodejs* app

    heroku create tulpa-gen

in the process, the CLI shows the *heroku* app deployment URL (more about deploying later) along with a corresponding git *remote* URL, which is added as a new *remote* to the local app repository - verify:

    git remote --verbose 

should now list two remotes: `heroku` and `origin` (each one twice - for fetch and push)

next, initialize a new *heroku* pipeline with this app 

    heroku pipelines:create tulpa-gen-envs-pipe --app tulpa-gen

you should be prompted to select the stage of this app, pick `production`. after this process is done, verify the pipeline creation by checking the list of pipelines 

    heroku pipelines:list

you should see `tulpa-gen-envs-pipe` listed in the output, as well as on your *heroku* dashboard. to see more info about the pipeline itself, do: 


    heroku pipelines:info tulpa-gen-envs-pipe

this should list all the apps that belong to the pipeline (each app can be in only one pipeline), along with the stage of the pipeline it's in



<br>
## Git *remotes*:

a git *remote* is some version of your local repository that's on another server 

a git *origin* is, by convention, the first direct *remote* of a repository

a single local repository can have multiple *remotes* 

to list all remotes associated with local repository:
```
git remote --verbose
```

if you cloned it from the provided GitHub link, that URL should be set for *remote.origin*



<br>
## *Heroku* pipeline:

one *heroku* pipeline has three stages:

* `development` 
* `staging`  
* `production` 

three corresponding *heroku remotes* of the local repository can be pushed to these stages. *remotes* can be some version of your local repo, not necessarily an exact copy

initialize a new *heroku* pipeline named *tulpa-gen-envs-pipe* with the functional *nodejs* app

    heroku pipelines:create tulpa-gen-envs-pipe --app tulpa-gen

pick *production* when prompted to select the stage; this creates the pipeline with the app in production stage

after this process is done, verify pipeline exists and the app is in the pipeline

    heroku pipelines:list 
    heroku pipelines:info tulpa-gen-envs-pipe 

to see all *heroku* apps associated with the current account at any point, do

    heroku apps



<br>
## Environments:

- the production environment is for the deployed app ready to be consumed by the target audience 
- typically, all development work is done on the local repository - this is the development environment
- after adding some new feature to the local app, it needs to be tested - the staging environment is for this 

ideally, each environment is allotted it's own *heroku* app



_**the `development` remote :**_

to add the current local repository to the pipeline's `development` stage, create a new remote *heroku* app named *tulpa-gen-development* with the `--remote` flag using `heroku create`
    
    heroku create --remote development tulpa-gen-development

here:
-  `development` is the new *remote* name 
- `tulpa-gen-development` is the new app to be served at the new remote

verify new *remote* has been added to repository 

    git remote --verbose 

then, add this remote app to the development stage of the pipeline

    heroku pipelines:add tulpa-gen-envs-pipe --app tulpa-gen-development

here: 
- `tulpa-gen-envs-pipe` is the destination pipeline
- `--app` is the option to specify app name to be added 
- `tulpa-gen-development` is the app to be added to the pipeline

choose `development` as the stage for this app when prompted; when done, verify app has been added to pipeline with

    heroku pipelines:info tulpa-gen-envs-pipe



_**the `staging` remote:**_

similar to the previous step

    // create a remote for 'staging' stage
    heroku create --remote staging tulpa-gen-staging

    // verify remote has been created
    git remote --verbose 

    // add staging remote to heroku pipeline
    // choose 'staging' as the stage for the app when prompted
    heroku pipelines:add tulpa-gen-envs-pipe --app tulpa-gen-staging

    // verify app has been added 
    heroku pipelines:info tulpa-gen-envs-pipe



_**the `production` remote:**_

the *heroku* pipeline was initialized with the production stage app, now to specify a dedicated production *remote*

    heroku git:remote --remote production --app tulpa-gen

here:
- `--remote production` sets the name of the remote to production
- `--app tulpa-gen` is to set the name of the app to associate with the remote

verify with 

    git remote --verbose 

this should list four remotes 
- `origin`
- `development`
- `staging`
- `production`

here, `origin` is a non-*heroku* *remote*, while `development`,`staging` and `production` are *heroku remotes*, when a single git repo has more than one *heroku remote*, each time a *heroku* command is used in the CLI, the target app has to specified. to set a current default *heroku remote*, do 

    git config heroku.remote 'heroku-remote-name'

    // i.e. for development
    git config heroku.remote development


<br>
## *Heroku* environment variables:

an app can be deployed across various environments. app config can be set uniquely for each environment for the code to run. for example, you may use a local mongodb server as your app's database during development, but need to switch to an online database service for your app's production deployment. 

these config variables are to be set outside the app with the goal of informing the app about the environment it is deployed to, and their values are accessed within a *nodejs* app using `process.env.VARIABLE_NAME` 

*heroku config vars* can be used to set config variables unique to a *heroku* app. so, the production app (`--app tulpa-gen`) can have it's own set of production environment variables, including the production specific database service URI

    heroku config:set --app tulpa-gen NODE_ENV=production
    heroku config:set --app tulpa-gen DB_URI=mongodb://<adminuser>:<password>@ds012345-a0.mlab.com:56789/db-name


similarly, the development app (`--app tulpa-gen-development`) can have a dedicated set of environment variables, including a variable that has the local database address

    heroku config:set --app tulpa-gen-development NODE_ENV=development //default value
    heroku config:set --app tulpa-gen-development DB_URI=mongodb://127.0.0.1:27017/db-name

in the staging environment app, set 

    `NODE_ENV=test` 
    
and run unit test suites (mocha-chai tests, for instance) to verify app meets requirements and user-stories  

these *config vars* have to be set separately for all apps in the pipeline

<br>
## Deployment and Pipeline Promotion:


#### run app locally:

you can run the current branch of your app's repo though `nodemon`

    npm run devstart 
    // default served to localhost:3000 

or *npm*

    npm start
    // default served to localhost:3000

or [locally on *heroku*](https://devcenter.heroku.com/articles/heroku-local){: target="_blank"} by

    heroku local
    // default served to localhost:5000


#### deploy app to *heroku* server:

to deploy the current `master` branch to the current *heroku remote*, do

    git push heroku master

here:
- `heroku` is the `heroku.remote` in git config 
- `master` is the current branch

to directly deploy `master` branch to another *remote*, say `staging`, do

    git push staging master

to push a different branch, say `feature`, to `staging`, do

    git push staging feature:master

#### pipeline downstream flow:

pipeline flow: `development` > `staging` > `production`

remember that a pipeline contains only deployed apps (each linked to their *remote*) and not (necessarily) the current local app repository code 

so, after having worked on it, you may deploy your current `master` branch as an app to a `staging` environment of the pipeline initialized earlier and see how it does on the *heroku* server and perform all kinds of tests 

once it's sufficiently mature (subjective to the app, requirements and developer), it may be promoted to the `production` environment

    heroku pipelines:promote --remote staging 

when an app is promoted, it ceases to be in the previous environment of the pipeline, and exists entirely in the environment it is promoted to 



<hr>
## Reading: <br>

##### Git:
* [Git Config](https://www.git-tower.com/learn/git/glossary/origin){: target="_blank"}
* [Git Origin](https://www.git-tower.com/learn/git/glossary/origin){: target="_blank"}
* [Git Origin vs. Remotes](https://stackoverflow.com/a/9529518){: target="_blank"}

##### Heroku:
* [Heroku and Git](https://devcenter.heroku.com/articles/git){: target="_blank"}
* [Multiple Environments in Heroku](https://devcenter.heroku.com/articles/multiple-environments){: target="_blank"}
* [Deployment with Pipelines](https://devcenter.heroku.com/articles/pipelines){: target="_blank"}
* [Heroku Environment Variables](https://devcenter.heroku.com/articles/config-vars){: target="_blank"}