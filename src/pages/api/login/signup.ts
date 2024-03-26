import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { signup } from "../../../../backend/models/user.model";
import { SafeUser } from "../../../../backend/types/User";

type Data = SafeUser | { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (!req.body.email || !req.body.password || !req.body.fullName) {
      res.status(400).json({
        message: "Email, password, full name and user type is required",
      });
    }
    await connectMongooseClient();

    const signUp: SafeUser = await signup(req.body);

    res.status(200).json(signUp);
  } catch (error) {
    console.error("Server error:", error);
  }
}
