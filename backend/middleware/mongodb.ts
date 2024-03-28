import mongoose from "mongoose";

const connectMongooseClient = async () => {
  const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

  if (!mongoConnectionString) {
    throw new Error("Please define your mongo connection string.");
  }

  if (mongoose.connection.readyState) {
    return;
  }

  await mongoose.connect(mongoConnectionString);
};

export { connectMongooseClient };
