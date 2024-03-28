import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { getUser } from "../../../../backend/models/user.model";
import { SafeUser } from "../../../../backend/types/User";
import { DefaultResponse } from "../login";

type Data = SafeUser | DefaultResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
    }
    await connectMongooseClient();

    const user: SafeUser = await getUser(email);

    res.status(200).json(user);
  } catch (error) {
    console.error("Server error:", error);
  }
}
