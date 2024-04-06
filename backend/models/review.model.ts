import { Review } from "../types/Review";
import { ReviewModel } from "../../src/models/reviews";
import { UserModel } from "../../src/models/users";
import { ReviewInfo } from "../../src/pages/api/admin/reviews";

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

const getAllReviews = async (): Promise<ReviewInfo[]> =>
{
  try
  {
    const reviews = await ReviewModel.find({});

    const reviewInfos: ReviewInfo[] = [];

    for (const review of reviews)
    {
      const reviewee = await UserModel.findById({_id: review.revieweeId});
      const reviewer = await UserModel.findById({_id: review.reviewerId});

      if (reviewee && reviewer)
      {
        const reviewInfo: ReviewInfo = {
          review,
          reviewee,
          reviewer
        };
        reviewInfos.push(reviewInfo);
      }
    }

    return reviewInfos;
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
