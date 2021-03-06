import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@database/userModel";
import { hash } from "bcryptjs";
import { PERMISSIONS } from "@helpers/permissions-enum";
import { DICTIONARY } from "@helpers/messages";
import { HttpRequestTypes } from "@helpers/http-request-types";
import { v4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === HttpRequestTypes.POST) {
    try {
      const { email, password, rpassword } = req.body;

      if (!(email && password)) {
        return res.status(400).send(DICTIONARY.BASIC_ERROR);
      }

      if (password !== rpassword) {
        return res.status(400).send(DICTIONARY.REPEAT_PASSWORD);
      }

      const existing = await User.findOne({
        where: { email },
        attributes: ["email"],
      });

      if (existing) {
        return res.status(400).send("This user already exists");
      }

      const newPassword = await hash(password, 10);

      await User.create({
        id_user: v4(),
        email,
        password: newPassword,
        permission: PERMISSIONS.USER,
      });

      return res.status(200).send("User created successfully");
    } catch (e) {
      console.log(e);
      return res.status(500).send(DICTIONARY.BASIC_ERROR);
    }
  } else {
    return res.status(400).send(DICTIONARY.SUPPORTS(HttpRequestTypes.POST));
  }
}
