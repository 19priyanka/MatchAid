import type { NextApiRequest, NextApiResponse } from "next";
import { SafeUser } from "../../../../backend/types/User";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { email, password } = req.body;
    const loginInfo: SafeUser = await login(email, password);

    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
