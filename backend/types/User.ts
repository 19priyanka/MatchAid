export interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  status: string;
  createdAt: Date;
  userType: string;
  noOfTimesVolunteered: number;
}

export type SafeUser = Omit<User, "password">;
