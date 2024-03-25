export interface User {
  fullName: string;
  email: string;
  phoneNumber?: string | null;
  password: string;
  createdAt: Date;
  userType: string;
  noOfTimesVolunteered?: number | null;
}

export type SafeUser = Omit<User, "password">;
