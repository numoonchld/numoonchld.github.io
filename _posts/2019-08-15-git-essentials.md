---
layout: post
title: git essentials
artist: BRKLYN feat. Mariah McManus
artistLink: https://www.discogs.com/artist/4500301-Mariah-McManus
track: Can't Get Enough (Unplugged)
trackLink: https://youtu.be/o2mQt_h5xRQ
tags: [git, notes]
---




## git config

#### _**unique local config for a repo:**_

[three layers](https://stackoverflow.com/a/16682441){: target="_blank"} of git username and useremail can be set ([more](https://git-scm.com/docs/git-config#_includes){: target="_blank"} with the right config settings)

- local for the repository:
```sh
git config --local user.name "local-user-name"
```

- current login user of the OS
```sh        
git config --global user.name "global-user-name"
```

- any project made on the machine 
```sh        
git config --system user.name "system-user-name"
```
you will see a `user.name` and `user.email` entries when you do 

```sh
git config --list
```

this most likely is the global setting, especially if you haven't set these to a local value before. set them specifically for the local repository using 

```sh
git config --local user.name "repo-specific-user-name"
git config --local user.email "repo-specific-login-email"
```

#### _**unset a set value - example to remove a local user.email**_

```sh
git config --local --unset user.email
```

#### _**view git config file:**_

navigate to app's root directory and review current config settings 

```sh
git config --list
```

<hr>

## rebasing

- make current commit the initial commit 
- helpful in purging long history of commits which you will never go back to

```sh
git checkout --orphan newBranch
git add -A  # Add all files and commit them
git commit
git branch -D master  # Deletes the master branch
git branch -m master  # Rename the current branch to master
git push -f origin master  # Force push master branch to github
git gc --aggressive --prune=all     # remove the old files
```

<hr>

## references 

- [ssh git push](https://stackoverflow.com/questions/8588768/how-do-i-avoid-the-specification-of-the-username-and-password-at-every-git-push){: target="_blank"}
- [git - make current commit the first commit of repo](https://stackoverflow.com/a/13102849){: target="_blank"}