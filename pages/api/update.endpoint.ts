import type { NextApiRequest, NextApiResponse } from "next";
import { DICTIONARY } from "@helpers/messages";
import { HttpRequestTypes } from "@helpers/http-request-types";
import { withSessionRoute } from "@database/session";

export default withSessionRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === HttpRequestTypes.PUT) {
    try {
      const user = req.session.user;

      if (!user) {
        return res.status(500).send(DICTIONARY.SESSION_ADMIN);
      }

      return res.status(200).send(DICTIONARY.SONG_ADDED_SUCCESSFULLY);
    } catch (e) {
      console.log(e);
      return res.status(500).send(DICTIONARY.BASIC_ERROR);
    }
  } else {
    return res.status(400).send(DICTIONARY.SUPPORTS(HttpRequestTypes.PUT));
  }
});
