import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { Opportunity } from "../../../../backend/types/Opportunity";
import { getVolunteerOpportunities } from "../../../../backend/models/opportunity.model";

type Data = Opportunity[] | DefaultResponse;

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

    const opportunities: Opportunity[] = await getVolunteerOpportunities(email);

    res.status(200).json(opportunities);
  } catch (error) {
    console.error("Server error:", error);
  }
}
