import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  password: string;
  createdAt: Date;
  userType: UserType;
  noOfTimesVolunteered: number;
}

export type SafeUser = Omit<User, "password">;

export enum UserType {
  Admin = "Admin",
  Volunteer = "Volunteer",
  Organization = "Organization",
}
