import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    revieweeId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    reviewerId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    revieweeType: {
      type: String,
      enum: ["Volunteer", "Organization"],
      required: true,
    },
  },
  { versionKey: false }
);

const ReviewModel =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewSchema);

export { ReviewModel };
