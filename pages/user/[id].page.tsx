import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { sessionCookie } from "@database/sessionCookie";
import { Col, Container, Row } from "react-bootstrap";
import { UserModel } from "@helpers/user-model";
import Navigation from "@components/navigation/navigation";
import Form from "@components/form/form";
import { USER_FIELDS } from "./data";
import Header from "@components/header/header";
import { Submit } from "@models/form-model";
import styles from "./user.module.scss";
import Image from "next/image";
import CustomHeader from "@components/customHeader/customHeader";

interface Props {
  user: UserModel;
}

const User = ({ user }: Props) => {
  const submit: Submit = (data) => {
    console.log(data);
    return new Promise<void>((resolve) => resolve());
  };

  return (
    <CustomHeader subpage={"User Panel"}>
      <Navigation id_user={user.id_user} />
      <section className={`my-5 ${styles.user}`}>
        <Container fluid={true}>
          <Row>
            <Col sm={{ span: 12 }}>
              <Header text={"Settings"} placement={"left"} />
            </Col>
            <Col sm={{ span: 12 }} md={{ span: 6 }} xl={{ span: 4 }}>
              <Form
                fields={USER_FIELDS}
                submit={submit}
                submitMessage={"Save"}
              />
            </Col>
            <Col sm={{ span: 12 }} md={{ span: 6 }} xl={{ span: 8 }}>
              <section className={styles.user__image}>
                <Image
                  src={"/user-background.png"}
                  width={771}
                  height={534}
                  alt={"User image"}
                />
              </section>
            </Col>
          </Row>
        </Container>
      </section>
    </CustomHeader>
  );
};

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res, query }) => {
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
