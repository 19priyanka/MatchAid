import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { updateOpportunity } from "../../../../backend/models/opportunity.model";
import { DefaultResponse } from "../login";
import { Opportunity } from "../../../../backend/types/Opportunity";

type Data = Opportunity | DefaultResponse;

export default async function handler
(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)
{
  try
  {
    if (!req.body.name || !req.body.status) {
      res.status(400).json({ message: "Opportunity ID and status are required" });
    }
    await connectMongooseClient();

    const updatedOpportunity: Opportunity = await updateOpportunity(req.body);

    res.status(200).json(updatedOpportunity);
  } catch (error) {
    console.error("Server error:", error);
  }
}
