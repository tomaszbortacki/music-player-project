import type { NextApiRequest, NextApiResponse } from "next";
import { DICTIONARY } from "@helpers/messages";
import { HttpRequestTypes } from "@helpers/http-request-types";
import { withIronSessionApiRoute } from "iron-session/next";
import { User } from "@database/connection";
import { sessionCookie } from "@database/sessionCookie";
import { compare } from "bcryptjs";

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === HttpRequestTypes.POST) {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(400).send(DICTIONARY.BASIC_ERROR);
      }

      const user = await User.findOne<any>({
        where: { email },
        attributes: [
          "id_user",
          "email",
          "password",
          "firstname",
          "lastname",
          "birthday",
        ],
      });

      if (!(user && user?.dataValues.password)) {
        return res.status(404).send(DICTIONARY.EMAIL_PASSWORD);
      }

      const passwordSuccess = await compare(password, user.password);

      if (!passwordSuccess) {
        return res.status(404).send(DICTIONARY.EMAIL_PASSWORD);
      }

      // @ts-ignore
      req.session.user = user.dataValues;
      await req.session.save();

      return res.status(200).send(DICTIONARY.WELCOME + email);
    } catch (e) {
      console.log(e);
      return res.status(500).send(DICTIONARY.BASIC_ERROR);
    }
  } else {
    return res.status(400).send(DICTIONARY.SUPPORTS(HttpRequestTypes.POST));
  }
},
sessionCookie);
