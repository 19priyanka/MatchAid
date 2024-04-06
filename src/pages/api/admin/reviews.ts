import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { Review } from "../../../../backend/types/Review";
import { getAllReviews } from "../../../../backend/models/review.model";
import { SafeUser } from "../../../../backend/types/User";

type Data = ReviewInfo[] | DefaultResponse;

export interface ReviewInfo
{
  review: Review;
  reviewee: SafeUser;
  reviewer: SafeUser;
}

export default async function handler
(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)
{
  try
  {
    await connectMongooseClient();

    const reviews: ReviewInfo[] = await getAllReviews();

    res.status(200).json(reviews);
  }
  catch (error)
  {
    console.error("Server error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
