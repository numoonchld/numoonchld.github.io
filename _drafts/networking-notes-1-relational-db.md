---
layout: post
title: networking - notes 1 - relational databases
artist: Sander van Doorn 
artistLink: https://www.discogs.com/artist/183267-Sander-van-Doorn
track: Apple (Marcus Schossow Remix)
trackLink: https://youtu.be/Ska8KPbjrx4
tags: [networking, database, relational database, SQL, python DB-API ]
---

### data storage 

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

### relational databases



    