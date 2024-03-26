import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { editProfile, signup } from "../../../../backend/models/user.model";
import { SafeUser, User } from "../../../../backend/types/User";
import { DefaultResponse } from "../login";

type Data = SafeUser | DefaultResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (!req.body.email) {
      res.status(400).json({ message: "Email is required" });
    }
    await connectMongooseClient();

    const updatedProfile: User = await editProfile(req.body);

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Server error:", error);
  }
}
