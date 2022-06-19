import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionCookie } from "@database/sessionCookie";
import { Col, Container, Row } from "react-bootstrap";
import { UserModel } from "@helpers/user-model";
import Navigation from "@components/navigation/navigation";

interface Props {
  user: UserModel;
}

const User = ({ user }: Props) => {
  return (
    <>
      <Navigation id_user={user.id_user} />
      <section>
        <Container fluid={true}>
          <Row>
            <Col sm={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }}>
              hyhyhyh
            </Col>
            <Col sm={{ span: 12 }} md={{ span: 6 }} xl={{ span: 8 }}></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, query }) => {
    // @ts-ignore
    const user = req.session.user;

    if (!user && query.id !== user.id_user) {
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

export default User;
