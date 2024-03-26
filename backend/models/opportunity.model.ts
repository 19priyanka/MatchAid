import { OpportunityModel } from "../../src/models/opportunities";
import { Opportunity, Status } from "../types/Opportunity";

const getOpportunities = async (
  email: string,
  userType: string
): Promise<Opportunity[]> => {
  let opportunities: Opportunity[] = [];
  if (userType === "volunteer") {
    opportunities = (await OpportunityModel.find({
      status: Status.Accepted, // Cast the status to the correct type
      time: { $gte: new Date() },
    })
      .exec()
      .then((opportunities) => {
        return opportunities.filter(
          (opportunity) =>
            !opportunity.signedUpUsers.find((user) => user.email === email)
        );
      })) as Opportunity[];
  } else if (userType === "organization") {
    opportunities = (await OpportunityModel.find({
      "organization.email": email,
    }).exec()) as Opportunity[];
  } else if (userType === "administrator") {
    opportunities = (await OpportunityModel.find({}).exec()) as Opportunity[];
  } else {
    throw new Error("Invalid user type");
  }

  return opportunities;
};

export { getOpportunities };
