import { Review } from "../types/Review";
import { ReviewModel } from "../../src/models/reviews";
import { User } from "../types/User";

export interface PostReview
{
  reviewee: User;
  reviewer: User;
  description: string;
  rating: number;
}

const postReview = async(
  review: PostReview
): Promise<Review> =>
{
  const newReviewModel = new ReviewModel
  ({
    revieweeId: review.reviewee,
    reviewerId: review.reviewer,
    description: review.description,
    rating: review.rating,
    revieweeType: review.reviewee.userType,
  });

  const newReviewDocument = await newReviewModel.save();
  const newReview: Review = newReviewDocument.toObject() as Review;

  return newReview;
};

const getAllReviews = async (): Promise<Review[]> =>
{
  try
  {
    const reviews = await ReviewModel.find({}) as Review[];
    return reviews;
  }
  catch (error)
  {
    throw new Error("Error retrieving reviews");
  }
};

export {
  postReview,
  getAllReviews,
};