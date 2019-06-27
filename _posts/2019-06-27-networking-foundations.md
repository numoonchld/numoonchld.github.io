---
layout: post
title: networking foundations - notes 0
artist: Sander van Doorn 
artistLink: https://www.discogs.com/artist/183267-Sander-van-Doorn
track: Apple (Marcus Schossow Remix)
trackLink: https://youtu.be/Ska8KPbjrx4
tags: [networking, notes, ubuntu, ssh, vagrant, web-server, security ]
---

# contents

1. [virtual web-server](#virtual-web-server)
2. [linux web servers](#linux-web-servers)
3. [linux security](#linux-security)
4. [apache](apache-web-server-install)
5. [references](#references)
6. [reading](#reading)

<hr>

# virtual web-server

<br> 

### vagrant and VMBox

- use vagrant along with VMBox to mock a remote web server 
    - a virtual machine inside your local machine acts the web-server
    - good for development phase, isolate all development to the web-server
- install vagrant and VMBox on your local machine 

- create a base working directory for this project
- open terminal and navigate to this folder
- [init](https://www.vagrantup.com/intro/getting-started/index.html){: target="_blank"} a vagrant VMBox
    - `vagrant init ubuntu/trusty64` installs a ubuntu (64-bit) trusty tahr VMBox 


##### initializing from a Vagrantfile:
- create a base working directory for this project
- make a [Vagrantfile](https://www.vagrantup.com/docs/boxes.html){: target="_blank"} in this directory
    - configure the Vagrantfile to install *linux* 
- open terminal and navigate to this folder
- do `vagrant up` to boot up a *linux* in the terminal CLI
- do `vagrant ssh` to log-in to this server

##### handy vagrant commands

- `vagrant status`: shows VMBox status
- `vagrant suspend`: puts VMBox to sleep/hibernate 
- `vagrant up`: boots VMBox
- `vagrant ssh`: logs into VMBox as the default vagrant user
- `vagrant halt`: shuts down the VMBox
- `vagrant destroy`: resets the VMBox to fresh install (of *linux*, in this case)

<hr>

# linux web servers

- 80% of public internet servers use some flavor of *linux*
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
        - stable and reliable
        - some machines have been running this for years
        - update cycles are very slow compared to ubuntu and such

- linux distributions and target markets
    - *redhat*: large enterprise/corporate customers
    - *ubuntu*:  ease of use on servers, desktops, laptops and mobiles
    - *linux mint*: desktop user with proprietary media support
    - *core OS*: clusterized, containerized deployment of apps

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
        - if nothing is found, an error is thrown

### linux packages

- typically, apps for windows and macOS are bought online or a physical store
- linux apps are very rarely available this way
- apps are installed from package sources in linux
    - see available sources: 
        - `cat /etc/apt/sources.list`
    - each source here approves and releases packages in their own way
    - varies across distributions as well
- keep software up-to-date to reduce security risks
    - most *linux* distributions do not update automatically 
    - the update should be run periodically
- however, sometimes an update might break existing functionality of production app

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

##### to update all existing packages:
- `sudo apt-get upgrade`

- while setting up a new machine, `upgrade` is relatively harmless
- when the app is in production, serving content to end-users 
    - an upgrade usually breaks existing functionality 
    - package upgrade must first be tested in a non-production environment 
    - deploy app with upgraded packages after thorough testing

<hr>


# linux security

<br>

##### rule of least privilege: 
- an app/user gets only gets enough permissions needed to do it's job 
- nothing extra, cap other permissions

##### superuser:
- every *linux* installation has a *root* user
- this is not readily accessible, even when logged in as the only admin (non-guest) account
- the superuser privileges are invoked only for certain commands 
    - with a `sudo` prefix
- deters attackers by having an isolated user with higher system privileges
- `sudo` command typically simulates `root` user privileges
    - necessary to install new packages for additional functionality 
- admin accounts are `sudo` enabled by default 
    - new accounts should be verified to have sudo privileges 
    - check the sudoers list

##### FIRST THINGS:

- limiting superuser privilege `sudo` to server accounts 
    - has to be one of the very first things when a web server is setup

- many web-server service providers do it by default
    - Vagrant configures the VMBox with this by default

- `su` command cna be used to switch the entire context to `root` superuser
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
    - common security measure
    - only allow login as another user that has `sudo` abilities
    - Vagrant does this automatically, but not every service provider does this 
    - always check for this measure

- to create a new user 'student': 
    - `sudo adduser student`
    - make new password
    - provide additional info asked for 

- login as 'student' through vagrant
    - `ssh student@127.0.0.1 -p 2222`
        - `ssh`: command to connect through SSH remotely
        - `student@127.0.0.1`: user@ip-address
            - `127.0.0.1`: localhost
        - `-p 2222`: vagrant's port for incoming connections 

- see list of `sudo` users:
    - `sudo cat /etc/sudoers`
    - additionally, in ubuntu:
        - `sudo ls /etc/sudoers.d`
        - lists all sudo users

- to give `sudo` privileges to the newly created 'student' user 
    - goal: `student` user should be just like `vagrant` user
    - copy vagrant's sudoer file
        - `sudo cp /etc/sudoers.d/vagrant /etc/sudoers.d/student`
    - edit file: `sudo nano /etc/sudoers.d/student`
        - change `vagrant` to `student` in file

### linux file permissions 

- `ls -al` lists all the files in a dir with additional info
    - the first column has 10 characters
        - eg: '`drwxr-xr-x`', '`-rw-r--r--`'
    - the first character: directory `d` or file `-`
    - the next nine are three separate sections of threes:
        - first section: *owner*
        - second: *group*
        - third: *everyone*
    - in each section: 
        - first char is read permission: `r`
        - second for write: `w`
        - third is execute: `x`
        - `-`: that permission in not granted for that section 
    - so, in above eg: `drwxr-xr-x` == `d` + `rwx` + `r-x` + `r-x`, 
        - first char: `d` 
            - indicating a directory
        - then, first section of three: `rwx` 
            - *owner* can read, write and execute
        - both of the next two sections of threes are : `r-x`
            - *group* and *everyone* can only read and execute, but not write 
    - in eg: `-rw-r--r--` == `-` + `rw-` + `r--` + `r--`
        - first char is `-`: indicates it's a file
        - next is `rw-`: *owner* can read and write, but not execute
        - followed by `r--`: *group* and *everyone* can only read, nothing else

##### *owner* and *group*

- the third and the fourth columns on the output of `ls -al` indicates *owner* and *group* 
    - when an *owner* is created (i.e. a new user) it is the *group* also by default
    - use `ls -al` while in parent dir of the file/dir to see it's *owner* and *group*

- `root` is the *owner* for core *linux* files
    - for such files, only the root has `w` (write) permissions
    - *group* and *everyone* can only read and execute, not write

##### octal permissions

- permission keys:
    - `r` == 4 (read)
    - `w` == 2 (write)
    - `x` == 1 (execute)

- to compute the octal for each login entity, simply add them up
    - `rwx` == 4 + 2 + 1 == 7
    - `r-x` == 4 + 0 + 1 == 5
    - `r--` == 4 + 0 + 0 == 4

- to set the permissions of the `.ssh` folder, for instance: 
    - `chmod 644 ~/.ssh`
    - sets *owner* permissions to 6: `rw-`
    - *group* to 4: `r--`
    - *everyone* to 4: `r--`

##### chmod and chown

- `chmod`: change the *mode* of file/dir (*mode* == permission mode)
    - `chmod 655 filename.ext`

- `chown`: change *owner* 
    - `chown root filename.ext`

- `chgrp`: change *group*  
    - `chgrp vagrant filename.ext`


### linux key based login

##### public key encryption:
- combination of a private key and a public key
- the key-pair is generated on your local machine
    - NOT on the server
    - DO NOT share private key with anyone
    - if key-pair is generated on the server, private key will be compromised 

##### key-pair generation and public key installation:
- do not generate this in the server's user account 
    - generate on local machine terminal and install public key on server
- app to use: `$ ssh-keygen` on your local machine (not in the VMBox!)
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
- after confirming this works, disable password based logins
    - open `/etc/ssh/sshd_config` with `nano`
    - scroll to line `PasswordAuthentication` and change following text to `no`
    - save and exit nano
    - restart `ssh`: `sudo service ssh restart`
        - this disables password login
        - forces all users to login only with a key-pair       
            
##### application to client-server authentication scenario: 
- server sends random message to client
- client encrypts message with private key
- encrypted message is sent back to server
- server will decrypt message with public key
- if decrypted message is the same as the initially sent message, then client authentication is successful

### linux firewall

- a web-server while up and running, is talking to other devices on the internet
    - responding to HTTP requests
    - responding to database queries
    - sending and receiving email
    - handing SSH sessions

- there are several types of servers:
    - email servers 
    - web application servers
    - chat servers
    - generally, the difference is simply the installed software and the ports opened for those softwares

##### ports

- each web-server interaction type is provided a port on the firewall application
    - applications associated with interactions are configured to responded at specific ports
    - example of default port numbers for application request type: 
        - HTTP - `port 80` 
        - HTTPS: `port 443`
        - SSH: `port 22`
        - FTP: `port 21`
        - POP3: `port 110`
        - SMTP: `port 25`

- the rule of least privileges for ports:
    - a web server can listen to all ports at the same time
        - doesn't mean it should be 
    - only ports explicitly needed by the desired application should be listened to 
        - the rest should be configured to deny connections 
        - a firewall in the server helps with this
        - `ufw` is the preinstalled firewall in *ubuntu* 

##### ufw (Uncomplicated Fire Wall)

- `ufw` in ubuntu is turned off by default
    - `sudo ufw status` : provides status of firewall
    - good practice to activate firewall after configuring it 
        - you might actively be administering through an SSH connection to the web-server  
        - activating firewall might disrupt it if rules are not configured correctly beforehand

- adding rules to firewall (firewall configuration):
    - to enforce rule of least privilege, start by blocking all incoming connections
        - `sudo ufw default deny incoming`
    - allow all outgoing by default
        - `sudo ufw default allow outgoing`
    - allow SSH
        - `sudo ufw allow shh`
    - allow a port: for eg. allow `vagrant ssh`
        - `sudo ufw allow 2222/tcp`
    - allow HTTP
        - `sudo ufw allow www`

- activate firewall and check status:
    - `sudo ufw enable`
    - `sudo ufw status`


<hr>

# apache web server install

- 47% of today's web-servers are driven by *apache*

- to install apache in the vagrant configured *ubuntu* machine, run in the terminal:
    - `sudo apt-get install apache2`
- the apache web-sever starts automatically after install
    - to restart: `sudo service apace2 restart`

- go to `localhost:8080` on your local machine's browser and verify that the apache home page loads


<hr>

# references

- [reading current mode octets for files and folders](https://unix.stackexchange.com/questions/46915/get-the-chmod-numerical-value-for-a-file){: target="_blank"}
- [Well Known Ports as defined by IANA](https://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-sg-en-4/ch-ports.html){: target="_blank"}
- [IANA ports spec sheet](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?&page=2){: target="_blank"}
- [uncomplicated fire wall](https://wiki.ubuntu.com/UncomplicatedFirewall){: target="_blank"}


# reading

- [firewall - etymology](https://www.merriam-webster.com/words-at-play/word-origins-computer-terms/firewall){: target="_blank"}