# seng513-202401-group-20

# How to run application locally

## Prerequisites

Before running the application, ensure that you have Docker and Docker Compose installed on your system.

- Docker installation guide: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose installation guide: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

1. Clone the repository.

2. Create a `.env.local` file in the root directory of the project and copy-paste the following:

   ```
   MONGO_CONNECTION_STRING=mongodb://mongodb_container:27017/matchAid
   MONGO_CONNECTION_STRING_DEV=mongodb://localhost:27017/matchAid
   NEXT_AUTH_SECRET=
   NEXTAUTH_URL=http://localhost:3000
   ENVIORNMENT=development
   ```

   For `NEXT_AUTH_SECRET`, run this command `openssl rand -base64 32` and copy-paste the result as the value.

3. Run the following command in the root directory of the project:

   ```
   docker-compose -f docker-compose.yaml up -d --build
   ```

   This command will start the MongoDB container, the app container, and the seeding script container that runs the script to seed the database with sample data.

4. The application should now be running on [http://localhost:3000](http://localhost:3000).

5. Use the following credentials to login:

   - Volunteer #1:

     - Email: user1@example.com
     - Password: test

   - Volunteer #2:

     - Email: user3@example.com
     - Password: test

   - Organization #1:

     - Email: user2@example.com
     - Password: test

   - Organization #2:

     - Email: charity@gmail.com
     - Password: test

   - Organization #3:

     - Email: community@gmail.com
     - Password: test

   - Organization #4:

     - Email: animal_rescue@gmail.com
     - Password: test

   - Admin:

     - Email: user4@example.com
     - Password: test

# Running the seed script

--- Schema Scripts ---

/src/models/users.ts
/src/models/opportunities.ts
/src/models/reviews.ts

Since we are using a NoSQL database (MongoDB), the schema scripts
don't need to be ran - they are used as templates for new data.

# Automatic Seeding (Recommended for Development)

Create a .env file in the root directory if it does not exist and define the MongoDB connection string:

NOTE: `your-database` should be replaced with the name of your MongoDB database. We are using `matchAid`, we recommend using the same name.

```

MONGO_CONNECTION_STRING=mongodb://mongodb_container:27017/your-database

# Replace your-database with the name of your MongoDB database.

```

Create a .env.local file as well and include the connection string once again:

```

MONGO_CONNECTION_STRING=mongodb://mongodb_container:27017/your-database

# Replace your-database with the name of your MongoDB database.

```

Build and run the Docker containers using Docker Compose:

```

docker-compose -f docker-compose-dev.yaml up -d --build

# This command will start the MongoDB container and the seeding script container that runs the script to seed the database with sample data.

# NOTE: This will not start the app container and only the mongodb and seeding script containers.

```

## How to test it worked

1. Open a new terminal window and run the following command to enter the MongoDB container:

```
   docker exec -it seng513-202401-group-20-mongodb_container-1 mongosh
```

2.  Run the following command to switch to the database: `use <your-database>`

3.  Run the following command to view the collections: `show collections`

4.  Run the following command to view the documents in the users collection:
    `      db.users.find()`
5.  Run the following command to view the documents in the opportunities collection:
    `        db.opportunities.find()`
6.  Run the following command to view the documents in the reviews collection:
    `           db.reviews.find()`

# Manual Seeding

--- Seeding Scripts ---

/seeding/users_sample.json
/seeding/opportunities_sample.json
/seeding/reviews_sample.json

How to use the .json files to seed the database with sample data:

1. Install MongoDB Command Line Database Tools here:
   https://www.mongodb.com/try/download/database-tools

2. Use the following command. Replace <COLLECTIONNAME> and <FILENAME> with the collection and it's corresponding sample .json file.
   mongoimport --uri "MONGO_URL" --db SENG513Project --collection <COLLECTIONNAME> --jsonArray --file <FILENAME>

3. The database should now be populated!
