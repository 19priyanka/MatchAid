import mongoose from "mongoose";

import opportunitiesData from "./opportunities_sample.json" assert { type: "json" };
import reviewsData from "./reviews_sample.json" assert { type: "json" };
import usersData from "./users_sample.json" assert { type: "json" };

const { Schema } = mongoose;

const opportunitySchema = new Schema(
  {
    organization: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
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
        reason: {
          type: String,
          required: true,
        },
        hoursOfAvailability: {
          type: Number,
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

const OpportunityModel =
  mongoose.models.Opportunities ||
  mongoose.model("Opportunities", opportunitySchema);

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
      enum: ["Volunteer", "Organization", "Admin"],
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
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
);

const UserModel = mongoose.models.Users || mongoose.model("Users", userSchema);

async function seedDatabase() {
  const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;

  if (!mongoConnectionString) {
    throw new Error("Please define your mongo connection string.");
  }

  console.log("Connecting to MongoDB...");
  mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  db.once("open", async () => {
    console.log("Connected to MongoDB");

    try {
      console.log("Clearing existing data...");
      await Promise.all([
        ReviewModel.collection.drop(),
        OpportunityModel.collection.drop(),
        UserModel.collection.drop(),
      ]);

      console.log("Seeding users data...");
      const createdUsers = await UserModel.insertMany(usersData);
      const volunteerUsers = createdUsers.filter(user => user.userType === "Volunteer");
      const organizationUsers = createdUsers.filter(user => user.userType === "Organization");

      console.log("Seeding opportunities data...");
      const opportunities = opportunitiesData.map((opportunity) => {
        const signedUpUsers = volunteerUsers.map(user => ({
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          reason: "Wanted to help out!",
          hoursOfAvailability: 1
        }));
        if (opportunity.name == "Tutoring Program 1")
        {
          return {
            ...opportunity,
            signedUpUsers: signedUpUsers,
          };
        }
        else
        {
          const randomVolunteerIndex = Math.floor(Math.random() * volunteerUsers.length);
          const randomVolunteer = signedUpUsers[randomVolunteerIndex];

          return {
            ...opportunity,
            signedUpUsers: randomVolunteer,
          };
        }
      });
      await OpportunityModel.insertMany(opportunities);

      console.log("Seeding reviews data...");
      const reviews = reviewsData.map((review) => {
        const randomVolunteerIndex = Math.floor(Math.random() * volunteerUsers.length);
        const randomOrganizationIndex = Math.floor(Math.random() * organizationUsers.length);
        const randomVolunteer = volunteerUsers[randomVolunteerIndex];
        const randomOrganization = organizationUsers[randomOrganizationIndex];
        const random = Math.random();
        return {
          ...review,
          revieweeId: random < 0.5 ? randomVolunteer._id : randomOrganization._id,
          reviewerId: random < 0.5 ? randomOrganization._id : randomVolunteer._id,
          revieweeType: random < 0.5 ? "Volunteer" : "Organization"
        };
      });
      await ReviewModel.insertMany(reviews);

      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    } finally {
      mongoose.disconnect();
    }
  });
}

seedDatabase();
