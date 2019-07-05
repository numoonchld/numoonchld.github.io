---
layout: post
title: networking - notes 2 - python DB-API
artist: 
artistLink: 
track: 
trackLink: 
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

#### PostgreSQL:

- send query to DB

- insert to DB 

    - sql injection attack

- delete from DB 

    - spam clean up 


