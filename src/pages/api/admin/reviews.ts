import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { Review } from "../../../../backend/types/Review";
import { getAllReviews } from "../../../../backend/models/review.model";

type Data = Review[] | DefaultResponse;

export default async function handler
(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)
{
  try
  {
    await connectMongooseClient();

    const reviews: Review[] = await getAllReviews();

    res.status(200).json(reviews);
  }
  catch (error)
  {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
