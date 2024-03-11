# seng513-202401-group-20

--- Schema Scripts ---

/src/models/users.ts
/src/models/opportunities.ts
/src/models/reviews.ts

Since we are using a NoSQL database (MongoDB), the schema scripts
don't need to be ran - they are used as templates for new data.

--- Seeding Scripts ---

/seeding/users_sample.json
/seeding/opportunities_sample.json
/seeding/reviews_sample.json

How to use the .json files to seed the database with sample data:

1. Install MongoDB Command Line Database Tools here:
   https://www.mongodb.com/try/download/database-tools

2. Use the following command. Replace <COLLECTIONNAME> and <FILENAME> with the collection and it's corresponding sample .json file.
   mongoimport --uri "mongodb+srv://seng513:D4WDUnFyQGJT9GKV@seng513project.dtklxtd.mongodb.net/" --db SENG513Project --collection <COLLECTIONNAME> --jsonArray --file <FILENAME>

3. The database should now be populated!
