import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { Opportunity } from "../../../../backend/types/Opportunity";
import { getOpportunities } from "../../../../backend/models/opportunity.model";
import { UserType } from "../../../../backend/types/User";

type Data = Opportunity[] | DefaultResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { email, userType } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
    }

    if (!userType) {
      res.status(400).json({ message: "User type is required" });
    }

    if (!Object.values(UserType).includes(userType)) {
      res.status(400).json({ message: "Invalid user type" });
    }

    await connectMongooseClient();

    const opportunities: Opportunity[] = await getOpportunities(
      email,
      UserType[userType as UserType]
    );

    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Server error:", error);
  }
}
