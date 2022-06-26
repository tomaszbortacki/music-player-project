import type { NextApiRequest, NextApiResponse } from "next";
import { DICTIONARY } from "@helpers/messages";
import { HttpRequestTypes } from "@helpers/http-request-types";
import { withSessionRoute } from "@database/session";
import { Song } from "@database/songModel";
import { Op } from "sequelize";
import { Miniature } from "@database/miniatureModel";
import { PAGE_LIMIT } from "@helpers/pagination";

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

      const { rows, count } = await Song.findAndCountAll({
        ...query,
        attributes: ["id_song", "title", "path"],
        include: [
          {
            model: Miniature,
            required: true,
            attributes: ["id_miniature", "path"],
          },
        ],
        order: [["title", "ASC"]],
        limit: PAGE_LIMIT,
        offset: Number(req.query.page) * PAGE_LIMIT,
      });

      return res.status(200).json({ songs: rows, count });
    } catch (e) {
      console.log(e);
      return res.status(500).send(DICTIONARY.BASIC_ERROR);
    }
  } else {
    return res.status(400).send(DICTIONARY.SUPPORTS(HttpRequestTypes.GET));
  }
});
