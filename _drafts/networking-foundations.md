---
layout: post
title: networking foundations - notes 0
artist: 
artistLink: 
track: 
trackLink: 
tags: [networking, notes]
---

## linux web servers

- 80% of public internet servers use some flavor of LINUX
    - *linux* is free open-source OS
    - free-as-in-beer (costs someone else for the development)
    - free-as-in-speech (conditional usage rights)

- there are many different distributions of LINUX
    - free-as-in-speech caused a lot of varied versions 

- popular distributions
    - *RedHat Enterprise*: 
        - not free-as-in-beer 
        - licensing fee applies 
        - support provided from RedHat
    - *Ubuntu*:
        - free-as-in-beer
        - server versions, laptop versions, mobile versions 
        - consistently updated 
    - *Debian*: parent of Ubuntu
        - stable and reliable, 
        - some machines have been running this for years
        - update cycles are very slow compared to ubuntu and such

- linux distributions and target markets
    - *redhat*: large enterprise/corporate customers
    - *ubuntu*:  ease of use on servers, desktops, laptops and mobiles
    - *linux mint*: desktop user with proprietary media support
    - *core OS*: clusterized, containerized deployment of apps

### vagrant - local server with VMBox

- use vagrant to mock a remote web server 
    - along with VMBox

- [init](https://www.vagrantup.com/intro/getting-started/index.html){: target="_blank"} a vagrant VMBox

OR 

- make a [Vagrantfile](https://www.vagrantup.com/docs/boxes.html){: target="_blank"} like here
- navigate to vagrant config file in terminal 

THEN 

- do `vagrant up` to boot up a *linux* in the terminal CLI
- do `vagrant ssh` to log-in to this server

### linux file system

- root directories
    - *home*: user home dir
    - *etc*: configuration files 
    - *var*: files that grow in size over time, i.e. system and app logs
    - *bin*: executable binaries of apps and programs accessible to all users i.e. `ls`
        - includes those needed for boot-up
    - *sbin*: like *bin* but for root user for sys admin and maintenance
    - *lib*: libraries that support the *bin* and *sbin* executables 
    - *usr*: for user programs not necessarily required for boot-up

- `$PATH`
    - notice that one doesn't need to type out the full path to call `ls` like `/bin/ls` to use the `ls` command
    - *linux* provides a shortcut system with-in the `$PATH` variable
    - `echo $PATH` outputs `/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games`
    - when `ls` and such commands are input at the CLI, 
        - the paths in `$PATH` variable are scanned to find a match and run 
        - if nothing is found, an error is throw

### linux packages

- typically, apps for windows and macOS are bought online or a physical store
- linux apps are very rarely available this way
- apps are installed from package sources in linux
    - see available sources: `cat /etc/apt/sources.list`
    - each source here approves and releases packages in their own way
    - varies across distributions as well
- keep software up-to-date to reduce security risks
    - most *linux* distributions do not update automatically 
    - the update should be run periodically
    - however, sometimes an update might break existing functionality of your final app

##### `apt-get` 
- is a system utility for package related functionality
- explore `man apt-get` to learn more
    - installs new packages 
        - [explore available packages for ubuntu](packages.ubuntu.com){: target="_blank"}
    - purges packages
    - upgrades distribution etc.

- `sudo apt-get autoremove`: remove packages that were automatically installed to satisfy dependencies for other packages and are now
        no longer needed

- install finger using `sudo apt-get install finger`

- `python3 --version`: view version of currently installed *python3* 

##### to update source list:
- `sudo apt-get update`
- this goes though the repositories list in `sources.list` file in `/etc`
- only updates the available packages list
- this doesn't update any software on the machine  

##### to actually update existing packages:
- `sudo apt-get upgrade`
- while setting up a new machine, an upgrade is pretty harmless
- when the app is serving content to end-users, an upgrade usually breaks existing functionality 
    - the upgrade must first be tested in a non-production environment to ensure app works correctly 



<br>
<hr>
<br>

## linux security

##### rule of least privilege: 
- an app/user gets only gets enough permissions needed to do it's job 
- nothing extra, cap other permissions

##### superuser:
- every *linux* installation has a *root* user
- this is not readily accessible, even when logged in as the only admin (non-guest) account
- the superuser privileges are invoked only for certain commands
- deters attackers by having an isolated user with higher system privileges
- `sudo` command typically simulates `root` user privileges in a regular admin account
    - necessary to install new packages for additional functionality 

##### FIRST THINGS:
- limiting superuser privilege `sudo` to server accounts 
    - has to be one of the very first things when a web server is setup
    - many web-server service providers do it by default
    - Vagrant configures the VMBox with this by default
    - check if it exists first to ensure this layer of security

- `su` command switches the entire context to `root` superuser
    - no safety net

### linux users

- user information is stored in `/etc/passwd` 
    - `cat /etc/passwd` displays this info
    - info fields:
        - `username:encrypted-passwd:userID:groupID:user-desc:home-dir:default-shell`
    - for `root` user rules:
        - userID: `0`
        - groupID: `0`
        - home-dir: `/root`
        - default-shell: `/bin/bash`

- always disable remote login for `root`
    - common security measure, 
    - only allow login as another user that has `sudo` abilities
    - Vagrant does this automatically, but not every service provider does this 
    - always check for this measure

- create a new user: `sudo adduser student`
    - create password
    - provide additional info asked for 
    - then login as that user through vagrant (having logged out of other sessions)
    - `ssh student@127.0.0.1 -p 2222`
        - `ssh`: command to connect through ssh remotely
        - `student@127.0.0.1`: user@ip-address
            - `127.0.0.1`: localhost
        - `-p 2222`: vagrant's port for incoming connections 
    - this will be the server user account 
    - the default `vagrant` account will be the local machine

- see list of `sudo` users:
    - `sudo cat /etc/sudoers`
    - in ubuntu:
        - `sudo ls /etc/sudoers.d`
        - lists all sudo users

- give `sudo` privileges to the newly created `student` user 
    - `student` user should be just like `vagrant` user
    - `sudo cp /etc/sudoers.d/vagrant /etc/sudoers.d/student`
    - `sudo nano /etc/sudoer.s/student`
        - change `vagrant` to `student`

### linux key based authentication

##### public key encryption:
- combination of a private key and a public key
- the key-pair is generated on the local machine
    - NOT on the server
    - DO NOT share private key with anyone
    - if key-pair is generated on the server, private key will be compromised 

##### key-pair generation and public key installation:
- do not generate this in the server's user account 
    - generate on local machine terminal and install public key on server
- app to use: `$ ssh-keygen`
    - enter dirname to write to 
        - `~/.ssh/linuxCourse`
    - set key-pair passphrase
- this generates two files 
    - an identification private key 
    - and a `.pub` public key that goes on the server
- installing public key on server:
    - login to the server's user account
    - create a new file that stores all public keys associated with server
        - `touch .ssh/authorized_keys`
    - then, open in `nano`
        - `nano .ssh/authorized_keys` 
    - open the `.pub` file generated by `ssh-keygen` on the local machine
    - copy the (very, very long) key and paste it in this newly created file
        - save and exit `nano`
    - setup file permissions for the file with public keys and the dir it's in :
        - `chmod 644 .ssh/authorized_keys`
        - `chmod 700 .ssh`
        - `chmod` command with appropriate parameters sets/changes mode of file/folder 
- logging in from local to server account using the key-pair
    - `ssh student@localhost -p 2222 -i ~/.ssh/linuxCourse`
        
            
##### application to client-server authentication scenario: 
- server sends random message to client
- client encrypts message with private key
- encrypted message is sent back to server
- server will decrypt message with public key
- if decrypted message is the same as the initially sent message, then client authentication is successful


## references

- [reading current *chmod* octets for files and folders](https://unix.stackexchange.com/questions/46915/get-the-chmod-numerical-value-for-a-file){: target="_blank"}