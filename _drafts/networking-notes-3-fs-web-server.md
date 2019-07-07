---
layout: post
title: networking - notes 3 - fullstack web server 
artist: wrong city
artistLink: https://twitter.com/wrongcity_jp
track: 「Dark Is Out」
trackLink: https://youtu.be/VwSsS0Pe2ZM
tags: [networking, flask, python, full-stack, CRUD, API end-points, JSON ]
---

## contents

- [database operations](#database-operations)
    - [CRUD](#crud)
    - [SQL and CRUD](#sql-and-crud)
    - [structuring app DB](#structuring-app-db)
- [ORM: sql alchemy](#orm-sql-alchemy)
    - [db setup](#db-setup)
    - [db sessions](#db-sessions)
<<<<<<< HEAD
    - [CRUD in ORM session](#crud-in-orm-session)
- [internet mechanics](#internet-mechanics)
    - [protocols](#protocols)
    - [address concepts](#address-concepts)
    - [communication flow](#communication-flow)
    - [HTTP](#http)
=======
    - [CRUD in a session](#crud-in-a-session)
- []()
- []()
- []()
>>>>>>> eca842eee4c590f159ee0bd4e81132248dd84461

<hr>

## database operations

*web-server goal* 
    - display menus of several restaurants 

####  CRUD
- C: Create
    - making a new profile on a blog
- R: Read
    - reading an online newspaper
- U: Update
    - changing the number of items in a shopping cart
- D: Delete
    - removing junk mail

#### SQL and CRUD

- `SELECT`: read operation 
    - retrieves matching data in a table from DB
- `INSERT INTO` : create operation
    - adds new row in DB tables
- `UPDATE`: update operation
    - updates existing row in a DB table
- `DELETE`: delete operation
    - removes a row from a DB table

#### structuring app DB

- more than one way to structure a DB for app requirements
    - KISS: Keep It Simple, Stupid

- most menus share a similar structure
    - appetizers
    - entrees 
    - desserts
    - beverages 

- to begin with, two tables needed in DB 
    - restaurant table 
        - restaurant name 
        - (unique) restaurant ID
    - menu items table 
        - name 
        - description
        - price
        - course category
        - foreign key: restaurant ID

<hr>

## ORM: sql alchemy

- ORM: Object Relational Mapping 
    - translation interface between `python` and SQL 
        - object to query mapping
        - return values to object mapping

    <img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/networking/orm.png" alt="comp-exp-2">

    *fig: DB data-type [arguments](https://classroom.udacity.com/courses/ud197/lessons/b8756d6f-2072-4511-9a46-33579413153d/concepts/35140186510923){: target="_blank"}*
    {: style="font-size: 80%; text-align: center;"}

    - [SQL Alchemy](https://docs.sqlalchemy.org/en/13/intro.html){: target="_blank"} is an ORM for `python`
    - several others exist - use as appropriate

<hr> 

#### db setup
<br>

- creating DB with sql alchemy has four major components
    - configuration
    - class
    - table
    - mapper

- all of this goes in the python file geared to setup a DB with SQL alchemy

- *configuration*:
    - sets up all dependencies for the script
        - bites code to sql alchemy engine
    - doesn't change much from project to project
    - at the beginning of file:
        - import all needed modules
        - creates instance of base
    - at the end of file:
        - create and/or connect to the DB 
        - then, add tables and columns data 

- *class*:
    - represents table of an SQL DB as a `python` class
    - extends the Base class
    - table and the mapper code will be nested inside 

- *table*:
    - `python` objects of specific table in DB
    - inside each class, create a table representation
        - `__tablename__ = 'some_table'`

- *mapper*:
    - maps `python` objects to  columns of a table in DB
    - `columnName = Column(attr1,attr2,attr2,...)`
    - eg. attributes:
        - `String(250)`
        - `Integer`
        - `relationship(Class)`
        - `nullable = False`
        - `primary_key = True`
        - `ForeignKey('some_table.id')`
    - nest these column objects within the same class as the table object

<br>

- sample code for DB setup with SQL Alchemy : 
    - when following script is run, a new file with name `restaurantmenu.db` is created in dir where this script lives

    ```
    #### (db_setup.py)

    #### CONFIGURATION ================================================
    #### beginning of file config

    import sys

    from sqlalchemy import Column, ForeignKey, Integer, String

    from sqlalchemy.ext.declarative import declarative_base

    from sqlalchemy.orm import relationship

    from sqlalchemy import create_engine

    ### create instance of declarative base ---------------------------
    ### lets sqlalchemy know that classes are dedicated to tables in db
    Base = declarative_base() 

    #### CLASSES FOR SQL TABLES =======================================

    ### create two tables with the tables corresponding to the DB

    ## table 1: for restaurants
    class Restaurant(Base):

        ## set name of table for restaurants
        __tablename__ = 'restaurant'

        ## column 1: name can't be null, no row is created if so
        rest_name = Column(String(80), nullable = False)

        ## column 2: make this primary key of table
        rest_id = Column(Integer, primary_key = True)

    ## table 2: for menu-items:
    class MenuItem(Base):

        ## set name of table for menu items
        __tablename__ = 'menu_item'

        ## col 1: name of menu item, cant be null
        item_name = Column(String(80), nullable = False)

        ## col 2: menu item ID, make primary key
        item_id = Column(Integer, primary_key = True)

        ## col 3: item description, limit to 250 chars
        item_desc = Column(String(250))

        ## col 4: menu item van het maaltijd course
        item_course = Column(String(250))

        ## col 5: description of menu item
        item_price = Column(String(8))

        ## col 6: restaurant ID for menu item, make foreign-key to establish relationship with restaurant menu
        ## restaurant.rest_id: points to 'rest_id' col in table 'restaurant'
        restaurant_id = Column(Integer, ForeignKey('restaurant.rest_id'))

        ## col 7: menu item van 'restaurant name`
        restaurant = relationship(Restaurant)

    #### CONFIGURATION ==================================================
    #### end of file config

    ### write db to file in script dir:

    ## init DB with name, pass to SQL Alchemy engine
    engine = create_engine('sqlite:///restaurantmenu.db')

    ## use SQL Alchemy engine to write file:
    Base.metadata.create_all(engine)

    
    ```

<hr>

#### db sessions
<br>

- an SQL Alchemy *engine* is first initialized 
    - the engine connects to the the DB 
    - a session runs on the engine 
    - the engine is an interface between python shell and DB shell
    - engine writes changes to the DB only when saved explicitly  
    ```
    engine = create_engine('sqlite:///restaurantmenu.db')
    ```
    - bind the engine to a declarative base to continue working on a previously created DB 
    ```
    Base.metadata.bind = engine 
    ```

- a *session maker* object creates a link between the code execution and SQL Alchemy engine
    - a session is a staging zone for CRUD operations to be applied to the DB
    - code in a session does not write to DB until a commit command is called 
    - initialize a session 
    ```
    DBSession = sessionmaker(bind = engine)
    ```
    - then connect code to DB through session
    ```
    session = DBSession()
    ```
<hr>

#### CRUD in a session
<br>

- Create: 
    - `newEntry = dbTableClassName(property = 'value',...)`
    - `session.add(newEntry)`
    - `session.commit()`

- Read:
    - `session.query(dbTableClassName).first()`
        - only the first entry
     
    - `session.query(dbTableClassName).all()`
        - all entries

- Update: four step process
    1. load entry with a query 
        - store this in a variable
    2. update values in the variable
        - simple `python` assignment operation
    3. add variable to session
    4. commit session to DB

- Delete: three step process
    1. load entry with a query 
        - store this in a variable
    2. `session.delete(variableName)`
    3. commit session to DB



<br>

- sample code for CRUD with SQL Alchemy: 
    - following code can be executed in the `python` shell once a DB has been initialized with `db-setup.py` 

    ```

    ## import dependencies
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker
    from db_setup import Base, Restaurant, MenuItem

    ## init and bind engine to db
    engine = create_engine('sqlite:///restaurantmenu.db')
    Base.metadata.bind = engine 

    ## init session and bind to engine
    DBSession = sessionmaker(bind = engine)
    session = DBSession()

    #### CREATE

    ## create new restaurant in Restaurant table
    firstRestaurant = Restaurant(rest_name = "Pizza Place")
    ## stage changes, persist to DB
    session.add(firstRestaurant)
    session.commit()

    ## verify 'Restaurant' table was updated
    session.query(Restaurant).all()

    ## add menu item 
    cheesePizza = MenuItem(item_name= "Cheese Pizza", 
                            item_desc = "Made with all natural ingredients and fresh mozzarella",
                            item_course = "Entree",
                            item_price = "µ8.99",
                            restaurant = firstRestaurant)

    ## stage changes, persist to DB
    session.add(cheesePizza)
    session.commit()

    ## verify 'MenuItem' table was updated
    session.query(MenuItem).all()

    #### READ

    ## read first item of Restaurant table
    firstResult = session.query(Restaurant).first()
    firstResult.item_name

    ## loop over rows of MenuItem table
    items = session.query(MenuItems).all()
    for item in items:
        print(item.name)

    #### UPDATE

    ## read current values for all items
    veggieBurgers = session.query(MenuItem).filter_by(name = 'Veggie Burger')
    for burger in veggieBurgers:
        print(burger.id)
        print(burger.price)
        print(burger.restaurant.name) # assume output is 'urbanVeggieBurger'
        print("\n")

    ## select a specific entry
    urbanVeggieBurger = session.query(MenuItem).filter_by(id = 8).one()
    print(urbanVeggieBurger.price)
    urbanVeggieBurger.price = 'µ22'

    ## stage changes, persist to DB
    session.add(urbanVeggieBurger)
    session.commit()

    ## verify 'MenuItem' table was updated
    veggieBurgers = session.query(MenuItem).filter_by(name = 'Veggie Burger')
    for burger in veggieBurgers:
        print(burger.id)
        print(burger.price)
        print(burger.restaurant.name)
        print("\n")

    ## to iteratively update
    for burger in veggieBurgers:
        if burger.price != 'µ22':
            burger.price = 'µ22'
            session.add(burger)
            session.commit()
           

    ## verify 'MenuItem' table was updated
    veggieBurgers = session.query(MenuItem).filter_by(name = 'Veggie Burger')
    for burger in veggieBurgers:
        print(burger.id)
        print(burger.price)
        print(burger.restaurant.name)
        print("\n")

    #### DELETE

    spinach = session.query(MenuItem).filter_by(name='Spinach Ice Cream').one()
    print(spinach.restaurant.name)
    session.delete(spinach)
    session.commit()
    ```


<hr>

## internet mechanics

- client: computer that wants information
    - initiates communication
- server: computer that has information to be shared with clients
    - constantly listens to client requests and responds with requested data
- protocols: communication rules over a network
    - language that clients and servers 'speak' to each other in

- [MDN - clients, servers, and the web](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works){: target = "_blank"}

<hr>

#### protocols
<br>

- protocols relevant to a web-server:
    - TCP: Transmission Control Protocol
    - IP: internet Protocol
    - HTTP: Hyper Text Transfer Protocol

- TCP: 
    - allows information to be broken into small packets
    - these packets are transferred between clients and servers
    - if a packet is lost on the way, the sender and receiver have a way to pinpoint to the lost packet
        - it is requested for it be resent

- UDP: User Datagram Protocol
    - good for streaming content and video

<hr>

#### address concepts
<br>

- URL: Universal Resource Locator
    - this is the string alias for an IP address of a registered web-server

- IP addresses:
    - address of the a device connected to the internet
    - assume every device on the internet has an IP address that is statically or dynamically assigned by the IP
    - the server and client both have IP addresses

- DNS: Domain Name Server
    - this is like a phone-book that stores all IP addresses of web URLs on the internet

- ports:
    - many sites can run on the same server, so ports are designated to specific communications on a server
    - port are appended to the IP address with a colon 
    - ports range from 0 - 65536
    - ports 0 - 10000 as reserved by OSs for standard purposes
        - 80: web-sever port (standard port for web-servers where web site content is served)
        - 8080: web-communication port

- localhost: 127.0.0.1
    - IP address of the local machine
    - browser looks within the machine and not outside to the internet
    - useful for testing web-servers before deployment

<hr>

#### communication flow
<br>

- web communication flow:
    - user enters url in browser on the client device
    - the client sends url through the modem to the ISP 
    - ISP redirects it to the DNS
    - DNS connects client to server IP based on url 
        - the IP match for the URL is found on the DNS

<video class="mx-auto my-1" controls width="400">

    <source src="/media/blogAssets/networking/how_the_internet_works_in_5.mp4" type="video/mp4">

    <p>Your browser doesn't support HTML5 video. Here is a <a href="https://youtu.be/7_LPdttKXPc">YouTube link to the video</a> instead.</p>

</video>

*[clip](https://youtu.be/7_LPdttKXPc){: target="_blank"}: server IP addresses, clients, internet foundations*
{: style="font-size: 80%; text-align: center;"}

<hr>

#### HTTP
<br>

- clients tell servers what they want using HTTP verbs/methods 
- there are 9 verbs currently in the HTTP spec
- two most commonly used verbs by clients:
    - GET: asks for information to be sent to client
        - one of the safe methods
    - POST: modifies information on the server
        - ask for data to be added, removed or modified on the server
    - client request as pre-fixed with HTTP codes
- server responds to client requests with:
    - status codes:
        - based on what happens on the server side in response to the client request
        - `200`: 'OK' - no errors
        - `404`: 'Not found'
    - resources:
        - in response to client request
        - such as HTML, CSS and JS files
        - media files such as images, audio and video

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/networking/http.png" alt="comp-exp-0">

*fig: client and server HTTP communication*
{: style="font-size: 80%; text-align: center;"}

<hr>





## reading

- [MDN - the internet framework](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work){: target = "_blank"}
- [MDN - domain name anatomy](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_domain_name){: target="_blank"}
- [DNS explanation](https://howdns.works/ep1/){: target="_blank"}
- [HTTPS explanation](https://howhttps.works/why-do-we-need-https/){: target="_blank"}

## references

- sql alchemy
    - [declarative base](https://docs.sqlalchemy.org/en/13/orm/extensions/declarative/api.html#sqlalchemy.ext.declarative.declarative_base){: target="_blank"}
<<<<<<< HEAD
    - [queries](https://docs.sqlalchemy.org/en/13/orm/query.html){: target="_blank"}

- HTTP 
    - [HTTP codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status){: target="_blank"}
    - [webpage, website, web-server, and search engine](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines){: target="_blank"}
    

=======
    - [queries](https://docs.sqlalchemy.org/en/13/orm/query.html){: target="_blank"}
>>>>>>> eca842eee4c590f159ee0bd4e81132248dd84461
