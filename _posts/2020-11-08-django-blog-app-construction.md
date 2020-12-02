---
layout: post
title: django blog app construction
date: 2020-11-08
updated: 2020-12-02
artist: Kalandra
artistLink: https://www.instagram.com/KalandraMusic/
track: Virkelighetens Etterklang
trackLink: https://youtu.be/KmdYc-V86yI
tags: [notes, django, python, blog-app, blog, jinja, crispy-forms, tutorial, heroku, docker, vscode]
---

# overview

- this is a (b)log of constructing a blog-style web application with the `django` web-framework 
  - the programming language is `python`

- here is a link for the final app
  - [https://django-blog-nmc.herokuapp.com/](https://django-blog-nmc.herokuapp.com/)
  - it is hosted on heroku


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

### process overview

- setup the *models* first 
- then, figure out the routes for the app
- then for each route, setup
  - the *routing* 
  - the *view* 
  - the *template*
- make config changes in `settings.py`, `admin.py` and `models.py` as needed along the way 


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
      instance.profile.save()
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

- the routing is handled in the project globally and each app locally in the `urls.py` file 

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

**routing**
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

### registration page setup


- a `UserCreationForm` form-object exists with in django to generate the form necessary for new-user-creation
- the way to use it is to 
  - import it as a class from `django.contrib.auth.forms` 
  - then pass it as a context into an appropriate template

**form-view**
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
**view**
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

**routing**
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

**template**
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

**view**
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

**template**
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

**routing/view**
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

**template**
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

**routing**
- add the following path in the project `urls.py`

  ```python3
  # urls.py

  ...


  urlpatterns = [
    ...
    path('logout/',auth_views.LogoutView.as_view(template_name="registration/logout.html"), name='logout'),
  ]
  ```

**template**
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
              Want to login? <a href="{% url 'login' %}"> Login </a>
          </small>

      </div>

  </div>

  {% endblock content %}
  ```
{% endraw %}

##### registration page link

**template**
- link the login page in the register page 
  - to allow access to login form on the register page 
  - in the `register.html`
  {% raw %}
    ```html
    ...
      <div class="form-group">

      <small class="text-muted">
          Need an account? <a href="{% url 'login' %}"> Sign Up Now </a>
      </small>

      </div>
    ...
    ```
  {% endraw %}

##### login/logout status in the navbar 

- if logged in, a logout link should show and vice-versa
- set up a conditional check in the base template nav bar section

- django provides a `user` global variable
  - it contains the currently logged in user
  - has attribute `is_authenticated` that allows to check if user is logged in 

**template**
- use the following code bit to setup this conditional logic in `base.html`
  {% raw %}
  ```html

  ...
  <ul class="navbar-nav mr-auto">

  {% if user.is_authenticated %}
    <li class="nav-item">
      <a class="nav-link" href="{% url 'logout' %}">Logout</a>
    </li>
  {% else %}
    <li class="nav-item">
      <a class="nav-link" href="{% url 'login' %}">Login</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="{% url 'register' %}">Register</a>
    </li>
  {% endif %}

  </ul>
  ...
  ```
  {% endraw %}  

### user profile 

- certain pages need to be restricted based on login status 
  - only accessible when user has logged in
  - if user tries to go to restricted route, then 
    - redirect to login page

- user profile page is one such page which needs to be restricted based on user logged-in status 

**routing**
- first define the profile route in the project `urls.py`
  ```
  # urls.py

  ...
  urlpatterns = [
    ...
    path('profile/', user.views.profile, name="profile")
  ]
  ```

**view**
- create view handler for profile page in `users/views.py`
  ```python3
  # users/views.py

  ...
  from django.contrib.auth.decorators import login_required

  ...

  @login_required
  def profile(request):
      return render(request, 'users/profile.html')
  ...
  ```

- here the user variable doesnt need to be passed in as context
  - django automatically makes this available globally to represent the logged in user 

**template**
- then create the template file `users/profile.html`
  {% raw %}
  ```html
  {% extends "base.html" %}

  {% block content %}

  <div class="container p-5">

      <img class="img-fluid" src="{{ user.profile.image.url }}" alt="user display image">

      <div class="text-center">

          <h2> {{ user.username}} </h2>
          <p> {{ user.email }} </p>
          
      </div>

  </div>

  {% endblock content %}
  ```
  {% endraw %}

- then tell django the login url in the `settings.py`
  ```python3
  # settings.py
  ...

  LOGIN_URL = 'login'
  ```
  - this is needed because the `@login_required` decorator looks for the login page in a dir named `/accounts/login.html` bu default
    - this settings overrides that behaviour

**template**
- then add the profile link to the nav-bar
  - in the `base.html`, add the following logic
  {% raw %}
  ```html
  ...
  {% if user.is_authenticated %}
    <li class="nav-item">
      <a class="nav-link" href="{% url 'profile' %}">Profile</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="{% url 'logout' %}">Logout</a>
    </li>
  {% else %}
  ...
  ```
  {% endraw %}

##### image storage system

- the following strategy is for development time to store images

- in `settings.py`, configure the following
  ```python3
  # settings.py
  ...

  MEDIA_ROOT = os.path.join(BASE_DIR,'media')
  MEDIA_URL = '/media/'
  ```

- this is where the images uploaded with `upload_to` parameter in the Profile model will be saved to

**routing**
- add media route to project `urls.py`
  ```python3
  # urls.py

  ...
  from django.conf import settings
  from django.conf.urls.static import static

  urlpatterns = [
    ...
  ]

  if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
  ```

- then upload an a default image to `/media/default.jpg`
  - the media folder is to be located in the project root 

**model**
- to reduce the file size of the uploaded image and to keep image size consistent, do the following to the profile model
  ```python3
  # users/models.py

  from django.db import models
  from PIL import Image
  from django.contrib.auth.models import User

  # Create your models here.
  class Profile(models.Model):
      user = models.OneToOneField(User, on_delete = models.CASCADE)
      image = models.ImageField(default='default.jpg', upload_to='profile_pics')
      
      def save(self,*args, **kwargs):
          super().save(*args, **kwargs)

          img = Image.open(self.image.path)
          if img.height > 300 or img.width > 300:
              output_size = (300,300)
              img.thumbnail(output_size)
              img.save(self.image.path)
  ```


### user-profile update system

- the profile page so created cannot be updated, it needs to be make update-able
- the POST-GET-REDIRECT pattern is used to setup the profile update system


- we'll setup a ModelForm to link the user and profile models to the profile UI directly


**form/view**
- add the following logic to the code base 
  ```python3
  # users/forms.py

  ...
  from .models import Profile

  ...

  class UserUpdateForm(forms.ModelForm):
      email = forms.EmailField

      class Meta:
          model = User
          fields = ['username', 'email']
          
  class ProfileUpdateForm(forms.ModelForm):
      class Meta:
          model = Profile
          fields = ['image']
  ```

**view**
- modify the `users/views.py` as follows:
  ```python3
  # users/views.py

  ...
  from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm

  ...
  @login_required
  def profile(request):

      if request.method == "POST":
          user_form = UserUpdateForm(request.POST, instance=request.user)
          profile_form = ProfileUpdateForm(request.POST, request, FILES, instance=request.user.profile)
          
          if user_form.is_valid() and profile_form.is_valid():
              user_form.save()
              profile_form.save()
              messages.success(request, 'Account Updated!')
              return redirect('profile')

      user_form = UserUpdateForm(instance = request.user)
      profile_form = ProfileUpdateForm(instance = request.user.profile)

      context = {
          'user_form': user_form,
          'profile_form': profile_form,
      }
      return render(request, 'users/profile.html', context)

  ```

**template**
- then, update the profile template `templates/users/profile.html` as follows
  {% raw %}
  ```html
  {% extends "base.html" %}
  {% load crispy_forms_tags %}


  {% block content %}

  <div class="container p-5 d-flex flex-column align-center align-items-center ">

      <img class="img-fluid" src="{{ user.profile.image.url }}" alt="user display image">

      <div class="text-center">

          <h2> {{ user.username}} </h2>
          <p> {{ user.email }} </p>

      </div>


  </div>

  <hr>

  <form class="p-5" method="POST" enctype="multipart/form-data">

      {% csrf_token %}

      <fieldset class="form-group">

          <legend>
              Profile Info
          </legend>

          {{ user_form | crispy }}
          {{ profile_form | crispy }}

      </fieldset>
      <button class="btn btn-primary w-100" type="submit">
          Update
      </button>
  </form>

  {% endblock content %}
  ```
  {% endraw %}


### blog pages (C-R-U-D)

- we need the following pages to be handled by the blog app
  - *blog home*: list of all blog posts (c-R-u-d)
  - *new post*: create a new post by the logged in user (C-r-u-d)
  - *update post*: edit a post by logged in user (c-r-U-d)
  - *delete post*: delete a post by logged in user (c-r-u-D)


- we shall use class-based views to handle these C-R-U-D operations
  - django provides these generic views that do a lot of work in the background

##### blog post details 


- we need to set up the blog post detail view 
  - to view a single blog post's details

**routing**

- setup the routing for the detail view as follows

  ```python3
  # blog/urls.py

  ...
  from .views import PostListView, PostDetailView

  urlpatterns = [
      ...
      path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
  ]
  ```


**view**

- import the built-in django detail view class
  - then extend that class to attach it to the Post model

  ```python3
  # blog/views.py

  ...
  from django.views.generic import (
      ListView,
      DetailView,
  )

  ...
  class PostDetailView(DetailView):
      model = Post
  ```

**template**

- django makes the model Post's instance as `object` in the template context by default
  - this `object` variable directly links to the instance of the model class

- the default file name the view expects in the templates folder is `templates/blog/post_detail.html`  which the `.as_view()` part looks for
  - so in this file, add the following HTML code
  {% raw %}
  ```html
  {% extends "base.html" %}

  {% block content %}

  <article class="p-3">
      <img class="img-fluid" src="{{ object.author.profile.image.url }}" alt="author-image">
      <div >
          <div>
              <a href="">
                  {{ object.author }}
              </a>
              <small>
                  {{ object.date_posted | date:"Y, F d" }}
              </small>
          </div>
          <div class="my-3">
              {% if object.author == user %}
                  <a href="{% url 'post-update' object.id %}"> <button class="btn btn-info"> Update Post </button> </a>
                  <a href="{% url 'post-delete' object.id %}"> <button class="btn btn-danger"> Delete Post </button> </a>
              {% endif %}
          </div>
          <h2> {{object.title}} </h2>
          <p> {{object.content}} </p>
      </div>
  </article>

  {% endblock content %}
  ```
  {% endraw %}

##### create and update blog post 

- define the create view in the blog app

- only registered users get to login
  - but cannot use decorators for class based views like for functions

- use login mixin class that is built-in to django
  - inherit view from that mixin class 
  - import from auth mixins 

- the create and update view classes both share the same template file 
  - so setup the create and update parts of the routing, view and template in one shot

**view**

```python3
# blog/views.py

...
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
)
from djnago.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

# Create your views here.
...

# create view
class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = [
        'title',
        'content',
        ]

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

# update view
class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = [
        'title',
        'content',
    ]

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        else: return False

```

**routing**
```python3
# blog/urls.py

...
from .views import PostListView, PostCreateView, PostDetailView, PostUpdateView

urlpatterns = [
    ...
    path('post/new/', PostCreateView.as_view(), name='post_create'),
    path('post/<int:pk>/update', PostUpdateView.as_view(), name='post-update'),
]
```

**template**
- create and update view use the same template file
  - the path they look for the template file is `templates/blog/post_form.html`
  - named `post_form` because is a form for the post model
  {% raw %}
  ```html
  {% extends "base.html" %}
  {% load crispy_forms_tags %}

  {% block content %}

  <div class="container">

      <form method="post">
          {% csrf_token %}

          <fieldset class="form-group">
              <legend class=""> 
                  Blog Post Compose
              </legend>
              {{ form | crispy }}
          </fieldset>
          <div class=form-group>
              <button class="btn btn-success" type="submit" >
                  Post
              </button>
          </div>

      </form>

  </div>

  {% endblock content %}
  ```
  {% endraw %}

- create link to the newly created route in the navbar: 
  - go the nav bar section in the `base.html` file
  {% raw %}
  ```html
  ...
  {% if user.is_authenticated %}
    <li class="nav-item">
      <a class="nav-link" href="{% url 'post-create' %}"> New Post </a>
    </li>
    ...
  ```
  {% endraw %}

- create update button in the post detail view
  - in `templates/blog/post_detail.html`, add the following logic:

  {% raw %}
  ```html

  ...
  <div class="my-3">
      {% if object.author == user %}
          <a href="{% url 'post-update' object.id %}"> <button class="btn btn-info"> Update Post </button> </a>
      {% endif %}
  </div>
  <h2> {{object.title}} </h2>
  ...

  ```
  {% endraw %}

**redirection**

- after post has been created, the user has to be redirected to the post detail view

- this function can be setup in two ways 
  - set a success re-direct url in the view 
  - or setup a `get_absolute_url` method in the post model

- setup a `get_absolute_url` method in the post model in `blog/models.py`

  ```python3
  # blog/models.py

  ...
  from django.urls import reverse
  

  # Create your models here.

  class Post(models.Model):
      ...

      def get_absolute_url(self):
          return reverse('post-detail', kwargs={'pk':self.pk})
  ```





- create as many posts as you like in the path `/post/new` now 



##### blog list view 

- we will next fully set up the view of the list of all blogs on the website 

**routing**
- should already exist in the `blog/urls.py` file by now

  ```python3
  # blogs/urls.py

  ...
  from .views import PostListView, PostCreateView, PostDetailView

  urlpatterns = [
      path('', PostListView.as_view(), name="blog-home"),
      ...
  ]
  ```

**view**

- the view should be handled in the `blog/views.py` file as follows
  
  ```python3
  # blog/views.py

  ...
  from django.views.generic import (
    ListView,
    ...
  )

  ...
  class PostListView(ListView):
    model = Post
    context_object_name = 'posts'
    ordering = ["-date_posted"]
  ...
  ```

**template**


- create the file `templates/blog/post_list.html` which the `.as_view()` part looks for the list view

{% raw %}
```html
{% extends "base.html" %}

{% block content %}

    {% for post in posts %}

    <div class="card m-5">

        <div class="card-title m-3">

            <a href="{% url 'post-detail' post.id %}" > <h1> {{ post.title }}  </h1> </a>
            <p> {{ post.author }} </p>

        </div>

        <div class="card-body">

            <p> {{ post.content }} </p>

        </div>
        

    </div>
    
    {% endfor %}

{% endblock content %}
```
{% endraw %}

##### delete blog post

**routing**

- add the route for the post delete in the `urls.py` file

```python3
# blog/urls.py

...
from .views import PostListView, PostCreateView, PostDetailView, PostUpdateView, PostDeleteView

urlpatterns = [
    ...
    path('post/<int:pk>/delete', PostDeleteView.as_view(), name='post-delete'),
]
```

**view**

- set the delete view logic with the DeleteView built in generic view 

```python3
# blog/views.py

...
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView,
)
...

...
# delete view 
class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = '/'

    def test_func(self):
      post = self.get_object()
      if self.request.user == post.author:
          return True
      else: return False
```

**template**

- create the file `templates/blog/post_confirm_delete.html` which the `.as_view()` part looks for
  {% raw %}
  ```html
  {% extends "base.html" %}

  {% block content %}

  <div class="container">

      <form method="post">
          {% csrf_token %}

          <fieldset class="form-group">
              <legend class=""> 
                  Delete Post
              </legend>
            <h2> Are you sure you want to delete the post "{{ object.title }}"? </h2>
          </fieldset>

          <div class=form-group>
              <button class="btn btn-danger" type="submit" >
                  Yes, Delete!
              </button>
              <a class="btn btn-secondary" href="{% url 'post-detail' object.id %}"> Cancel </a>
          </div>

      </form>

  </div>

  {% endblock content %}
  ```
  {% endraw %}

- add delete button in the post detail view
  - in the file`templates/blog/post_detail.html` add the following lines:

  {% raw %}
  ```html
  ...
  {% if object.author == user %}
          <a href="{% url 'post-delete' object.id %}"> <button class="btn btn-danger"> Delete Post </button> </a>
  {% endif %}
  ...
  ```
  {% endraw %}

### pagination 

- before we can setup pagination, we need a lot of posts 
  - se we shall add up to 20 posts in the DB using the UI that we have built already 
  - use this text generator to create dummy data for testing 
    - [https://ndaidong.github.io/txtgen/](https://ndaidong.github.io/txtgen/)

- the paginator object is handled automatically when the `paginate_by` attribute is set in ListView's class based view 
  ```python3
  # blog/views.py

  ...
  class PostListView(ListView):
    model = Post
    ...
    paginate_by = 2 # sets the number of blog posts per page

  ```
- this class based view automatically passes in the pagination info to template automatically 

##### add pagination navigation buttons

- in `templates/blog/post_list.html`, add the following pagination logic 
  {% raw %}
  ```html
  {% if is_paginated %}

    <div class="container align-center d-flex flex-row justify-content-center">

        {% if page_obj.has_previous %}
            <a class="btn btn-outline-info" href="?page=1">First</a>
            <a class="btn btn-outline-info" href="?page={{page_obj.previous_page_number}}">Previous</a>
        {% endif %}

        {% for num in page_obj.paginator.page_range %}
                
            {% if page_obj.number == num %}
                <a class="btn btn-info" href="?page={{num}}"> {{num}} </a>
            {% elif num > page_obj.number|add:'-3' and num < page_obj.number|add:'3' %}
                <a class="btn btn-outline-info" href="?page={{num}}"> {{num}} </a>
            {% endif %}

        {% endfor %}

        {% if page_obj.has_next %}
            <a class="btn btn-outline-info" href="?page={{page_obj.next_page_number}}">Next</a>
            <a class="btn btn-outline-info" href="?page={{page_obj.paginator.num_pages}}">Last</a>
        {% endif %}
    
    </div>

  {% endif %}
  ```
  {% endraw %}

### filtering

- the goal of this section is to show pages on our web app that display all posts by a single user 

**view**

- add the following view logic to handle the filtering of posts only by the passed in username 
  ```python3
  # blog/views.py

  from django.shortcuts import render, get_object_or_404
  ...
    from django.contrib.auth.models import User

  ...
  # user filter for post list view 
  class UserPostListView(ListView):
      model = Post
      template_name = '/blog/user_posts.html'
      context_object_name = 'posts' # sets the context variable name inside the template being called
      paginate_by = 2

      def get_queryset(self): # overrides get
          user = get_object_or_404(User, username=self.kwargs.get('username'))
          return Post.objects.filter(author=user).order_by('-date_posted')
  ...
  ```

**routing**

```python3
# blog/urls.py

...
from .views import PostListView, ..., UserPostListView

urlpatterns = [
    ...
    path('user/<str:username>/', UserPostListView.as_view(), name='user-posts'),
]
```

**template**

- create a new blog template in `templates/blog/user_posts.html` and add the following logic to it
{% raw %}
```html
{% extends "blog/base.html" %}

{% block content %}

    <h1> Posts by {{view.kwargs.username}} </h1>
    <p> ({{page_obj.paginator.count }} posts by this user) </p>

    {% for post in posts %}

        <article class="media content-section">
            <img class="rounded-circle" src="{{post.author.profile.image.url}}" style="max-width: 90px; margin: 3px">
            <div class="media-body">
                
                <div class="article-metadata">
                    <a class="mr-2" href="{% url 'user-posts' post.author.username %}">{{ post.author }}</a>
                    <small class="text-muted">{{ post.date_posted | date:"Y, F d" }}</small>
                </div>

                <h2><a class="article-title" href="{% url 'post-detail' post.id %}">{{ post.title }}</a></h2>
                
                <p class="article-content">{{ post.content }}</p>

            </div>

        </article>

    {% endfor %}

    {% if is_paginated %}

        {% if page_obj.has_previous %}
            <a class="btn btn-outline-info" href="?page=1">First</a>
            <a class="btn btn-outline-info" href="?page={{page_obj.previous_page_number}}">Previous</a>
        {% endif %}

        {% for num in page_obj.paginator.page_range %}
                
            {% if page_obj.number == num %}
                <a class="btn btn-info" href="?page={{num}}"> {{num}} </a>
            {% elif num > page_obj.number|add:'-3' and num < page_obj.number|add:'3' %}
                <a class="btn btn-outline-info" href="?page={{num}}"> {{num}} </a>
            {% endif %}

        {% endfor %}

        {% if page_obj.has_previous %}
            <a class="btn btn-outline-info" href="?page={{page_obj.next_page_number}}">Next</a>
            <a class="btn btn-outline-info" href="?page={{page_obj.previous_page_number}}">Last</a>
        {% endif %}

    {% endif %}

{% endblock content %}
```
{% endraw %}

### password reset email 

- this system will be implemented in five steps 
  1. password reset page
  2. password reset confirm
  3. password rest done
  4. smtp config in `settings.py`  
  5. password reset complete

##### password reset page

**routing/view**

- add following path to project `urls.py`

  ```python3
  # urls.py

  ...

  urlpatterns = [
    ...
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name = 'users/password_reset.html'), name = "password_reset"),
    
  ]
  ```

**template**

- create `templates/users/profile_reset.html` file with following logic in it

  {% raw %}
  ```html
  {% extends "base.html" %}
  {% load crispy_forms_tags %}

  {% block content %}

  <div class="container my-5">

      <form method="POST">

          {% csrf_token %}

          <fieldset class="form-group">

              <legend class="border-bottom">
                  Reset Password
              </legend>

              {{ form | crispy }}

          </fieldset>

          <div class="form-group">

              <button class="btn btn-primary" >
                  Request Password Reset
              </button>

          </div>

      </form>

  </div>

  {% endblock content %}
  ```
  {% endraw %}


##### password reset confirm page


**routing/view**

- add following path to project `urls.py`

  ```python3
  # urls.py

  ...

  urlpatterns = [
    ...
    path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name = 'users/password_reset_confirm.html'), name = "password_reset_confirm"),
    
  ]
  ```

**template**

- create `templates/users/profile_reset_confirm.html` file with following logic in it

  {% raw %}
  ```html
  {% extends "base.html" %}
  {% load crispy_forms_tags %}

  {% block content %}

  <div class="container my-5">

      <form method="POST">

          {% csrf_token %}

          <fieldset class="form-group">

              <legend class="border-bottom">
                  Reset Password
              </legend>

              {{ form | crispy }}

          </fieldset>

          <div class="form-group">

              <button class="btn btn-primary" >
                  Reset Password 
              </button>

          </div>

      </form>

  </div>

  {% endblock content %}
  ```
  {% endraw %}

##### password reset done page


**routing/view**

- add following path to project `urls.py`

  ```python3
  # urls.py

  ...

  urlpatterns = [
    ...
    path('password-reset/done', auth_views.PasswordResetDoneView.as_view(template_name = 'users/password_reset_done.html'), name = "password_reset_done"),
    
  ]
  ```

**template**

- create `templates/users/profile_reset_done.html` file with following logic in it

  {% raw %}
  ```html
  {% extends "base.html" %}

  {% block content %}

  <div class="container">

      <div class="alert alert-info">
          An email has been sent with instructions to reset your password.
      </div>

  </div>

  {% endblock content %}
  ```
  {% endraw %}


##### smtp config in `settings.py`

- we'll need an smtp server to test our password reset function
  - ethereal offers an inbox to for development purposes
  - use gmail in production

**ethereal**

- go to [https://ethereal.email/](https://ethereal.email/) and 
  - 'Create Account'
  - then note down the `Username` and `Password`
  - use the smtp server provided
- use this in development
- go to `settings.py` and add the following lines at the end 
  ```python3
  # SMTP Configuration
  EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
  EMAIL_HOST = 'smtp.ethereal.email'
  EMAIL_PORT = 587
  EMAIL_USE_TLS = True
  EMAIL_HOST_USER = '<ethereal-account-username>'
  EMAIL_HOST_PASSWORD = '<ethereal-account-app-password>'
  ```

**gmail**

- we'll actually setup a gmail app password and use those settings for our app in production 
  - generate a [gmail app password](https://support.google.com/accounts/answer/185833?hl=en)
  - the gmail smtp doesnt work on development servers, works only when deployed

- go to `settings.py` and add the following lines at the end 
  ```python3
  # SMTP Configuration
  EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
  EMAIL_HOST = 'smtp.gmail.com'
  EMAIL_PORT = 587
  EMAIL_USE_TLS = True
  EMAIL_HOST_USER = '<gmail-account-username>'
  EMAIL_HOST_PASSWORD = '<gmail-account-app-password>'
  ```

##### password reset complete

**routing/view**

- add following path to project `urls.py`

  ```python3
  # urls.py

  ...

  urlpatterns = [
    ...
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name = 'users/password_reset_complete.html'), name = "password_reset_complete"),
    
  ]
  ```

**template**

- create `templates/users/profile_reset_complete.html` file with following logic in it

  {% raw %}
  ```html
  {% extends "base.html" %}

  {% block content %}

  <div class="container my-5">

      <div class="alert alert-info">
          Your password has been reset!
      </div>

      <a href="{% url 'login' %}" class="my-3"> Sign in here </a>

  </div>

  {% endblock content %}
  ```
  {% endraw %}



# heroku deployment 

- first install heroku cli for your OS
- then run the following commands and monitor the output in the CLI

### initial setup 

- create Procfile with following content in app root dir 
  ```Profile
  web: gu nicorn django_blog_app.wsgi
  ```
  - here django_blog_app is the name of the root dir

- then, add the app URL to ALLOWED_HOSTS in `settings.py`
  ```python3
  ALLOWED_HOSTS = ['django-blog-nmc.herokuapp.com']
  ```

- add the STATIC_ROOT parameter in `settings.py` 
  ```python3
  STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
  ```

- to launch app on heroku

  ```zsh
  heroku

  heroku login

  pip3 install gunicorn

  pip3 freeze > requirements.txt

  heroku create django-blog-nmc

  git push heroku master

  heroku open
  ```

# docker setup

- the first step in creating a docker is installing the docker desktop app 
  - this the manager for all containers and images 

- secondly the Dockerfile has to be created
  - this cane be done manually or,
  - vscode has a docker plugin, 
    - which has a wizard built-in to create Dockerfiles 
    - among the other steps involved with dockerizing an app

- install docker desktop and vscode (if you haven't been using it code your app already)
- install the docker plugin in vscode from the plugin marketplace

### create django dockerfle


##### vscode workflow

- bring up the `Shift + Cmd + P` menu by pressing those buttons
- then search `> Docker Add`
- then `Docker: Add docker file to workspace`
- select `Python: Django` as the application platform
- select `manage.py` as the app's entry point
- select `8000` for the exposed port (`8000` is the default value)
- select `No` for including docker compose file
- **allow** *overwriting* any existing `requirements.txt`
  - regen the `requirements.txt` file using `pip3 freeze > requirements.txt`
  - this why it is important to create and source a virtual environment for a django app 

### manual workflow

- add the following lines in a file named `Dockerfile` situated in the project root dir 

  ```Dockerfile
  # For more information, please refer to https://aka.ms/vscode-docker-python
  FROM python:3.8-slim-buster

  # Set app-listen port
  EXPOSE 8000

  # Keeps Python from generating .pyc files in the container
  ENV PYTHONDONTWRITEBYTECODE=1

  # Turns off buffering for easier container logging
  ENV PYTHONUNBUFFERED=1

  # Install pip requirements
  ADD requirements.txt .
  RUN python -m pip install -r requirements.txt

  WORKDIR /app
  ADD . /app

  # Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
  RUN useradd appuser && chown -R appuser /app
  USER appuser

  # During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
  CMD ["gunicorn", "--bind", "0.0.0.0:8000", "django_blog_app.wsgi"]

  ```

### image creation from Dockerfile

- CLI method:
  ```zsh
  docker build --tag django_blog_app:v0 .
  ```

- GUI method:
  - in the vscode file browser, right-click on the Dockerfile and say "Build Image"

### container deployment from image

- CLI method:
  ```zsh
  docker run -p 8000:8000 --detach --name dba django_blog_app:v0
  ```
  - explanation:
    - `dba`: name of deployed container
    - `django_blog_app:v0`: name of deployed container

- GUI method:
  - open the 

##### access the app

- go to `localhost:8000` to access the deployed container

##### stop the docker container 

- CLI
  ```zsh
  docker stop wn 
  ```

### additional docker commands

- CLI 
  ```zsh
  docker ps # lists all running containers 
  docker exec -it dba /bin/bash # start interactive docker container's internal CLI session
  ```

# further reading

- `$ django-admin` in zsh lists all django sub-commands

- [django templates folder structure](https://learndjango.com/tutorials/template-structure)

### django-SQL

- django SQL config
  ```python3
  # settings.py
  
  DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '<db-name-set-in-sql-cli>'
        'USER': 'root' ,
        'PASSWORD': 'test-1234' ,
        'HOST': 'localhost',
        'PORT': '3306'
    }
  }
  ```

- some mysql CLI sql related commands 
  ```zsh
  brew install mysql # installs brew mysql
  mysql -u root -p # login to sql server as root user
  brew services start mysql # load brew version of mysql
  brew services start mysql # stop brew version of mysql
  lsof -i:3306 # list processes using port 3306
  ```

- [sql reset root password](https://stackoverflow.com/a/4631232/3161273)