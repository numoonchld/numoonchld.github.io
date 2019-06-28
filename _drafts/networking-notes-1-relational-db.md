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

# relational databases

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
    
### anatomy of a table:

- table name
    - column headers 
        - columns name
        - column type
    - body
        - rows
            - columns

     
### aggregation: 

- summarizes multiple rows into a single row
- anytime a single value is computed from a set of values

- common SQL aggregation functions:

        count   # how many rows
        avg     # average of numbers
        max     # largest of numbers
        min     # smallest of numbers
        sum     # summation of numbers

### queries:

- 