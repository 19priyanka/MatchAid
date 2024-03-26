import mongoose from "mongoose";
const { Schema } = mongoose;

const opportunitySchema = new Schema(
  {
    organization: {
      id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    volunteersNeeded: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    signedUpUsers: [
      {
        fullName: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Declined"],
      required: true,
    },
  },
  { versionKey: false }
);

const OpportunityModel = mongoose.model("Opportunity", opportunitySchema);
export { OpportunityModel };
