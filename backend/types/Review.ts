import { ObjectId } from "mongodb";

export interface Review {
  _id: ObjectId;
  revieweeId: ObjectId;
  reviewerId: ObjectId;
  description: string;
  rating: number;
  revieweeType: RevieweeType;
}

export enum RevieweeType {
  Volunteer = "Volunteer",
  Organization = "Organization",
}