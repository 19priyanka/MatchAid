import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { Opportunity } from "../../../../backend/types/Opportunity";
import { opportunitySignUp } from "../../../../backend/models/opportunity.model";

type Data = Opportunity | DefaultResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { email, opportunityId, reason, hoursOfAvailability } = req.body;
    if (!email || !opportunityId || !reason || !hoursOfAvailability) {
      res.status(400).json({ message: "Missing field" });
    }

    await connectMongooseClient();

    const opportunity: Opportunity = await opportunitySignUp({
      email,
      opportunityId,
      reason,
      hoursOfAvailability,
    });

    res.status(200).json(opportunity);
  } catch (error) {
    console.error("Server error:", error);
  }
}
