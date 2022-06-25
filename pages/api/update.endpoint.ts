import type { NextApiRequest, NextApiResponse } from "next";
import { DICTIONARY } from "@helpers/messages";
import { HttpRequestTypes } from "@helpers/http-request-types";
import { withSessionRoute } from "@database/session";
import { User } from "@database/userModel";
import { compare } from "bcryptjs";
import { UserModel } from "@helpers/user-model";

export default withSessionRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === HttpRequestTypes.PUT) {
    try {
      const user = req.session.user;
      const {
        id_user,
        email,
        password,
        firstname,
        lastname,
        birthday,
      }: UserModel = req.body;

      if (!user || user.id_user !== id_user) {
        return res.status(500).send(DICTIONARY.SESSION);
      }

      if (!password) {
        return res.status(404).send(DICTIONARY.PASSWORD);
      }

      const passwordData = await User.findOne({
        where: { id_user: user.id_user },
        attributes: ["password"],
      });

      if (!(passwordData && passwordData?.password)) {
        return res.status(404).send(DICTIONARY.PASSWORD);
      }

      const passwordSuccess = await compare(password, passwordData.password);

      if (!passwordSuccess) {
        return res.status(404).send(DICTIONARY.PASSWORD);
      }

      await User.update(
        {
          firstname,
          lastname,
          birthday,
        },
        {
          where: { id_user },
        }
      );

      req.session.user = {
        ...req.session.user,
        firstname,
        lastname,
        birthday,
      } as UserModel;
      await req.session.save();

      return res.status(200).send(DICTIONARY.UPDATED);
    } catch (e) {
      console.log(e);
      return res.status(500).send(DICTIONARY.BASIC_ERROR);
    }
  } else {
    return res.status(400).send(DICTIONARY.SUPPORTS(HttpRequestTypes.PUT));
  }
});
