---
layout: post
title: networking - notes 3 - fullstack web server 
artist: 
artistLink: 
track: 
trackLink: 
tags: [networking, flask, python, full-stack, CRUD, API end-points, JSON ]
---

## contents

- [database operations](#database-operations)
    - [CRUD](#crud)
    - [SQL and CRUD](#sql-and-crud)
    - [structuring app DB](#structuring-app-db)
- []()
- []()
- []()
- []()
- []()
- []()
- []()

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

## ORM
- ORM: Object Relational Mapping 
    - translation interface between `python` and SQL 
        - object to query mapping
        - return values to object mapping

    <img class="plot mx-auto text-center img-fluid" src="/media/blogAssets/networking/orm.png" alt="comp-exp-2">

    *fig: DB data-type [arguments](https://classroom.udacity.com/courses/ud197/lessons/b8756d6f-2072-4511-9a46-33579413153d/concepts/35140186510923){: target="_blank"}*
    {: style="font-size: 80%; text-align: center;"}

    - [SQL Alchemy](https://docs.sqlalchemy.org/en/13/intro.html){: target="_blank"} is an ORM for `python`
    



<hr>

## references

- [google oauth 2.0 playground](https://developers.google.com/oauthplayground/){: target="_blank"}