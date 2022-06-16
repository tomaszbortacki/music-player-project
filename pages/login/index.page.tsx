import Form from "@components/form/form";
import { Submit } from "@models/form-model";
import { ADDITIONAL_LINK, LOGIN_FIELDS } from "./data";
import CenterWrapper from "@components/centerWrapper/centerWrapper";
import Header from "@components/header/header";
import Logo from "@components/logo/logo";
import { Container } from "react-bootstrap";
import { logIn } from "@database/endpoints";
import { errorHandler } from "@helpers/error-handler";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import userExistsRedirect from "@helpers/user-exists-redirect";

const Login = () => {
  const router = useRouter();

  const submit: Submit = (data) => {
    return logIn(data)
      .then(async (message) => {
        toast.success(message);
        await router.push("/");
      })
      .catch(errorHandler);
  };

  return (
    <>
      <Logo />
      <Container fluid={true}>
        <CenterWrapper width={371}>
          <Header text={"Log in"} placement={"center"} />
          <Form
            submit={submit}
            submitMessage={"Login"}
            fields={LOGIN_FIELDS}
            additionalLink={ADDITIONAL_LINK}
          />
        </CenterWrapper>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = userExistsRedirect;

export default Login;
