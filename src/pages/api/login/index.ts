import type { NextApiRequest, NextApiResponse } from "next";
import { SafeUser } from "../../../../backend/types/User";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { login } from "../../../../backend/models/user.model";

type Data = {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  createdAt: Date;
  userType: string;
  noOfTimesVolunteered?: number | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await connectMongooseClient();

    const { email, password } = req.body;
    const loginInfo: SafeUser = await login(email, password);

    res.status(200).json(loginInfo);
  } catch (error) {
    console.error("Server error:", error);
  }
}
