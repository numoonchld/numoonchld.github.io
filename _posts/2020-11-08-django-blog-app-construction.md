---
layout: post
title: django blog app construction
date: 2020-11-08
updated: 2020-11-08
artist: The Chainsmokers ft. Halsey
artistLink: https://www.thechainsmokers.com/
track: Closer (T-Mass Remix)
trackLink: https://youtu.be/S-l6a34mwWw
tags: [notes, django, python, blog-app, blog]
---

# overview

- this is a (b)log of constructing a blog-style web application with the `django` web-framework 
  - the programming language is `python`
  
- `django` is a popular framework 
  - with lots of functionality out-of-the-box 
  - makes it enjoyable to work on web-applications
  
- app goal: 
  - build a blog where different users can write different posts
- app requirements:
  - *register*: new users can create an account 
  - *login*: if account already exists, can login and update proile picture
  - *password reset*: allows forgotten password reset
  - *user profile*: display image, other details
  - *home page*: view all blog posts 
  - *blog update/delete*: if blog written by logged-in user

- construction process aims to walk through 
  - working with databses
  - authentication systems 
  - password reset email
  - django admin page
  - permission for various users 
  
- pre-requisites 
  - a decent understanding of python 
    - understanding object oriented programming well helps 
  - python3 installed on your machine (preferably macOS or Ubuntu)
    - pip3 installed 
  

# process

#### step #1: install django

```zsh
pip3 install django
python3 -m django --version
```

#### step #2: create project root dir

```zsh
django-admin startproject django_blog_app
cd django_blog_app
```

- basic project 

#### step #3: ensure running dev-server

```zsh
python3 manage.py runserver 6500
# default port is 8000
```

- access django server @ `127.0.0.1:6500` on your browser
  - alternatively @ `localhost:6500`

<img class="plot mx-auto text-center img-fluid" src="https://www.freecodecamp.org/news/content/images/2020/02/DjangoRocket.gif" alt="Django Development Server Launch Screen">

- to stop, do `Ctrl+C` in terminal 

# / further reading

- `$ django-admin` in zsh lists all django sub-commands







