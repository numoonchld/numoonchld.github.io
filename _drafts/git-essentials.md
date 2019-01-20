---
layout: post
title: git essentials
artist: 
artistLink: 
track: 
trackLink: 
tags: [git, notes]
---




### git config:



<br>
##### _**unique local config for a repo:**_

[three layers](https://stackoverflow.com/a/16682441){: target="_blank"} of git username and useremail can be set ([more](https://git-scm.com/docs/git-config#_includes){: target="_blank"} with the right config settings)

- local for the repository:

        git config --local user.name "local-user-name"

- current login user of the OS
        
        git config --global user.name "global-user-name"

- any project made on the machine 
        
        git config --system user.name "system-user-name"

you will see a `user.name` and `user.email` entries when you do 

    git config --list

this most likely is the global setting, especially if you haven't set these to a local value before. set them specifically for the local repository using 

    git config --local user.name "repo-specific-user-name"
    git config --local user.email "repo-specific-login-email"


<br>
##### _**unset a set value - example to remove a local user.email**_

    git config --local --unset user.email


<br>
##### _**view git config file:**_
navigate to app's root directory and review current config settings 

    git config --list

<br>


<hr>

### git remote: