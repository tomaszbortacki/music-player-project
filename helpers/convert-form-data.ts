import { Fields, Files, IncomingForm } from "formidable";
import { NextApiRequest } from "next";

export const getFormData = (req: NextApiRequest): Promise<[Fields, Files]> => {
  const form = new IncomingForm();

  return new Promise((resolve, reject) =>
    form.parse(req, (err: unknown, fields: Fields, files: Files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve([fields, files]);
    })
  );
};
