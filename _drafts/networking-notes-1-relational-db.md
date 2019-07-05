---
layout: post
title: networking - notes 1 - relational databases
artist: Hellberg ft. Cozi Zuehlsdorff
artistLink: https://www.discogs.com/artist/4510244-SvanteG
track: The Girl (SvanteG Remix)
trackLink: https://youtu.be/pskEFtzOkz8
tags: [networking, database, relational database, SQL queries ]
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
                - values

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

- a lot of types are recognized in SQL (refer to docs), generic types are:
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

#### SQL query 

- `select ... from ... where ...` query:
    - example: `select name, birthdate from animals where species = 'gorilla';`
    - query keyword: `select`
        - `select` columns: '`name, birthdate`'
    - query keyword: `from`
        - table: ``animals``
    - query keyword: `where`
        - `select` only rows `where` column `species`  reads `gorilla`

- SQL boolean operators: `and`, `or` and `not`
    - `and` example: 
        - `select name, birthdate from animals where species = 'gorilla' and name = 'Max';`
    - `not` example:
        - `select name from animals where (not species = 'gorilla') and (not name = 'Max');`
        - `select name from animals where species != 'gorilla' and name != Max;`
    - `or` example:
        - `select name from animals where not (species = 'gorilla' or name = 'Max');`

- SQL comparison operators: `=`,`<`,`>`,`<=`, `>=`, `!=`
    - `select name from animals where birthdate > '1995-01-01' and birthdate < '1998-12-31' and species == 'llama'`
    - to find *llamas* that were *born between 1995 and 1998*

    <img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/networking/llama.png" alt="llama">

    *fig: name of the llama returned*
    {: style="font-size: 80%; text-align: center;"}


#### query modifiers 
- modifiers along with the select keyword to create select clauses:
- some commonly used modifiers:
    - `LIMIT count OFFSET skip`
        -  `OFFSET` is optional
        - `count` and `skip` are whole numbers
        - eg: `limit 10 offset 150` 
    - `ORDER BY columns DESC`
        - `ORDER BY`: sort by 
        - columns: specify column to sort by
        - `DESC`: optional 
            - sort is ascending by default
            - if this modifier is set, then it is descending 
        - `order by species, name`
    - `GROUP BY columns`
        - used for aggregation (summarizing in numbers)
        - selects the columns whose values to use as groupings for aggregation
        - eg.: `select species, min(birthdate) from animals group by species;`
            - for each species of animal, find the smallest value of the birthdate column
                - i.e. the oldest animal's birthdate
    - `AS num`
        - labels the returned column header as `num`
        - eg: `select name, count(*) as num from animals group by name;`
            - `count(*)`: count all the rows..
            - `as num`: and call the count column `num`
            - `group by name`
                - aggregate by values of the name column
- filter modifiers:
    - `WHERE`:
        - filters only directly on columns values 
        - does not apply to output of processed values 
            - i.e. `count(*)`, `AS num`
    - `HAVING`:
        - having filters the processed table
        

#### why a DB language?
- `python` synonyms of some sql queries:
    - `count(*)`:`len(rsults)`
    - `limit 100 offset 10`: `results[10:100]`
    - `order by column`: `sorted(results, key = lambda x:x[column])`
    - speed and space are the differentiation factors:
        - DBs are designed to be fast and take up much lesser memory than python program
        - DBs allow indexing which increases query results' return speed

#### SQL header problem

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
- summarizing this issue: 
    - column header must be specified to call the column in the query
    - but no way to get all the columns in the header
    - so the column headers must be known before hand 
    - or a tool specific to the distribution has to be used


#### exploring query examples
- more query examples:
    - `QUERY = "select max(name) from animals;"`
    - `QUERY = "select * from animals limit 10;"`
        - select first 10 values from the animal tables 
    - `QUERY = "select * from animals where species = 'orangutan' order by birthdate;"`
        - select 10 animals such that 
            - species is 'orangutan'
            - sort by (`order by`) birthdate
                - ascending by default
    - `QUERY = "select name from animals where species = 'orangutan' order by birthdate desc;"`
        - select column name from table animals 
        - select only species 'orangutan' 
        - `order by` (sort) birthdate descending 
    - `QUERY = "select name, birthdate from animals order by name limit 10 offset 20;"`
        - select name, birthdate columns from table animals 
        - `order by` (sort) name, 
        - only output 10 values 
        - begin selection from an offset of 20 values from the top
    - `QUERY = "select name, count(*) as num from animals group by name order by num desc limit 5;"`
        - selects name column from animals 
                - counts of each name is labelled `num` in returned data
                - `*`: selects all 
            - groups by name 
            - sorts by `num` in descending order
            - limits to first 5
    - `QUERY = "select species, min(birthdate) from animals group by species;"`
        - select species from animals 
            - only with the min(birthdate): lowest value of birthdate
        - group by species 
        - so outputs only the oldest animal's birthdate of each species
    - `QUERY = "select species, count(species) from animals group by species order by count(species) desc"`
        - returns the count of all species in table animals
            - with most populous at the top
    - `QUERY = "select food, count(animals.name) as num from diet join animals on diet.species = animals.species group by food having num = 1"`
        - returns the name of the food that is eaten only by only animal
        - `select food, count(animals.name) as num`: food and corresponding animals 
        - `from animals join diet`: from joined table of animals and diet
            - `diet.species = animals.species`: table joining condition
        - `group by food`: aggregate selection `food, count(animals.name)` by food
            - return only the food value with one
    
    


#### inserting (adding) rows

- `INSERT into table values (42,'stuff');`
    - if values being added aren't in the same order as the table's headers
        - `INSERT into table (col2, col1)  values ('stuff',42);`
- eg:
    ```
    INSERT_QUERY = '''
    insert into animals values ('Ribid','opossum','2019-12-12');
    '''
    ```

#### joining tables 

- `select T.thing, S.stuff from T join S on T.target = S.match`
    - `T.thing, S.stuff`: rows
    - `T join S`: joined tables 
    - `T.target = S.match`: join conditions 

- simple join: 
    - `select T.thing, S.stuff from T,S where T.target = S.match`
        - `T.thing, S.stuff`: rows
        - `T,S`: tables
        - `T.target = S.match`: restriction
            - condition to matches the rows of the two tables being joined 

- eg. `QUERY = "select animals.name from animals join diet on animals.species = diet.species where food = 'fish'"`
    - selects `animals.name` column 
    - from table obtained from joining animals and diet
    - matched on the common columns `animals.species` and `diet.species`
    - and filtered by `food = 'fish'`

<hr>

# creating DBs

- DB normalization: 
    - process of structuring relational DBs in accordance with 'normal forms'
    - to reduce data redundancy
    - to improve data integrity
- (informally,) a relational DB relation is often described as "normalized" if it meets third normal form

<hr>

## references 

- [Normalization](https://en.wikipedia.org/wiki/Database_normalization){: target="_blank"}
- [Guide to Normal Forms in RDB theory](http://www.bkent.net/Doc/simple5.htm){: target="_blank"}
- [UD 197](https://classroom.udacity.com/courses/ud197){: target="_blank"}