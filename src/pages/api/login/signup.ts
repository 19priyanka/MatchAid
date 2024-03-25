import type { NextApiRequest, NextApiResponse } from "next";
import { getMongoClient } from "../../../../backend/middleware/mongodb";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await getMongoClient();
    console.log("Connected to MongoDB");

    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
