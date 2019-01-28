---
layout: post
title: heroku environment pipeline
artist: Maiga
artistLink: https://www.discogs.com/Maiga-The-Teide-Tenerife/release/10956656
track: The Teide
trackLink: https://www.youtube.com/watch?v=PEPU3vQ_p-c
tags: [heroku, git, nodejs, notes]
updated: 2018-01-28
---



consider a simple functional *nodejs* app *tulpa-gen-hp* with active git version-control 



<br>
## Goal:

to setup a *heroku* pipeline for the development process of this app (through *heroku CLI*)



#### why environments? 

["... help prevent buggy code from being deployed to production by maintaining ... separate environments as different Heroku apps, and by using each environment only for its intended purpose."](https://devcenter.heroku.com/articles/multiple-environments){: target="_blank"}



#### required for this exercise:

you'll need an active [*heroku* account](https://signup.heroku.com/){: target="_blank"}, [*heroku CLI*](https://devcenter.heroku.com/articles/heroku-cli){: target="_blank"} installed locally on your development machine, and a functional *nodejs* app you want to setup the pipeline with. [here is my work-along demo](https://github.com/numoonchld/tulpa-gen){: target="_blank"}  - clone to your local drive if you need something to work with



#### *tupla-gen-hp* app setup:

navigate into the app's root folder in your CLI, and then install *npm* dependencies listed in `package.json`; the rest of this exercise is to take place in the app's root directory

    npm install //installs all dependencies in package.json

to make sure the app runs, serve using `nodemon`

    npm run devstart 

and go to `localhost:3000` in your browser to verify app loads (a simple page loads for the work-along demo) without any errors in the CLI; hit `Ctrl + C` to end server



<br> 
## *Heroku* setup: 

login to your *heroku* account with 
    
    heroku login

this will open a browser to login to your desired *heroku* account, return to the CLI after the authentication is complete

then initialize a *heroku* app *tulpa-gen* with the current *nodejs* app

    heroku create tulpa-gen

the `master` branch of the local repository is now deployed on *heroku*  

a *heroku* app has two main components, a remote repository and a deployment URL. the remote repository is the code for the app to be served at the deployment URL

in the process of creating a *heroku* app, the CLI shows the *heroku* app deployment URL along with a corresponding git *remote* URL, which is added as a new *remote* to the local app repository - verify:

    git remote --verbose 

should now list two remotes: `heroku` and `origin` (each one twice - for fetch and push)

to launch the deployed app, do 

    heroku open

and verify the deployment URL works

next, initialize a new *heroku* pipeline with this app 

    heroku pipelines:create tulpa-gen-envs-pipe --app tulpa-gen

you should be prompted to select the stage of this app, pick `production`. after this is done, verify the pipeline creation by checking the list of pipelines 

    heroku pipelines:list

you should see `tulpa-gen-envs-pipe` listed in the output, as well as on your *heroku* dashboard. to see more info about the pipeline itself, do: 


    heroku pipelines:info tulpa-gen-envs-pipe

this should list all the apps that belong to the pipeline (each app can be in only one pipeline), along with the stage of the pipeline it's in



<br>
## Git *remotes*:

a git *remote* is some version of your local repository that's on another server 

a git *origin* is, by convention, the source *remote* of a repository

a single local repository can have multiple *remotes*; to list all of them, do
```
git remote --verbose
```

(if you cloned it from the provided repo link, that should be set as `remote.origin`)



<br>
## *Heroku* pipeline:

one *heroku* pipeline has three stages:

* `development` 
* `staging`  
* `production` 

a *heroku remote* and corresponding *heroku app* of the local repository can be put into these stages. *remotes* can be some version of your local repo, not necessarily an exact copy. as the app matures, it maybe promoted to a stage downstream 

![heroku pipeline](/media/blogAssets/herokuPipelines/hp-illustrations-pipeline.svg)
{: style="text-align: center;"}

*fig 1: simple schematic of a heroku pipeline* 
{: style="font-size: 80%; text-align: center;"}

initialize a new *heroku* pipeline named *tulpa-gen-envs-pipe* 

    heroku pipelines:create tulpa-gen-envs-pipe --app tulpa-gen

here, `--app tulpa-gen` is the option that specifies the app to initialize the pipeline with

pick *production* when prompted to select the stage; this creates the pipeline with the app in production stage

after this process is done, verify pipeline exists, and also that the app is in the pipeline

    heroku pipelines:list 
    heroku pipelines:info tulpa-gen-envs-pipe 

to see all *heroku* apps associated with the current account at any point, do

    heroku apps



<br>
## Environments:

- apps in the production environment are ready for target audience consumption
- typically, all development work is done on the local repository and can be considered the development environment
- after adding some new feature to the local app, it needs to be tested - the staging environment is for this 

when working with *heroku* pipelines, each environment is allotted it's own *heroku* app. a dedicated set of environment variables can be passed to each app


_**the `development` remote :**_

create a new *heroku* app named *tulpa-gen-development* using `heroku create`, and set it's *remote* name as *development* using
    
    heroku create --remote development tulpa-gen-development

here:
-  `--remote development` is the new *remote* name specifier
- `tulpa-gen-development` is the new app to be served at the new remote

verify new *remote* has been added to repository 

    git remote --verbose 

then, add this app to the development stage of the pipeline

    heroku pipelines:add tulpa-gen-envs-pipe --app tulpa-gen-development

here: 
- `tulpa-gen-envs-pipe` is the destination pipeline
- `--app tulpa-gen-development` is to add the app to the pipeline

choose `development` as the pipeline stage for this app when prompted; when done, verify app has been added to pipeline with

    heroku pipelines:info tulpa-gen-envs-pipe



_**the `staging` remote:**_

setup a *remote* for `staging`, similar to the previous step

    // create a new heroku app with associated remote named 'staging'
    heroku create --remote staging tulpa-gen-staging

    // verify remote has been created
    git remote --verbose 

    // add this app to heroku pipeline
    // choose 'staging' as the stage for the app when prompted
    heroku pipelines:add tulpa-gen-envs-pipe --app tulpa-gen-staging

    // verify app has been added 
    heroku pipelines:info tulpa-gen-envs-pipe



_**the `production` remote:**_

the *heroku* pipeline was initialized with the production stage app, now specify a dedicated production *remote* name

    heroku git:remote --remote production --app tulpa-gen

here:
- `--remote production` sets the name of the remote to production
- `--app tulpa-gen` is to set the name of the app to associate with the remote

verify with 

    git remote --verbose 

this should list four remotes:
- `origin`
- `development`
- `staging`
- `production`

here, `origin` is a non-*heroku* *remote*, while `development`, `staging` and `production` are *heroku remotes*

when a single git repo has more than one *heroku remote*, each time a *heroku* command is used in the CLI, the target app has to specified. alternatively, a default *heroku remote* can be set using 

    git config heroku.remote 'heroku-remote-name'

    // i.e. for the development remote
    git config heroku.remote development


![remotes for a *heroku* pipeline](/media/blogAssets/herokuPipelines/hp-illustrations-remotes.svg)
{: style="text-align: center;"}

*fig 2: remotes of the local git repo*
{: style="font-size: 80%; text-align: center;"}

<br>
## *Heroku* environment variables:

an app can be deployed across various environments

app config can be set uniquely for each environment for the code to run. for example, you may use a local mongodb server as your app's database during development, but need to switch to an online database service for your app's production deployment 

these config variables are to be set outside the app with the goal of informing the app about the environment it is deployed to, and their values are accessed within a *nodejs* app using `process.env.VARIABLE_NAME` 

*heroku config vars* can be used to set config variables unique to a *heroku* app

so, the production app (`--app tulpa-gen`) can have it's own set of production environment variables, including the production specific database service URI

    heroku config:set --app tulpa-gen NODE_ENV=production
    heroku config:set --app tulpa-gen DB_URI=mongodb://<adminuser>:<password>@ds012345-a0.mlab.com:56789/db-name


similarly, the development app (`--app tulpa-gen-development`) can have a dedicated set of environment variables, including a variable that has the local database address

    heroku config:set --app tulpa-gen-development NODE_ENV=development //default value
    heroku config:set --app tulpa-gen-development DB_URI=mongodb://127.0.0.1:27017/db-name

in the staging environment app, set 

    `NODE_ENV=test` 
    
and run test suites (mocha-chai tests, for instance) to verify app meets user-stories

these *config vars* have to be set separately for all apps in the pipeline

![remotes for a *heroku* pipeline](/media/blogAssets/herokuPipelines/hp-illustrations-config vars.svg)
{: style="text-align: center;"}

*fig 3: dedicated config vars for apps* 
{: style="font-size: 80%; text-align: center;"}

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
- `heroku` is the *heroku.remote* in git config (`git config -l`)
- `master` is the current branch

to directly deploy `master` branch to a non-default *heroku remote*, say *staging*, do

    git push staging master

to push a non-`master` branch, say `feature`, to *staging remote* in pipeline, do

    git push staging feature:master

here:
- `staging` is the target *remote*
- `feature:master` specifies `feature` branch of local to `master` branch of *remote* 

#### pipeline downstream flow:

pipeline flow: `development` &rarr; `staging` &rarr; `production`

remember that a pipeline contains only deployed apps and not (necessarily) the current local app repository code 

so, when appropriate, you may deploy your current `master` branch as an app to a `staging` environment of the pipeline initialized earlier and see how it does on the *heroku* server and perform all kinds of tests 

once it's sufficiently mature (subjective to the app, requirements and developer), it may be promoted into a production app

    heroku pipelines:promote --remote staging 

    // alternatively, using the app name:
    heroku pipelines:promote --app tulpa-gen-staging

when an app is promoted via the CLI, the app in the next stage becomes the app that was promoted. if there are multiple apps downstream, the target app to promote to must be specified with the appropriate flags

after the promotion, both the promoted and the promoted to app exist, and they are identical, but have their own environment variables 

![a simple *heroku* pipeline](/media/blogAssets/herokuPipelines/hp-illustrations-apps in pipeline.svg)
{: style="text-align: center;"}

*fig 4: schematic of a simple __heroku__ pipeline setup* 
{: style="font-size: 80%; text-align: center;"}

#### launch deployment remotes

to launch the production app, do 

    heroku open --remote production

    // for the staging app
    heroku open --remote staging


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

##### Tulpas:
* [Tulpa - Wikipedia](https://en.wikipedia.org/wiki/Tulpa){: target="_blank"}