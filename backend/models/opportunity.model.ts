import { OpportunityModel } from "../../src/models/opportunities";
import { Opportunity, Status } from "../types/Opportunity";
import { UserType } from "../types/User";

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

export { getOpportunities, getVolunteerOpportunities };
