import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import {
  editProfile,
  updatePassword,
} from "../../../../backend/models/user.model";
import { SafeUser, User } from "../../../../backend/types/User";
import { DefaultResponse } from "../login";

type Data = SafeUser | DefaultResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!req.body.email) {
      res.status(400).json({ message: "Email is required" });
    }

    if (!req.body.oldPassword) {
      res.status(400).json({ message: "Old password is required" });
    }

    if (!req.body.newPassword) {
      res.status(400).json({ message: "New password is required" });
    }
    await connectMongooseClient();

    const { success, msg } = await updatePassword(
      email,
      oldPassword,
      newPassword
    );

    if (!success) {
      res.status(400).json({ message: msg });
    }

    res.status(200).json({ message: msg });
  } catch (error) {
    console.error("Server error:", error);
  }
}
