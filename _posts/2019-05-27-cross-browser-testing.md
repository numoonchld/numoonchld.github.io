---
layout: post
title: cross browser testing
artist: Nigel Good
artistLink: https://www.monstercat.com/artist/nigel-good
track: One Minus Space
trackLink: https://youtu.be/top5Z2wymSY
tags: [notes, testing, web-dev, cross-browser, cross-device]
---


# cross-device testing over wi-fi

- the host machine must serve website at `0.0.0.0`
    - this makes the website available to the devices in the same network outside the machine OS

    - jekyll 

            bundle exec jekyll serve --host 0.0.0.0

    - angular 

            ng serve --host 0.0.0.0

- this can be accessed by a different device on the same router network through a browser by knowing the local IP address of the machine that's serving the website

        http://(local-ip-of-machine):(default-port)

        # example
        http://192.168.0.5:4000


- `0.0.0.0` still makes the website available on `localhost:default-port` locally on the machine
    - jekyll: `0.0.0.0:4000`
    - angular: `0.0.0.0:4200`

- default port works fine unless multiple processes try to serve through the same port
    - the old processes might have to be killed before the new one is available to the default port
    - alternative is to serve website a different port on `0.0.0.0`

    - jekyll 

            bundle exec jekyll serve --host 0.0.0.0 --port 5310

    - angular 

            ng serve --host 0.0.0.0 --port 4800


- different browsers across various devices can be used to test the website as long as they are in the same router network 

<hr>

<br>

# References:

- [jekyll local network](https://zarino.co.uk/post/jekyll-local-network/){: target="_blank"}