import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@database/connection";
import { hash } from "bcryptjs";
import { PERMISSIONS } from "@helpers/permissions-enum";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(400).send("Something went wrong");
      }

      const existing = await User.findOne({
        where: { email },
        attributes: ["email"],
      });

      if (existing) {
        return res.status(400).send("This user is already exist");
      }

      const newPassword = await hash(password, 10);

      await User.create({
        email,
        password: newPassword,
        permission: PERMISSIONS.USER,
      });

      return res.status(200).send("User created successfully");
    } catch (e) {
      console.log(e);
      return res.status(500).send("Something went wrong");
    }
  } else {
    return res.status(400).send("We only support POST");
  }
}
