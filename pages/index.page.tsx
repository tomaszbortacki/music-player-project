import type { GetServerSideProps, NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionCookie } from "@database/sessionCookie";
import { UserModel } from "@helpers/user-model";
import Navigation from "@components/navigation/navigation";

interface Props {
  user?: UserModel;
}

const Home: NextPage<Props> = ({ user }) => {
  if (!user) return null;

  return (
    <>
      <Navigation id_user={user.id_user} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    // @ts-ignore
    const user = req.session.user;

    if (!user) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  sessionCookie
);

export default Home;
