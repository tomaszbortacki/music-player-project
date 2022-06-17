import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionCookie } from "@database/sessionCookie";

const Logout = () => {};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    req.session.destroy();
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();

    return {
      props: {},
    };
  },
  sessionCookie
);

export default Logout;
