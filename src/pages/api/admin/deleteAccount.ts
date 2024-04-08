import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { User, UserType } from "../../../../backend/types/User";
import {
  deleteAccount,
  getAllVolunteers,
} from "../../../../backend/models/user.model";

type Data = User[] | DefaultResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { userEmail, userType } = req.body;
    if (!userEmail) {
      res.status(400).json({ message: "Email is required" });
    }
    if (!userType) {
      res.status(400).json({ message: "User type is required" });
    }
    if (!Object.values(UserType).includes(userType)) {
      res.status(400).json({ message: "Invalid user type" });
    }

    await connectMongooseClient();

    const { success, msg } = await deleteAccount(userEmail, userType);

    if (!success) {
      res.status(400).json({ message: msg });
    }

    res.status(201).json({ message: msg });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
