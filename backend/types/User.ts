export interface User {
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
  Guest = "Guest",
}
