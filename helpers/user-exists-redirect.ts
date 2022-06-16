import { sessionCookie } from "@database/sessionCookie";
import { withIronSessionSsr } from "iron-session/next";

const userExistsRedirect = withIronSessionSsr(async ({ req, res }) => {
  // @ts-ignore
  const user = req.session.user;

  if (user) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {},
  };
}, sessionCookie);

export default userExistsRedirect;
