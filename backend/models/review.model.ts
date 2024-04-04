import { Review } from "../types/Review";
import { ReviewModel } from "../../src/models/reviews";
import { UserModel } from "../../src/models/users";

export interface PostReview
{
  revieweeEmail: string;
  reviewerEmail: string;
  description: string;
  rating: number;
}

const postReview = async(review: PostReview): Promise<Review> => {
  const revieweeUser = await UserModel.findOne({ email: review.revieweeEmail });
  if (!revieweeUser) {
    throw new Error(`Reviewee with email ${review.revieweeEmail} not found`);
  }

  const reviewerUser = await UserModel.findOne({ email: review.reviewerEmail });
  if (!reviewerUser) {
    throw new Error(`Reviewer with email ${review.reviewerEmail} not found`);
  }

  const newReviewModel = new ReviewModel({
    revieweeId: revieweeUser._id,
    reviewerId: reviewerUser._id,
    description: review.description,
    rating: review.rating,
    revieweeType: revieweeUser.userType,
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
