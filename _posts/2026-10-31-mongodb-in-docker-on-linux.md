---
layout: post
title: mongodb docker in linux (ubuntu)
date: 2026-10-31
updated: 
artist: 
artistLink: 
track: 
trackLink: 
tags: [docker, mongodb, ubuntu]
---

First things first, install `docker` snap by Canonical in the App Store on Ubuntu.

To start a MongoDB Docker container in Linux, run the following docker run command in your terminal:
```bash
docker run -d \
  --name my-mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secretpassword \
  mongo:latest
```
(Note: If you get a permission error, prepend `sudo` to the command.) 

What this command does:

- `-d`: Runs the container in detached mode (in the background).
- `--name my-mongodb`: Assigns a custom name to your container so you can easily manage it. 
- `-p 27017:27017`: Maps the host port 27017 to the container port 27017. 
- `-v mongodb_data:/data/db`: Creates a persistent Docker volume so your databases aren't deleted when the container stops. 
- `-e MONGO_INITDB_ROOT...`: Sets up mandatory admin authentication credentials for security. 
- `mongo:latest`: Pulls and uses the official MongoDB image from Docker Hub. 

**Useful Follow-Up Commands**

- Verify it is running:bash
```bash
docker ps
```

- Access the MongoDB shell (mongosh) inside the container:bash
```bash
docker exec -it my-mongodb mongosh -u admin -p secretpassword`
```

- Stop the container:bash
```bash
ocker stop my-mongodb
```

- Start it again later: 
```bash
docker start my-mongodb
```

**Connecting to local NodeJS application**

To connect your Node.js application to your MongoDB Docker container, use the mongodb or mongoose npm packages with a standard connection string.
Because the Docker container maps port 27017 to your Linux host, your Node app can talk to it using localhost (if the Node app is running directly on your host machine).

Here is the exact connection string based on the credentials used in the previous step:

```text
mongodb://admin:secretpassword@localhost:27017/mydatabase?authSource=admin
```


Step-by-Step Implementation


- Install the Driver

In your Node.js project folder, install Mongoose (or the native MongoDB driver):
```bash
npm install mongoose
```

- Add the Connection Code

Create or update your server file (e.g., index.js or server.js) with the following clean connection snippet:
```javascript
const mongoose = require('mongoose');

// Best practice: Use environment variables for the URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:secretpassword@localhost:27017/mydatabase?authSource=admin';

mongoose.connect(MONGO_URI)
  .then(() => console.log('🚀 Successfully connected to MongoDB Docker container!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));
```

Critical Troubleshooting Steps

If your application throws a MongooseServerSelectionError or fails to connect, verify these three settings:
- Authentication Source: You must include `?authSource=admin` at the end of the URI. This tells MongoDB to validate the admin user against the admin database, even if you are writing data to a different database (like mydatabase).
- Container Status: Ensure the container is actively running by executing docker ps in your Linux terminal.
- Network Context:
  - If your Node app is running directly on Linux, use localhost.
  - If your Node app is also running inside a Docker container, localhost will not work. You need to put both containers on the same Docker network and replace localhost with the MongoDB container's name (my-mongodb).


