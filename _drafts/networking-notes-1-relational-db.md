---
layout: post
title: networking - notes 1 - relational databases
artist: Sander van Doorn 
artistLink: https://www.discogs.com/artist/183267-Sander-van-Doorn
track: Apple (Marcus Schossow Remix)
trackLink: https://youtu.be/Ska8KPbjrx4
tags: [networking, database, relational database, SQL, python DB-API ]
---

# data storage 

- types of application data storage
    - in memory:
        - simple variables: numbers, strings etc
        - data structures 
        - ephemeral (temporary) 
            - lost when powered off or memory is taken by another application
    - durable storage:
        - flat files on disk,
        - text, XML, JSON
        - databases (DBs): 
            - key-value store
            - navigational DB
            - relational DB
        - persistent and durable

- why databases? 
    - faster and easier querying than flat files  
    - can be accessed by multiple users and applications at same time:
        - without stepping on each other's toes
        - accidentally undoing each other's changes
    - if two programs/users write a file at the same time, one will over write the other
        - "concurrency fail"
    - key-value store, and navigational DBs solve concurrency issues, 
        - relational DBs offer more flexible tools for:
            - querying and summarizing data
            - doing comparisons 
            - drawing connections between related sources of information
        - allow for constraints:    
            - these are rules to ensure changes to DB is consistent
            - to help protect the integrity of the DB

## relational databases

- all data is stored as tables in DBs

- at the heart of relational databases is how different pieces of data relate to each other 

- data types and meaning consistency are very relevant in DBs
    - though data might have the same type, it might not have the same meaning
    - for instance: '`Georgia`' has string datatype, but can mean:
        - a country 
        - a state 
        - a font name
        - a person's name
    - these meanings have to be considered when writing to code for DBs
    - do not store full names in some cells and surnames in others in the same column for exmaple
        - the meaning, and hence the integrity of the data suffers so
    
#### anatomy of a table:

- table name
    - column headers 
        - columns name
        - column type
    - body
        - rows
            - columns

#### aggregation: 

- summarizes multiple rows into a single row
- anytime a single value is computed from a set of values

- aggregation usually answers some question about a DB summary

- common SQL aggregation functions:

        count   # how many rows?
        avg     # average of numbers?
        max     # largest of numbers?
        min     # smallest of numbers?
        sum     # summation of numbers?

#### queries:

- the code must connect to the DB first before sending out queries 

- SQL queries are sent out by code to DBs
    - through a network (i.e. tcp/ip)
    - library on a local disk
    - the implementation specifics varies
        - with different databases
            - mySQL
            - postgreSQL
            - mongoDB
        - different coding languages
            - python
            - javascript 
            - C++ 
    - but the underlying concepts and general structure of interaction are the same 

- a result for the query is returned by the DB

#### related tables

- the values in two different tables mean the same thing
    - but are related by some constraint

#### uniqueness and key

- though there might be two people with the same first name and last name, 
    - they are still two different people
    - their grades/parking tickets can't be switched for example

- DB tables assign this uniqueness by using a row ID
    - these unique identifier is called a *primary key*
    - user IDs, numerical IDs, comment ID etc are examples
    - the data sometimes provides a unique key in one of the columns 
        - but this is not the case with every dataset
        - zip-codes are used to uniquely identify areas
            - a lot of areas might have same names and cannot be uniquely identified with their name
    - a primary key has to be definitely unique, not maybe unique

#### joining tables

- tables can be joined based on a query to make a new table that has information specific to the query

<hr>

# sql

- SQL: Structured Query Language
    - language designed for 
        - managing relational DB management systems (RDBMS)
        - stream processing relational data stream management systems (RDSMS)
    - was made an ISO standard in 1987
    - developed at IBM, initially called SEQUEL: Structured English Query Language

#### data types

- a lot of types are recognized in SQL (refer to docs), some of them are:
    - text: like python `str` type
    - integer: like python `int` but different limits
    - date: `YYYY-MM-DD`

- always put 'single quotes' around 'text' strings and 'data/time' values

- more specific types in each kind:
    - text:
        - text: python `str` like
        - char(n): str of n characters
        - varchar(n): str of up to n chars
    - numeric types:
        - integer: python `int` like
        - real: python `float` like
        - double precision: up 15 decimals 
        - decimal: an exact decimal value
    - data and time:
        - date: calendar date i.e. - YYYY-MM-DD
        - time: time of day
        - timestamp: date and time together

- no standard way to get all headers of all the database
    - varied ways in different distributions 
        - postgreSQL: `\dt` and `\d tablename`
        - MySQL: `show tables` and `describe tablename`
        - SQLite: `.tables` and `.schema tablename`
    - can be done only from the DB console or dedicated DB admin software
        - not from the code
    - because SQL was made a long time back 
        - when applications were first made with flowcharts and algorithms first 
            - then the computer was even touched
        - so SQL inherently made the assumption that the application maker would already know all the headers from the flowcharts and software blueprints
            - a dire lack of foresight, I must add

#### SQL query mechanics

- query syntax:

        QUERY_NAME = "select max(name) from animals;"
        
        OR 

        QUERY_NAME = '''
        select name, count(*) as num from animals
        group by name
        order by num desc
        limit 5;
        '''

- useful query clauses:

    - `SELECT` is the query keyword:
    - `select table limit count offset skip`

            ... limit 10 offset 150

    - `select table order by columns desc`

            ... order by species, name 
            ... order by species, name desc

    - `group by columns`

            ... select species, min(birthdate) from animals group by species;

    - `select name, count(*) as num from animals group by name;`

#### adding rows

- `insert into table values (42,'stuff');

