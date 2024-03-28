import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { User } from "../../../../backend/types/User";
import { getAllUsersForOpportunity } from "../../../../backend/models/opportunity.model";

type Data = User[] | DefaultResponse;

export default async function handler
(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)
{
  try
  {
    const { opportunityId } = req.query;
    if (!opportunityId)
    {
      res.status(400).json({ message: "Opportunity ID is required" });
      return;
    }

    await connectMongooseClient();

    const users: User[] = await getAllUsersForOpportunity(opportunityId as string);

    res.status(200).json(users);
  }
  catch (error)
  {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
