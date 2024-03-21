# seng513-202401-group-20

--- Schema Scripts ---

/src/models/users.ts
/src/models/opportunities.ts
/src/models/reviews.ts

Since we are using a NoSQL database (MongoDB), the schema scripts
don't need to be ran - they are used as templates for new data.

# Automatic Seeding

Create a .env file in the root directory if it does not exist and define the MongoDB connection string:

```
MONGO_CONNECTION_STRING=mongodb://localhost:27017/matchAid
# Replace your-database with the name of your MongoDB database.
```

Build and run the Docker containers using Docker Compose:

```
docker-compose up --build
# This command will start the MongoDB container, the app container, and the seeding script container that runs the script to seed the database with sample data.
```

Access the app:

Once Docker Compose has finished setting up the containers, you can access the app by visiting http://localhost:3000 in your web browser.

# Manual Seeding (Recommended for Development)

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
