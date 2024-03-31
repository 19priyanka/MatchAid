import mongoose from "mongoose";

const connectMongooseClient = async () => {
  let mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
  if (process.env.ENVIORNMENT === "development") {
    mongoConnectionString = process.env.MONGO_CONNECTION_STRING_DEV;
  }

  if (!mongoConnectionString) {
    throw new Error("Please define your mongo connection string.");
  }

  if (mongoose.connection.readyState) {
    return;
  }

  await mongoose.connect(mongoConnectionString);
};

export { connectMongooseClient };
