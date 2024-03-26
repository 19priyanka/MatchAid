import { ObjectId } from "mongodb";
import { OpportunityModel } from "../../src/models/opportunities";
import { Opportunity, Status } from "../types/Opportunity";
import { UserType } from "../types/User";
import { getUser } from "./user.model";

export interface OpportunitySignUp {
  opportunityId: string;
  email: string;
  reason: string;
  hoursOfAvailability: number;
}

const getOpportunities = async (
  email: string,
  userType: UserType
): Promise<Opportunity[]> => {
  let opportunities: Opportunity[] = [];
  if (userType === UserType.Volunteer) {
    opportunities = (await OpportunityModel.find({
      status: Status.Accepted, // Cast the status to the correct type
      time: { $gte: new Date() },
      "signedUpUsers.email": { $ne: email },
    }).exec()) as Opportunity[];
  } else if (userType === UserType.Organization) {
    opportunities = (await OpportunityModel.find({
      "organization.email": email,
    }).exec()) as Opportunity[];
  } else if (userType === UserType.Admin) {
    opportunities = (await OpportunityModel.find({}).exec()) as Opportunity[];
  } else {
    throw new Error("Invalid user type");
  }

  return opportunities;
};

const getVolunteerOpportunities = async (
  email: string
): Promise<Opportunity[]> => {
  return (await OpportunityModel.find({
    status: Status.Accepted,
    "signedUpUsers.email": email,
  }).exec()) as Opportunity[];
};

const opportunitySignUp = async (
  signUpData: OpportunitySignUp
): Promise<Opportunity> => {
  let user;
  try {
    user = await getUser(signUpData.email);

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error("opportunitySignUp - error getting user");
  }

  const opportunity = (await OpportunityModel.findOneAndUpdate(
    { _id: new ObjectId(signUpData.opportunityId) },
    {
      $push: {
        signedUpUsers: {
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          reason: signUpData.reason,
          hoursOfAvailability: signUpData.hoursOfAvailability,
        },
      },
    },
    { new: true }
  )) as Opportunity;

  if (!opportunity) {
    throw new Error("Opportunity not found");
  }

  return opportunity;
};

export { getOpportunities, getVolunteerOpportunities, opportunitySignUp };
