import bcrypt from "bcrypt";

import { UserModel } from "../../src/models/users";
import { SafeUser } from "../types/User";

const saltRounds = 10;
const login = async (email: string, password: string): Promise<SafeUser> => {
  const hashedPassword = bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));

  const user = await UserModel.findOne({
    email,
    password: hashedPassword,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return {
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user?.phoneNumber,
    createdAt: user.createdAt,
    userType: user.userType,
    noOfTimesVolunteered: user?.noOfTimesVolunteered,
  };
};

export { login };
