import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      userType: {
        type: String,
        enum: ['Volunteer', 'Organization'],
        required: true,
      },
      phoneNumber: {
        type: String,
      },
      fullName: {
        type: String,
        required: true,
      },
      noOfTimesVolunteered: {
        type: Number,
      },
      createdAt: {
        type: Date,
        required: true,
      },
    },
    { versionKey: false }
  );
  
const UserModel = mongoose.model("User", userSchema);
export { UserModel };