import type { NextApiRequest, NextApiResponse } from "next";
import { DICTIONARY } from "@helpers/messages";
import { HttpRequestTypes } from "@helpers/http-request-types";
import { withSessionRoute } from "@database/session";
import { Song } from "@database/songModel";
import { Op } from "sequelize";

export default withSessionRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === HttpRequestTypes.GET) {
    try {
      const user = req.session.user;

      if (!user) {
        return res.status(500).send(DICTIONARY.SESSION_ADMIN);
      }

      let query = {};

      if ("search" in req.query && req.query.search.length) {
        query = {
          where: {
            title: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
        };
      }

      const songs = await Song.findAll({
        ...query,
        attributes: ["id_song", "title", "path"],
        limit: 10,
      });

      return res.status(200).json(songs);
    } catch (e) {
      console.log(e);
      return res.status(500).send(DICTIONARY.BASIC_ERROR);
    }
  } else {
    return res.status(400).send(DICTIONARY.SUPPORTS(HttpRequestTypes.GET));
  }
});
