import { ObjectId } from "mongodb";

export interface Opportunity {
  _id: ObjectId;
  organization: {
    name: string;
    email: string;
  };
  name: string;
  time: Date;
  description: string;
  volunteersNeeded: number;
  duration: number;
  location: string;
  signedUpUsers?: {
    fullName: string;
    email: string;
    phoneNumber?: string | null;
    reason: string;
    hoursOfAvailability: number;
  }[];
  status: Status;
}

export enum Status {
  Pending = "Pending",
  Accepted = "Accepted",
  Declined = "Declined",
}
