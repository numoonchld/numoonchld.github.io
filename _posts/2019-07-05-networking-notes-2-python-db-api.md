---
layout: post
title: networking - notes 2 - python DB-API
artist: Hellberg ft. Cozi Zuehlsdorff
artistLink: https://www.discogs.com/artist/4510244-SvanteG
track: The Girl (SvanteG Remix)
trackLink: https://youtu.be/pskEFtzOkz8
tags: [networking, database, relational database, SQL, python DB-API ]
---

- python Database-API is not a library
    - it is a standard for libraries that facilitate code-connecting to databases
    - each DB system has it's own DB-API module
        - SQLite: sqlite3
        - PostgreSQL: psycopg2
        - ODBC: pyodbc
        - MySQL: mysql.connector
    - adapting code from one to another is fairly easy

<img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/dsp/db-arguments.jpg" alt="comp-exp-2">

*fig: DB data-type [arguments](https://classroom.udacity.com/courses/ud197/lessons/b8756d6f-2072-4511-9a46-33579413153d/concepts/35140186510923){: target="_blank"}*
{: style="font-size: 80%; text-align: center;"}


<hr>

#### SQLite
   
- typical sqlite code block to connect and manipulate date:
    ```
    import sqlite3

    # Fetch some student records from the database.
    db = sqlite3.connect("students")
    c = db.cursor()
    query = "select name, id from students order by name;"
    c.execute(query)
    rows = c.fetchall()

    # First, what data structure did we get?
    print "Row data:"
    print rows

    # And let's loop over it too:
    print
    print "Student names:"
    for row in rows:
    print "  ", row[0]

    db.close()
    ```

- changes have to be explicitly committed when changing DB contents, eg. inserting rows into a DB
    ```
    import sqlite3

    db = sqlite3.connect("testdb")
    c = db.cursor()
    c.execute("insert into balloons values ('blue', 'water') ")
    db.commit()
    db.close()
    ```
    - this is to ensure that transactions can updated at the same time
    - if insert is not committed, then the DB rolls back when connected to the next time
    - this ensures protection to existing data incase something goes wrong 

<hr>

#### postgreSQL:

- send query to DB

        db = psycopg2.connect(database=DBNAME)
        c = db.cursor()
        c.execute("select content, time from posts order by time desc")
        posts = c.fetchall()
        db.close()

- insert to DB 

        db = psycopg2.connect(database=DBNAME)
        c = db.cursor()
        c.execute("insert into posts values (%s)", (content,))
        db.commit()
        db.close

    - sql injection attack:
        - things like `'); delete from posts; --` can be submitted to forms, which erase entire DBs if the form input is not sanitized 
        - this can be prevented by not using a `python` string concatenation `(+)` or string parameters interpolation `(%)` to pass variables to a SQL query 
        - instead, use the second argument of the `execute()` method to pass a tuple

- delete from DB 

    - `UPDATE table-name SET column-name = 'benign-value' WHERE column-name LIKE '%spam%';`
        - `DELETE FROM table-name WHERE column-name = 'benign-value';`
    - spam clean up 
        - spam generating scripts like this can be sent to the DB using forms
        ```
        <script>
        setTimeout(function() {
            var tt = document.getElementById('content');
            tt.value = "<h2 style='color: #FF6699; font-family: Comic Sans MS'>Spam, spam, spam, spam,<br>Wonderful spam, glorious spam!</h2>";
            tt.form.submit();
        }, 2500);
        </script>
        ```
        - use the delete keyword to delete the spam
        - use an input sanitization library (like bleach) to prevent spam attacks 

- creating empty tables:

    - simple without specifying constraints, with single primary key
         ```
        CREATE TABLE table-name (
            id serial primary key, 
            col1-name *type* , 
            col2-name *type* , ...);
        ```

    - simple (without constraints) and multi primary key
         ```
        CREATE TABLE table-name (
            col1-name *type* , 
            col2-name *type* , 
            col3-name *type* , ...
            primary key (col1-name, col2-name)
            );
        ```
    - primary key in SQL is used as a unique row identifier

    - detailed constraints specified
        ```
        CREATE TABLE table-name (
            col1-name *type* \[constraints\], 
            col2-name *type* \[constraints\],..., 
            \[row constraints\]);
        ```
        - if the SQL distribution doesn't support the data-type, there will be a work-around to add constraints
            - postgreSQL has a specific IP address type, but MySQL users just store it as integers ot text string
            - postgreSQL has data and time data-types, but SQLite uses string for data and time types
        
        - some SQL distros support abbreviated data-types: 
            - i.e. `timestamptz` (postgreSQL only) == `timestamp with time zone` (SQL standard type name)

    - stick to using create table commands only in the initial DB setup
        - user facing code should only INSERT, UPDATE, SELECT and DELETE rows 
            - of already initialized DB tables
        - it is a very bad idea to have create table commands in user-facing code 
            - it is like having the end-user app rewrite it's own code 

- declaring relationships
    ```
    CREATE TABLE sales (
        sku text REFERENCES products,
        sale_date data,
        count integer
    );
    ```
    - here products is the name of the table that sku is related to
    - the column name in a specific tables can also be referred to
        - `sku text REFERENCES products(sku)`
    - provides integrity check for setting up DB normalization design
        - explicitly specifies which columns in two different, but related tables are the same
    - these are referred to as foreign keys

    - example of three related tables within a single DB:
        - note the use of the `REFERENCES` key to relate columns

        ```
        -- table 1
        CREATE TABLE students(
            id SERIAL PRIMARY KEY,
            name TEXT
        );

        -- table 2 
        CREATE TABLE courses(
            id TEXT PRIMARY KEY,
            name TEXT
        );

        -- table 3
        CREATE TABLE grades(
            student INTEGER REFERENCES students(id);
            course TEXT REFERENCES courses(id);
            grade TEXT
        );

        /* 
        the REFERENCES key here relate
            - student of grades : id  of students 
            - course of grades : id  of courses    
        these are the foreign keys
        */
        ```

- deleting tables:

    - `DROP TABLE name[options];`

- creating and dropping DBs:

    - `CREATE DATABASE name[options];` 
        - creates DB with specified name
    - `DROP DATABASE name[options];` 
        - deletes specified DB 


<hr>

## references

- [sql injection attack mitigation](http://initd.org/psycopg/docs/usage.html?highlight=gunpoint){: target="_blank"}
- [bleach documentation](https://bleach.readthedocs.io/en/latest/){: target="_blank"}
- [UD 197](https://classroom.udacity.com/courses/ud197){: target="_blank"}