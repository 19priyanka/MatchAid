import bcrypt from "bcrypt";

import { UserModel } from "../../src/models/users";
import { SafeUser, User, UserType } from "../types/User";

const saltRounds = 9;
const login = async (
  email: string,
  password: string
): Promise<SafeUser | { success: boolean; msg: string }> => {
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    return { success: false, msg: "User not found" };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return { success: false, msg: "Invalid Password" };
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

const editProfile = async (user: Partial<User>): Promise<SafeUser> => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { email: user.email },
    {
      ...(user.fullName ? { fullName: user.fullName } : undefined),
      ...(user.phoneNumber ? { phoneNumber: user.phoneNumber } : undefined),
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return {
    ...updatedUser,
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

const updatePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
): Promise<{ success: boolean; msg: string }> => {
  const user = await UserModel.findOne({ email }).exec();

  if (!user) {
    return { success: false, msg: "User not found" };
  }

  const passwordsMatch = await bcrypt.compare(oldPassword, user.password);

  if (!passwordsMatch) {
    return { success: false, msg: "Old password is incorrect" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await UserModel.findOneAndUpdate(
    { email },
    {
      password: hashedPassword,
    }
  );

  return { success: true, msg: "Password updated successfully" };
};

const deleteAccount = async (id: string, userType: UserType) => {
  const user = await UserModel.findOne({ _id: new Object(id) }).exec();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.userType !== userType) {
    throw new Error("User type does not match");
  }

  await UserModel.deleteOne({ _id: new Object(id) }).exec();

  return { success: true, msg: "Account deleted successfully" };
};

export {
  login,
  signup,
  editProfile,
  getUser,
  getAllOrganizations,
  getAllVolunteers,
  updatePassword,
  deleteAccount,
};
