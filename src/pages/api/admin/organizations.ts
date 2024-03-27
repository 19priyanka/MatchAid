import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { User } from "../../../../backend/types/User";
import { getAllOrganizations } from "../../../../backend/models/user.model";

type Data = User[] | DefaultResponse;

export default async function handler
(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)
{
  try
  {
    await connectMongooseClient();

    const organizations: User[] = await getAllOrganizations();

    res.status(200).json(organizations);
  }
  catch (error)
  {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
