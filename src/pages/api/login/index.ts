import type { NextApiRequest, NextApiResponse } from "next";
import { SafeUser } from "../../../../backend/types/User";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { login } from "../../../../backend/models/user.model";

export interface DefaultResponse {
  message: string;
}

type Data =
  | {
      fullName: string;
      email: string;
      phoneNumber?: string | null;
      createdAt: Date;
      userType: string;
      noOfTimesVolunteered: number;
    }
  | DefaultResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
    }
    await connectMongooseClient();

    const loginInfo: SafeUser = await login(email, password);

    res.status(200).json(loginInfo);
  } catch (error) {
    console.error("Server error:", error);
  }
}
