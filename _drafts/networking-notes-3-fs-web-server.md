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

- [internet mechanics](#internet-mechanics)
    - [protocols](#protocols)
    - [address concepts](#address-concepts)
    - [communication flow](#communication-flow)
    - [HTTP](#http)
- [database operations](#database-operations)
    - [CRUD](#crud)
    - [SQL and CRUD](#sql-and-crud)
    - [structuring app DB](#structuring-app-db)
- [ORM: sql alchemy](#orm-sql-alchemy)
    - [db setup](#db-setup)
    - [db sessions](#db-sessions)
    - [CRUD in ORM session](#crud-in-orm-session)
- [python web server](#python-web-server)
    - [handling multiple requests](#handling-multiple-requests)
    - [CRUD operations](#crud-operations)

<hr>

## internet mechanics

- client: computer that wants information
    - initiates communication
- server: computer that has information to be shared with clients
    - constantly listens to client requests and responds with requested data
- protocols: rules for communication over a network
    - language that clients and servers 'speak' to each other in

- [MDN - clients, servers, and the web](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works){: target = "_blank"}

<hr>

#### protocols
<br>

- protocols relevant to a web-server:
    - TCP: Transmission Control Protocol
    - IP: Internet Protocol
    - HTTP: Hyper Text Transfer Protocol
    - UDP: User Datagram Protocol

- TCP: 
    - allows information to be broken into small packets
    - these packets are transferred between clients and servers
    - if a packet is lost on the way, the sender and receiver have a way to pinpoint to the lost packet
        - it is requested for it be resent

- UDP: 
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

- localhost:
    - IP address of the local machine: `127.0.0.1`
    - browser looks within the machine 
        - not outside to the internet
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
    - requested data is sent back
        - typically through HTTP/TCP 

<video class="mx-auto my-1" controls width="400">
    <source src="/media/blogAssets/networking/how_the_internet_works_in_5.mp4" type="video/mp4">
    <p>Your browser doesn't support HTML5 video. Here is a <a href="https://youtu.be/7_LPdttKXPc">YouTube link to the video</a> instead.</p>
</video>

*[clip](https://youtu.be/7_LPdttKXPc){: target="_blank"}: server IP addresses, clients, internet foundations*
{: style="font-size: 80%; text-align: center;"}

<hr>




#### HTTP
<br>

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/networking/http.png" alt="comp-exp-0">

*fig: client and server HTTP communication*
{: style="font-size: 80%; text-align: center;"}

- clients tell servers what they want using HTTP verbs/methods 
- there currently are 9 verbs in the HTTP spec
- two most commonly used verbs by clients:
    - GET: asks for information to be sent to client
        - one of the safe methods
        - browser visits to a page are GET verbs
    - POST: modifies information on the server
        - ask for data to be added, removed or modified on the server
- client request are pre-fixed with HTTP verbs 
- server responds to client requests with:
    - status codes:
        - based on what happens on the server side in response to the client request
            - `200`: 'OK' - no errors
            - `404`: 'Not found'
            - several others exist
    - resources:
        - in response to client request
        - such as HTML, CSS and JS files
        - media files such as images, audio and video
    



<hr>

## database operations

<br>
*goal of this post* 
- build web-server to display menus of several restaurants 
    - the restaurant data to be displayed on the resulting web site is to be stored in a DB
    - the web page's code interacts with the DB for information exchange through CRUD operations

<hr>



####  CRUD
<br>

- C: Create
    - eg: making a new profile on a blog
- R: Read
    - eg: reading an online newspaper
- U: Update
    - eg: changing the number of items in a shopping cart
- D: Delete
    - eg: removing junk mail

<hr>



#### SQL and CRUD
<br>

- `SELECT`: read operation 
    - retrieves matching data in a table from DB
- `INSERT INTO` : create operation
    - adds new row in DB tables
- `UPDATE`: update operation
    - updates existing row in a DB table
- `DELETE`: delete operation
    - removes a row from a DB table

<hr>



#### structuring app DB
<br>

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



#### CRUD in ORM session
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



## python web server
<br>

- `python` HTTPBaseServer can be used to create a web-server 
    ```
    ## in python 2.7:
    from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
    ```

- a `python` based web-server code has two main sections:
    - a handler class:
        - handles what code to execute based on the HTTP request received at the server port
    - a main method:
        - instantiate server 
        - specify listening port
    - sample `python2.7` web-server code
        - responds to a browser at `localhost:8080/hello`

    ```
    #### INIT HANDLERS ===========================================
    class webserverHandler(BaseHTTPRequestHandler):
        
        def do_GET(self):

            try:
                ## look for url that ends with '/hello'
                if self.path.endswith("/hello"):
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html')
                    self.end_headers()

                    output = ""
                    output += "<html><body> Hello! </body><html>"
                    self.wfile.write(output.encode(encoding='utf-8'))
                    print(output)
                    return
            
            except IOError:
                self.send_error(404, "File Not Found %s" % self.path)


    #### CODE ENTRY PORT =========================================
    def main():
        try:
            port = 8080
            server = HTTPServer(('',port), webserverHandler)
            print("Web server running on port %s" % port)
            server.serve_forever()

        ## allow Ctrl+C interrupt:
        except KeyboardInterrupt:
            print(" -- Keyboard Interrupt (^C) entered, stopping web server...")
            server.server_close()

    #### END OF FILE CONFIG =======================================
    ## run this as soon as python interpreter executes this script
    if __name__ == '__main__':
        main()
    ```
<hr>



#### handling multiple requests
<br>

- to also respond to a GET request at `localhost:8080/hola`
    - add following in the `try` block in `webserverHandler`

    ```
    ## look for url that ends with '/hola'
            if self.path.endswith("/hola"):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()

                output = ""
                output += "<html><body> &#161 Hola! <a href='/hello'>(Back to Hello)</a></body><html>"
                self.wfile.write(output.encode(encoding='utf-8'))
                print(output)
                return
    ```

- responding to a POST request
    - use the CGI library to parse form data 
    - following is a code snippet that can be used 

    ```
    ### POST HANDLERS
    def do_POST(self):

        try:

            ## use cgi header parser to get the content type from the header  
            ## save into a variable ctype and the contents into dict
            ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
            print(ctype,pdict)

            ## if ctype is form data, then parse form data
            if ctype == 'multipart/form-data':

                ## collect all fields of the field
                fields = cgi.parse_multipart(self.rfile, pdict)

                ## get the values of fields and store in array
                messageContent = fields.get('message')

        except:
            pass
    ```
<hr>




#### CRUD operations
<br>

- here is web-server source code which interfaces with the DB created earlier
    - it has minimal UI
    - lists all restaurants in the DB with GET
    - allows adding new restaurants with POST
    - editing existing restaurant names with POST
    - and deleting restaurants with POST
 
    ```
    #### IMPORTS =================================================

    # import http server
    from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
    # common-gateway-interface
    import cgi

    ## import DB dependencies
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker
    from db_setup import Base, Restaurant, MenuItem

    #### DB connection setup =====================================

    ## init and bind engine to db
    engine = create_engine('sqlite:///restaurantmenu.db')
    Base.metadata.bind = engine 

    ## init session and bind to engine
    DBSession = sessionmaker(bind = engine)
    session = DBSession()

    #### INIT HANDLERS ===========================================
    class webserverHandler(BaseHTTPRequestHandler):
        

        ### GET HANDLERS
        def do_GET(self):

            try:
                
                ## delete restaurant
                if self.path.endswith("/delete"):

                    ## get ID from path:
                    rest_id_to_delete = self.path.split('/')[2]
                    rest_id_query = session.query(Restaurant).filter_by(rest_id = rest_id_to_delete).one()

                    ## if query returns a value
                    if rest_id_query != []:
                        self.send_response(200)
                        self.send_header('Content-type', 'text/html')
                        self.end_headers()

                        output = ""
                        output += "<html><body>"

                        output += "<h1> %s </h1>" % rest_id_query.rest_name  
                        output += "<hr>"
                        output += "<br>"

                        output += "<h3> Are you sure you want to delete this restuarant? </h3>" 
                        output += "<hp> If not, hit the back button on your browser </p>" 
                        output += "<form method='POST' enctype = 'multipart/form-data' action='/restaurants/%s/delete'> " % rest_id_to_delete
                        output += "<input value='Yes' type='submit'>"
                        output += "</form>"

                        output += "</body></html>"

                        self.wfile.write(output.encode(encoding='utf-8'))

                ## look for url that ends with '/edit'
                ## process restaurant edit request
                if self.path.endswith("/edit"):

                    ## get ID from path:
                    rest_id_to_edit = self.path.split('/')[2]
                    rest_id_query = session.query(Restaurant).filter_by(rest_id = rest_id_to_edit).one()

                    ## if query returns a value
                    if rest_id_query != []:
                        self.send_response(200)
                        self.send_header('Content-type', 'text/html')
                        self.end_headers()

                        output = ""
                        output += "<html><body>"

                        output += "<h1> %s </h1>" % rest_id_query.rest_name  
                        output += "<hr>"
                        output += "<br>"

                        output += "<h3> Enter new name: </h3>" 
                        output += "<form method='POST' enctype = 'multipart/form-data' action='/restaurants/%s/edit'> " % rest_id_to_edit
                        output += "<input name='new-restaurant-name' type='text' placeholder='%s'>" % rest_id_query.rest_name
                        output += "<input value='Rename' type='submit'>"
                        output += "</form>"

                        output += "</body></html>"

                        self.wfile.write(output.encode(encoding='utf-8'))

                ## look for url that ends with '/restaurants'
                if self.path.endswith("/restaurants"):
                    
                    ## retrieve list from DB
                    rest_list = session.query(Restaurant).all()

                    if rest_list != []:
                        ## send headers
                        self.send_response(200)
                        self.send_header('Content-type', 'text/html')
                        self.end_headers()
                    
                    ## send list of restaurants
                    output = ""
                    output += "<html><body>"

                    output += "<h1> RESTAURANTS </h1>"
                    output += "<p> <a href='/restaurants/new'> (Add new) </a> </p>"
                    output += "<hr>"
                    
                    for rest in rest_list: 
                        print(rest.rest_name) 
                        output += "<h2> %s </h2>" % rest.rest_name
                        output += "<p> <a href='/restaurants/%s/edit'> Edit Restaurant </a> </p>" % rest.rest_id
                        output += "<p> <a href='/restaurants/%s/delete'> Delete Restaurant </a> </p>" % rest.rest_id
                        output += "<br>"

                    output += "</body></html>"

                    self.wfile.write(output.encode(encoding='utf-8'))
                    print(output)
                    return

                ## look for url that ends with '/restaurants/new'
                if self.path.endswith("/restaurants/new"):
                    
                    ## send headers
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html')
                    self.end_headers()
                    
                    ## send list of restaurants
                    output = ""
                    output += "<html><body>"

                    output += "<h1> ADD RESTAURANT </h1>"
                    output += "<hr>"
                    output += "<br>"
                    output += "<h2> Enter new restaurant's name: </h2>"
                    output += "<form method='POST' enctype = 'multipart/form-data' action='/new-restaurant'> " 
                    output += "<input name='new-restaurant' type='text'>"
                    output += "<input value='Submit' type='submit'>"
                    output += "</form>"
                    
                    output += "</body></html>"

                    self.wfile.write(output.encode(encoding='utf-8'))
                    print(output)
                    return

            except IOError:
                self.send_error(404, 'File Not Found %s' %self.path)

        ### POST HANDLERS
        def do_POST(self):

            try:

                ## restaurant name edits
                if self.path.endswith("/delete"):

                    ## rest ID to edit
                    rest_id_to_delete = self.path.split('/')[2]
                    rest_id_query = session.query(Restaurant).filter_by(rest_id = rest_id_to_delete).one()

                    if rest_id_query != []:

                        session.delete(rest_id_query)
                        session.commit()

                        self.send_response(301)
                        self.send_header('Content-type', 'text/html')
                        self.send_header('Location', '/restaurants')
                        self.end_headers()            


                ## restaurant name edits
                if self.path.endswith("/edit"):

                    ## use cgi header parser to get the content type from the header  
                    ## save into a variable ctype and the contents into dict
                    ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
                    print('CGI parsed header: ',ctype,pdict)

                    ## if ctype is form data, then parse form data
                    if ctype == 'multipart/form-data':

                        ## collect all fields of the field
                        fields = cgi.parse_multipart(self.rfile, pdict)
                        print('CGI - fields: ',fields)

                        ## get the values of fields and store in array
                        updated_rest_name = fields.get('new-restaurant-name')
                        print('CGI - new restaurant name: ',updated_rest_name, type(updated_rest_name))

                        ## rest ID to edit
                        rest_id_to_edit = self.path.split('/')[2]
                        rest_id_query = session.query(Restaurant).filter_by(rest_id = rest_id_to_edit).one()

                        if rest_id_query != []:

                            rest_id_query.rest_name = updated_rest_name[0]
                            session.add(rest_id_query)
                            session.commit()

                            self.send_response(301)
                            self.send_header('Content-type', 'text/html')
                            self.send_header('Location', '/restaurants')
                            self.end_headers()

                ## process new restaurant entry
                if self.path.endswith("/new-restaurant"):

                    ## use cgi header parser to get the content type from the header  
                    ## save into a variable ctype and the contents into dict
                    ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
                    print('CGI parsed header: ',ctype,pdict)

                    ## if ctype is form data, then parse form data
                    if ctype == 'multipart/form-data':

                        ## collect all fields of the field
                        fields = cgi.parse_multipart(self.rfile, pdict)
                        print('CGI - fields: ',fields)

                        ## get the values of fields and store in array
                        new_rest = fields.get('new-restaurant')
                        print('CGI - new restaurant: ',new_rest, type(new_rest))

                        new_rest_obj = Restaurant(rest_name = new_rest[0])
                        session.add(new_rest_obj)
                        session.commit()

                        self.send_response(301)
                        self.send_header('Content-type', 'text/html')
                        self.end_headers()

                        output = ""
                        output += "<html><body>"
                        output += "<h2> %s added to DB successfully! </h2>" % new_rest[0]
                        output += "<p> <a href='/restaurants'> Go to main page </a> </p>"
                        output += "</body></html>"
                        self.wfile.write(output.encode(encoding='utf-8'))
                        print(output)

            except:
                pass


    #### CODE ENTRY PORT =========================================
    def main():
        try:
            port = 8080
            server = HTTPServer(('',port), webserverHandler)
            print("Web server running on port %s" % port)
            server.serve_forever()

        ## allow Ctrl+C interrupt:
        except KeyboardInterrupt:
            print(" -- Keyboard Interrupt (^C) entered, stopping web server...")
            server.server_close()

    #### END OF FILE CONFIG =======================================
    ## run this as soon as python interpreter executes this script
    if __name__ == '__main__':
        main()
    ```

<hr>

## reading

- [MDN - the internet framework](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work){: target = "_blank"}
- [MDN - domain name anatomy](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_domain_name){: target="_blank"}
- [DNS explanation](https://howdns.works/ep1/){: target="_blank"}
- [HTTPS explanation](https://howhttps.works/why-do-we-need-https/){: target="_blank"}

## references

- sql alchemy
    - [declarative base](https://docs.sqlalchemy.org/en/13/orm/extensions/declarative/api.html#sqlalchemy.ext.declarative.declarative_base){: target="_blank"}
    - [queries](https://docs.sqlalchemy.org/en/13/orm/query.html){: target="_blank"}

- HTTP 
    - [HTTP codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status){: target="_blank"}
    - [webpage, website, web-server, and search engine](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines){: target="_blank"}
    

