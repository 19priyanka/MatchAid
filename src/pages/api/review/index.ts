import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongooseClient } from "../../../../backend/middleware/mongodb";
import { DefaultResponse } from "../login";
import { postReview } from "../../../../backend/models/review.model";
import { Review } from "../../../../backend/types/Review";

type Data = Review | DefaultResponse;

export default async function handler
(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)
{
  try
  {
    const
    {
      reviewee,
      reviewer,
      description,
      rating,
    } = req.body;
    if
    (
      !reviewee ||
      !reviewer ||
      !description ||
      !rating ||
    )
    {
      res.status(400).json({ message: "Missing field" });
    }

    await connectMongooseClient();

    const review: Review = await postReview
    ({
      reviewee,
      reviewer,
      description,
      rating,
    });

    res.status(200).json(review);
  }
  catch (error)
  {
    console.error("Server error:", error);
  }
}
