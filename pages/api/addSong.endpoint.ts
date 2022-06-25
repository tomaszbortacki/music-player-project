import type { NextApiRequest, NextApiResponse } from "next";
import { DICTIONARY } from "@helpers/messages";
import { HttpRequestTypes } from "@helpers/http-request-types";
import { withSessionRoute } from "@database/session";
import { PERMISSIONS } from "@helpers/permissions-enum";
import { getFormData } from "@helpers/convert-form-data";
import { readFile, writeFile } from "fs/promises";
import { Song } from "@database/songModel";
import { v4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSessionRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === HttpRequestTypes.POST) {
    try {
      const user = req.session.user;

      if (!user || user.permission !== PERMISSIONS.ADMIN) {
        return res.status(500).send(DICTIONARY.SESSION_ADMIN);
      }

      const [fields, files] = await getFormData(req);

      if (!("filepath" in files.song)) {
        return res.status(500).send(DICTIONARY.BASIC_ERROR);
      }

      if (!files.song.mimetype?.startsWith("audio")) {
        return res.status(500).send(DICTIONARY.FILE_TYPE_ERROR);
      }

      const songName = `${files.song.newFilename}.${
        files.song.originalFilename?.split(".")[1]
      }`;

      const existing = await Song.findOne({
        where: { title: fields.title },
        attributes: ["title"],
      });

      if (existing) {
        return res.status(400).send("This song already exists");
      }

      await Song.create({
        id_song: v4(),
        title: fields.title,
        path: `/songs/${songName}`,
      });

      const songData = await readFile(files.song.filepath);
      const path = `./public/songs/${songName}`;

      await writeFile(path, songData);

      return res.status(200).send(DICTIONARY.SONG_ADDED_SUCCESSFULLY);
    } catch (e) {
      console.log(e);
      return res.status(500).send(DICTIONARY.BASIC_ERROR);
    }
  } else {
    return res.status(400).send(DICTIONARY.SUPPORTS(HttpRequestTypes.POST));
  }
});
