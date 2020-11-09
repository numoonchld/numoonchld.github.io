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
    - pillow installed
  - some understandng of django 
  
# process

### install django

```zsh
pip3 install django
python3 -m django --version
```

### create new project 

```zsh
django-admin startproject django_blog_app
cd django_blog_app
```

- file structure of so generated project
```zsh
django_blog_app #project root dir
|- django_blog_app #project's root app 
|   |-__init__.py
|   |-settings.py
|   |-urls.py
|   |-wsgi.py
|- manage.py
```

- each file has its own function
  - read [this](https://docs.djangoproject.com/en/2.2/intro/tutorial01/#creating-a-project) page from the docs for more 


##### python virtual environment for django app 

- install "virtual env" and "virtual env wrapper"
```zsh
pip3 install virtualenv virtualenvwrapper
``` 

- create and activate virtual env
```zsh
python3 -m venv django_blog_app
source django_blog_app/bin/activate
```

<figure>
  <img class="plot mx-auto text-center img-fluid" src="https://github.com/numoonchld/numoonchld.github.io/blob/master/media/blogAssets/django-blog-app/setting-up-venv.png?raw=true" alt="Django Development Server Launch Screen">
  <figcaption>
    Note the parenthesis entity at the left end offsetting the CLI prompt
  </figcaption>
</figure>

### run dev-server

```zsh
python3 manage.py runserver 6500
# default port is 8000
```

- access django dev-server @ `127.0.0.1:6500` on your browser
  - alternatively @ `localhost:6500`


<figure>
  <img class="plot mx-auto text-center img-fluid" src="https://www.freecodecamp.org/news/content/images/2020/02/DjangoRocket.gif" alt="Django Development Server Launch Screen">
  <figcaption>
    Django Development Server Launch Screen @ <code>localhost:6500</code>
  </figcaption>
</figure>


- to stop, do `Ctrl+C` in terminal 

### init apps

##### initialize the blog app 
```zsh
python3 manage.py startapp blog
```

##### initialize the user app
```zsh
python3 manage.py startapp users
```

<figure>
  <img class="plot mx-auto text-center img-fluid" src="https://github.com/numoonchld/numoonchld.github.io/blob/master/media/blogAssets/django-blog-app/django-blog-app-schematics-birds-eye-view.png?raw=true" alt="Django Blog Structure">
  <figcaption>Bird's Eye View of the Django Blog App</figcaption>
</figure>

##### register both apps 

- the registration is done in the `django_blog_app/settings.py` file

- first check the app's `apps.py` file to get `<app-name>Config` slug
  - usually these `class`es
  ```python3
  class BlogConfig(AppConfig):
    name = 'blog'
  ```
  - and 
  ```python3
  class UsersConfig(AppConfig):
    name = 'users'
  ```

- registration format:
  - in a new list item, add the following entry
    ```python3
    '<app-name-in-apps.py-class>.apps.<class-name-in-apps.py>Config',
    ```

- registration location: 
  - under `INSTALLED_APPS` entry in this file, add the following code:
    ```python3
    'blog.apps.BlogConfig',
    'users.apps.UsersConfig',
    ```

### setup ORM 

- **database migrations** have to be applied before creating a *superuser*

- *superuser* account is needed to access the django admin page that sits @ `localhost:6500/admin`

<figure>
  <img class="plot mx-auto text-center img-fluid" src="https://github.com/numoonchld/numoonchld.github.io/blob/master/media/blogAssets/django-blog-app/django-app-admin-login-page.png?raw=true" alt="Django Blog Structure">
  <figcaption>Django Admin Login Page</figcaption>
</figure>

##### database migrations

>>> *the very first DB migration creates the DB and adds a few default tables* 

- `auth_user` is one such table that needs to be initialized before creating the *superuser* account 

```zsh
python3 manage.py makemigrations
```
- detects changes in models and prepares updates to the DB
- doesn't update the actual DB, only prepares stages changes 

```zsh
python3 manage.py migrate
```
- actually applies the changes made in `models.py` to the DB
- the `auth_user` table is created when above is run the first time

##### create *superuser*

- the first one has to be done via the CLI 
```zsh
python3 manage.py superuser
```
- to complete the setup, supply 
  - username
  - email 
  - password
  - confirm password 

##### resetting superuser password from CLI (if password is forgotten)

```zsh
python3 manage.py shell
```
```python3
from django.contrib.auth.models import User
User.objects.filter(is_superuser=True)
usr = User.objects.get(username=<superuser-name-output-above>)
usr.set_password('<new-password>')
usr.save()
```

##### setup the django database

- initialize the blog model
 
### blog home page 
 
### user registration page 
 
### login and logout system 
 
### user profile 
 
### image storage system

### post create, update and delete
 
### pagination and filtering
 
### password reset email 
 
 


# further reading

- `$ django-admin` in zsh lists all django sub-commands







