---
layout: post
title: django blog app construction (w-i-p)
date: 2020-11-08
updated: 2020-11-12
artist: Kalandra
artistLink: https://www.instagram.com/KalandraMusic/
track: Virkelighetens Etterklang
trackLink: https://youtu.be/KmdYc-V86yI
tags: [notes, django, python, blog-app, blog, jinja, crispy-forms, tutorial]
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
    Note the parenthesis entity at the left-end offsetting the CLI prompt
  </figcaption>
</figure>

- reinstall pip3 inside the venv:
  ```zsh
  pip install --upgrade pip
  ```

- reinstall django inside the venv:
  ```zsh
  pip3 install django
  ```

- install pillow 
  ```zsh
  pip3 install Pillow
  ```

- install crispy-forms 
  ```zsh
  pip3 install django-crispy-forms
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

- first check the app's `apps.py` file to get class-name slug
  - usually the following `class`es
    ```python3
    # blog/apps.py

    class BlogConfig(AppConfig):
      name = 'blog'
    ```

  - and 
    ```python3
    # users/apps.py

    class UsersConfig(AppConfig):
      name = 'users'
    ```

- registration format:
  ```python3
  '<app-name-in-apps.py-class>.apps.<class-name-in-apps.py>',
  ```

- registration location: 
  - under `INSTALLED_APPS` entry in `settings.py` file, add the following lines:
    ```python3
    'blog.apps.BlogConfig',
    'users.apps.UsersConfig',
    ```

- adding newly created apps to `INSTALLED_APPS` list in `settings.py` enables the apps' models being picked up by django

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
- doesn't update the actual DB, only stages changes 

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

- in the python shell:

  ```python3
  from django.contrib.auth.models import User
  User.objects.filter(is_superuser=True)
  usr = User.objects.get(username=<superuser-name-output-above>)
  usr.set_password('<new-password>')
  usr.save()
  ```

##### setup models (M of M-V-T)

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
  # blog/models.py

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
  - to accommodate blogger's Profile picture
- initialize the `Profile` model in `user/models.py`:
  ```python3
  # user/models.py

  from django.db import models
  from django.contrib.auth.models import User

  class Profile(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics')
  ```

##### register with admin page

- upon registering the models within `admin.py` file
  - they become available on the admin dashboard for manual CRUD operations

- register the `Post` model in `blog/admin.py` file
  ```python3
  # blog/admin.py

  from django.contrib import admin
  from .models import Post

  admin.site.register(Post)
  ```


- register the `Profile` model in `users/admin.py` file
  ```python3
  # users/admin.py

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
    # users/signals.py

    from django.db.models.signals import post_save
    from django.contrib.auth.models import User
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
    # users/apps.py

    class UsersConfig(AppConfig):
        name = 'users'

        def ready(self):
            import users.signals
    ```

### the view-template system (V-T of M-V-T)

- templates are HTML files for the final render view 

- each route gets its own template 
  - routes are assigned templates and template content handlers in the `urls.py` file

- the project globally and each app locally has a `urls.py` file

- it is a good idea to map out the paths of a web app
  - before getting into programming the `urls.py` file

<figure>
  <img class="plot mx-auto text-center img-fluid" src="https://github.com/numoonchld/numoonchld.github.io/blob/master/media/blogAssets/django-blog-app/django-blog-app-schematics-routes.png?raw=true" alt="App Routes Needed">
  <figcaption>Routes Needed for this Blog App <br> (suggested order of creation in the right) </figcaption>
</figure>


- django supports template inheritance
  - i.e. one base template can be derived from over and over to make child templates 

- as django projects grow in size 
  - it's often more convenient to have all the templates in one place 
  - rather than hunting for them within multiple apps
  - with a single line change to our `settings.py` file, we can do this

- update the 'DIRS' config under TEMPLATES as follows
  ```python3
  # settings.py
  ...
  import os
  ...
  TEMPLATES = [
      {
          ...
          'DIRS': [os.path.join(BASE_DIR, 'templates')],
          ...
      },
  ]
  ```
  - which specifies that:
    - in addition to looking for an app-level templates directory,
    - the Django template loader should also look for a project-level templates directory

- create a `templates` dir in the project root dir
  ```zsh
  django_blog_app
    |- django_blog_app
    |- blog
    |- users
    |- templates
    |- manage.py
    |- db.sqlite3
  ```

- styling classes for forms can be set in `forms.py`
  - but `forms.py` is not for applying styles, but to handle the forms backend 
- so do all styling in templates

##### blog home page setup

- each path defined in the `urls.py` needs a view handler
- so first, we will look at how to do this for the home page 

- start with view handler file - `views.py`: add the following lines 
  ```python3
  # blog/views.py

  #import built in class based view
  from django.views.generic import ListView 

  # import the model Post from models.py
  from .models import Post

  # Create your views here.
  class PostListView(ListView):
      model = Post
  ```
- create an app level `urls.py` and add the following code 
  ```python3
  # blog/urls.py
  from .views import PostListView

  urlpatterns = [
      path('',PostListView.as_view(), name="blog-home")
  ]
  ```

- ensure the `include` imports in the project `urls.py` file
  - then add `blog.urls` to the `urlpatterns` list with `include` as follows
    ```python3
    # urls.py

    from django.urls import path, include 

    urlpatterns = [
      ...
      path('',include('blog.urls'))
    ]

    ```

- create a `base.html` in the project-level `templates` folder
- then go create a folder called `blog` in the same dir
  - in that, make a file called `post_list.html`

- fill the `base.html` file with the Bootstrap 4 Starter Template 
  - [bootstrap 4 starter template](https://getbootstrap.com/docs/4.5/getting-started/introduction/#starter-template)
  - then add a [navbar from bootstrap](https://getbootstrap.com/docs/4.5/components/navbar/) as well

- so basically, 
  1. create **M**odels first in `models.py`
  2. create **V**iew handles in `views.py`
  3. create **T**emplates in `templates/<app-dir>` 

- now go to @ `localhost:6500` in your browser

<figure>
  <img class="plot mx-auto text-center img-fluid" src="https://github.com/numoonchld/numoonchld.github.io/blob/master/media/blogAssets/django-blog-app/django-app-bootstrap-base-template.png?raw=true" alt="Bootstrap Base Template">
  <figcaption>Bootstrap Base Template</figcaption>
</figure>

##### set up crispy-forms

- crispy-forms is a plugin to apply bootstrap styling to forms automatically

- third party django app that makes working with forms easier

- allows adding simple tags in template files 
  - to add bootstrap styling
  - use other CSS frameworks also

- add following code in `settings.py`
  ```python3
  ...
  INSTALLED_APPS = [
    'crispy_forms',
    ...
  ]
  ...
  ```

- set the CSS framework to use 
  - in `settings.py` at the very end of file, add following
    ```
    CRISPY_TEMPLATE_PACK = 'bootstrap4'
    ```

### user registration page setup


- a `UserCreationForm` form-object exists with in django to generate the form necessary for new-user-creation
- the way to use it is to 
  - import it as a class from `django.contrib.auth.forms` 
  - then pass it as a context into an appropriate template


- start by building the `forms.py` file with the `UserCreationForm` 
  - extend it with the email field 
    ```python3

    # users/forms.py
    
    from django import forms
    from django.contrib.auth.models import User
    from django.contrib.auth.forms import UserCreationForm

    class UserRegisterForm(UserCreationForm):
        email = forms.EmailField()

        class Meta:
            model = User
            fields = [
                'username',
                'email',
                'password1',
                'password2',
            ]
    ```

- then add the following logic in the given path
  ```python3
  # users/views.py

  from django.shortcuts import render, redirect
  from django.contrib import messages
  from .forms import UserRegisterForm

  # Create your views here.
  def register(request):
      if request.method == 'POST':
          form = UserRegisterForm(request.POST)
          if form.is_valid():
              form.save()
              return redirect('blog-home')
      else:
        form = UserRegisterForm()

      return render(request, 'users/register.html', {'form':form})
  ```

  - create  `templates/users` dir to hold the user registration template
    - then, create a template file called `register.html` 

  - then ensure the project's `urls.py` has the following lines:
    ```python3
    from django.contrib import admin
    from django.urls import path, include
    from users import views as user_views

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', include('blog.urls')),
        path('register/', user_views.register, name='register')
    ]
    ```

- then add the following code into `templates/users/register.html`           
  {% raw %}
  ```HTML
  {% extends "base.html" %}
  {% load crispy_forms_tags %}

  {% block content %}

  <div class="container">

      <form method="POST">

          {% csrf_token %}

          <fieldset class="form-group">

              <legend class="border-bottom">
                  Join Today
              </legend>

              {{ form | crispy }}

          </fieldset>

          <div class="form-group">

              <button class="btn btn-primary" >
                  Sign Up
              </button>

          </div>

      </form>

  </div>

  {% endblock content %}
  ```
  {% endraw %}

- load @`localhost:6500/register` in browser 

##### setting up flash messages

- there are different types of built-in messages in django 
  - bootstrap alert types match django's message types 1-1, so use django message tags in bootstrap classes
  - the corresponding styles are 
    - message.debug
    - message.info
    - message.success
    - message.warning
    - message.error

- the message handlers in this case has to be done in the form POST data handler 
  - which is set in the `views.py` file
    
  - in `users/views.py` setup these lines of code
    ```python3

    ...
    if form.is_valid():
      form.save()

      # to generate message
      username = form.cleaned_data.get('username')
      messages.success(request, "Account created for {}".format(username))
                  
      return redirect('blog-home')
    ...
    ```

- in the base template, a placeholder has to be set for showing flash messages 

- in `templates/base.html`, add the following logic:
  {% raw %}
  ```HTML
  ...
  </header>

  {% if message %}

    {% for message in messages %}
      <div class="alert alert-{{ message.tags }}">
        {{ message }}
      </div>
    {% endfor %}

  {% endif %}

  {% block content %}
  ...
  ```
  {% endraw %}

### login and logout system 

- we need to create a login page 
  - for users to login
  - so they can create, edit and delete blog posts
- django has built-in functionality to achieve login and logout 
  - django provides some views for logins and logouts

- import these views in the project `urls.py` directly 

  ```python3
  # urls.py

  ...
  from django.contrib.auth import views as auth_views

  urlpatterns = [
    ...
    path('login/',auth_views.LoginView.as_view(), name='login')
    path('logout/',auth_views.LogoutView.as_view(), name='logout')
  ]
  ```

- these views are Class-based views 
  - will handle forms and logic
  - however, will not handle templates 
  - but look for template files in a folder called `registration` 


- so  we'll create the registration templates 
  - create a folder named `registration` in templates 
  - then create a file called `login.html`
  {% raw %}
  ```html
  {% extends "base.html" %}
  {% load crispy_forms_tags %}

  {% block content %}

  <div class="container">

      <form method="POST">

          {% csrf_token %}

          <fieldset class="form-group">

              <legend class="border-bottom">
                  Log In 
              </legend>

              {{ form | crispy }}

          </fieldset>

          <div class="form-group">

              <button class="btn btn-primary" >
                  Login
              </button>

          </div>

      </form>

      <div class="form-group">

          <small class="text-muted">
              Need an account? <a href="{% url 'register' %}"> Sign Up Now </a>
          </small>

      </div>


  </div>

  {% endblock content %}
  ```
  {% endraw %}


##### setup login redirect

- then, in `settings.py`, configure the default value of login redirect url

  ```python3
  # settings.py

  LOGIN_REDIRECT_URL = 'blog-home'

  ```

##### setup logout flow

- add the following path in the project `urls.py`

  ```python3
  # urls.py

  ...


  urlpatterns = [
    ...
    path('logout/',auth_views.LogoutView.as_view(template_name="registration/logout.html"), name='logout'),
  ]
  ```

- the `template_name` has to be specified because the default logout redirect page is the admin panel logout 
  - even if a `logout.html` template exists

- create the `logout.html` file in the `templates/registration` folder with the following code

{% raw %}
```html
{% extends "base.html" %}

{% block content %}

<div class="container">

    <h2 class="mt-5">You've been logged out</h2>

    <div class="form-group">

        <small class="text-muted">
            Need an account? <a href="{% url 'login' %}"> Sign Up Now </a>
        </small>

    </div>

</div>

{% endblock content %}


```
{% endraw %}

##### registration page redirect

- link the login page in the register page 
  - to allow access to login form on the register page 
  - in the `register.html`
    ```html
    ...
      <div class="form-group">

      <small class="text-muted">
          Need an account? <a href="{% url 'login' %}"> Sign Up Now </a>
      </small>

      </div>
    ...
    ```

### user profile 
 
### image storage system

### blog pages 

- we need the following pages to be handled by the blog app
  - *blog home*: list of all blog posts
  - *new post*: create a new post by the logged in user
  - *update post*: edit a post by logged in user
  - *delete post*: delete a post by logged in user

 
### pagination and filtering
 
### password reset email 
 
 


# further reading

- `$ django-admin` in zsh lists all django sub-commands
- [django templates folder structure](https://learndjango.com/tutorials/template-structure)







