import type { NextApiRequest, NextApiResponse } from "next";
import { getMongoClient } from "../../../backend/middleware/mongodb";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await getMongoClient();
  console.log("Hello from the backend! Connected to MongoDB.");
  res.status(200).json({ name: "John Doe" });
}
