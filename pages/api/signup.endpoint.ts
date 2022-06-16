import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // request(
  //   `select id_user from public.users where email = ${req.body.email}`
  // ).then((data) => {
  //   console.log(data);
  // });
  setTimeout(() => {
    res.status(500).send("Error");
  }, 1000);
}
