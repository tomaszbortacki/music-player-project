import type { NextPage } from "next";
import { withSessionSsr } from "@database/session";
import { UserModel } from "@helpers/user-model";
import Navigation from "@components/navigation/navigation";

type Props = {
  user?: UserModel;
};

const Home: NextPage<Props> = ({ user }) => {
  if (!user) return null;

  return (
    <>
      <Navigation id_user={user.id_user} />
    </>
  );
};

export const getServerSideProps = withSessionSsr<Props>(
  async ({ req, res }) => {
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
  }
);

export default Home;
