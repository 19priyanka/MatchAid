import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { Opportunity } from "../../../../backend/types/Opportunity";
import { postOpportunity } from "../../../../backend/models/opportunity.model";

type Data = Opportunity | DefaultResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const {
      name,
      time,
      description,
      volunteersNeeded,
      duration,
      location,
      email,
    } = req.body;
    if (
      !name ||
      !time ||
      !description ||
      !volunteersNeeded ||
      !duration ||
      !location ||
      !email
    ) {
      res.status(400).json({ message: "Missing field" });
    }

    if (isNaN(Date.parse(time))) {
      res.status(400).json({ message: "Invalid time string" });
    }

    await connectMongooseClient();

    const opportunity: Opportunity = await postOpportunity({
      name,
      time,
      description,
      volunteersNeeded,
      duration,
      location,
      email,
    });

    res.status(200).json(opportunity);
  } catch (error) {
    console.error("Server error:", error);
  }
}
