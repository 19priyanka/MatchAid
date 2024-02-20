import { MongoClient } from "mongodb";

let client: MongoClient | undefined;

const getMongoClient = async () => {
  const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

  if (!mongoConnectionString) {
    throw new Error("Please define your mongo connection string.");
  }

  if (!client) {
    client = new MongoClient(mongoConnectionString);
  }

  await client.connect();
  return client;
};

export { getMongoClient };
