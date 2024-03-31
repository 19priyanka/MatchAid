import bcrypt from "bcrypt";

import { UserModel } from "../../src/models/users";
import { SafeUser, User, UserType } from "../types/User";

const saltRounds = 10;
const login = async (email: string, password: string): Promise<SafeUser> => {
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
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
    createdAt: new Date(),
    noOfTimesVolunteered: 0,
  });

  await newUser.save();

  return {
    fullName: newUser.fullName,
    email: newUser.email,
    phoneNumber: newUser?.phoneNumber,
    createdAt: newUser.createdAt,
    userType: UserType[user.userType],
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
    userType: updatedUser.userType,
    ...(user.password ? { password: user.password } : undefined),
  };
};

const getUser = async (email: string): Promise<SafeUser> => {
  const user = await UserModel.findOne({ email }).exec();

  if (!user) {
    throw new Error("User not found");
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

const getAllOrganizations = async (): Promise<User[]> => {
  try {
    const organizations = (await UserModel.find({
      userType: UserType.Organization,
    })) as User[];
    return organizations;
  } catch (error) {
    throw new Error("Error retrieving organizations");
  }
};

const getAllVolunteers = async (): Promise<User[]> => {
  try {
    const volunteers = (await UserModel.find({
      userType: UserType.Volunteer,
    })) as User[];
    return volunteers;
  } catch (error) {
    throw new Error("Error retrieving volunteers");
  }
};

export {
  login,
  signup,
  editProfile,
  getUser,
  getAllOrganizations,
  getAllVolunteers,
};
