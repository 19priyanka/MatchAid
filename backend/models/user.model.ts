import bcrypt from "bcrypt";

import { UserModel } from "../../src/models/users";
import { SafeUser, User } from "../types/User";

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
    noOfTimesVolunteered: user.noOfTimesVolunteered,
  };
};

const signup = async (user: User): Promise<SafeUser> => {
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  const newUser = new UserModel({
    fullName: user.fullName,
    email: user.email,
    password: hashedPassword,
    phoneNumber: user.phoneNumber,
    userType: user.userType,
    noOfTimesVolunteered: 0,
  });

  await newUser.save();

  return {
    fullName: newUser.fullName,
    email: newUser.email,
    phoneNumber: newUser?.phoneNumber,
    createdAt: newUser.createdAt,
    userType: newUser.userType,
    noOfTimesVolunteered: newUser.noOfTimesVolunteered,
  };
};

const editProfile = async (user: Partial<User>): Promise<User> => {
  let hashedPassword;
  if (user.password) {
    hashedPassword = await bcrypt.hash(user.password, saltRounds);
  }

  const updatedUser = await UserModel.findOneAndUpdate(
    { email: user.email },
    {
      ...(user.fullName ? { fullName: user.fullName } : undefined),
      ...(hashedPassword ? { password: hashedPassword } : undefined),
      ...(user.phoneNumber ? { phoneNumber: user.phoneNumber } : undefined),
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return {
    ...updatedUser,
    ...(user.password ? { password: user.password } : undefined),
  };
};

export { login, signup, editProfile };
