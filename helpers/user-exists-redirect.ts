import { withSessionSsr } from "@database/session";

const userExistsRedirect = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;

  if (user) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {},
  };
});

export default userExistsRedirect;
