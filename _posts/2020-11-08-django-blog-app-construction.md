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
      - `pip3 install Pillow`
  - some understanding of django 
  
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


- reinstall django inside the venv:
  ```python3
  pip3 install django
  ```


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

### initialize apps


- new apps can be created in a main django project using the `startapp` command
- the file system of a newly started app is as follows:
  ```zsh
  |- <new-app-name>
  |   |- __init__.py
  |   |- admin.py
  |   |- apps.py
  |   |- migrations/__init__.py
  |   |- models.py
  |   |- tests.py
  |   |- views.py
  |- db.sqlite3
  ```

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

- the project dir system should look like this now:
  ```zsh
  django_blog_app
    |- django_blog_app
    |- blog
    |- users
    |- manage.py
    |- db.sqlite3
  ```

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
python3 manage.py createsuperuser
```
- to complete the setup, supply 
  - username
  - email 
  - password
  - confirm password 

- login with credentials @ `localhost:6500/admin/` to verify they work

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

##### setup app models

- when a new app is created using `startapp`,
  - a `models.py` is automatically created in the app dir
- before populating this file, think about the structure of the DB 
  - and what fields are needed 
- the `User` model is automatically created when the project is created 
  - can be imported into any file in the project with
    ```python3
    from django.contrib.auth.models import User
    ```

**`Post` model**:

- this is the django ORM model for storing blog posts in the DB 
- initialize the `Post` model in `blog/models.py`:
  ```python3
  from django.db import models
  from django.utils import timezone
  from django.contrib.auth.models import User

  class Post(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()
    date_posted = models.DateTimeField(default = timezone.now)
    author = models.ForeignKey(User, on_delete = models.CASCADE)
  ```

**`Profile` model**:
- extends the built-in `User` class ORM model 
  - to accomodate an Profile picture
- initialize the `Profile` model in `user/models.py`:
  ```python3
  from django.db import models
  from django.contrib.auth.models import User

  class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    image = model.ImageField(default='default.jpg',upload_to='profile_pics')
  ```

##### register with admin page

- upon registering the models within `admin.py` file
  - they before available on the admin dashboard for manual CRUD operations

- register the `Post` model in `blog/admin.py` file
  ```python3
  from django.contrib import admin
  from .models import Post

  admin.site.register(Post)
  ```


- register the `Profile` model in `users/admin.py` file
  ```python3
  from django.contrib import admin
  from .models import Profile

  admin.site.register(Profile)
  ```

##### updating DB

- prepare and make migrations 
  ```zsh
  python3 manage.py makemigrations
  python3 manage.py migrate
  ```
 
##### django signals 

- by default, the extended `Profile` model is not automatically created when a new `User` account is created 
- to set up automatic `Profile` creation and updation that follows the `User` model, do the following:
  - create a file called `signals.py` in `users` app dir, i.e. `users/signals.py`
  - then add the following lines of code in it 
    ```python3
    from django.db.models.signals import post_save
    from django.contrib.auth.models import user
    from django.dispatch import receiver
    from .models import Profile

    @receiver(post_save, sender = User)
    def create_profile(sender, instance, created, **kwargs):
      if created:
        Profile.objects.create(user = instance)

    @receiver(post_save, sender = User)
    def save_profile(sender, instance, **kwargs):
      instance.profile.save
    ```

  - then, add the `ready` function to `users/apps.py` under the class `UsersConfig(...)`:
    ```python3
    class UsersConfig(AppConfig):
        name = 'users'

        def ready(self):
            import users.signals
    ```

### user registration page 

### login and logout system 

### user profile 
 
### image storage system

### blog pages 

- we need the following pages to be handled by the blog app
  - *blog home*: list of all blog posts
  - *create
 

### post create, update and delete
 
### pagination and filtering
 
### password reset email 
 
 


# further reading

- `$ django-admin` in zsh lists all django sub-commands







