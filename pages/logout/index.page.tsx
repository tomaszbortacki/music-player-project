import { withSessionSsr } from "@database/session";

const Logout = () => {};

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  req.session.destroy();
  res.setHeader("location", "/login");
  res.statusCode = 302;
  res.end();

  return {
    props: {},
  };
});

export default Logout;
