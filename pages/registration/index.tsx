import Form from "@components/form/form";
import { Submit } from "@models/form-model";
import { ADDITIONAL_LINK, REGISTRATION_FIELDS } from "./data";
import CenterWrapper from "@components/centerWrapper/centerWrapper";
import Header from "@components/header/header";
import Logo from "@components/logo/logo";
import { Container } from "react-bootstrap";

const Registration = () => {
  const submit: Submit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };

  return (
    <>
      <Logo />
      <Container fluid={true}>
        <CenterWrapper width={371}>
          <Header text={"Create an account"} placement={"center"} />
          <Form
            submit={submit}
            submitMessage={"Sign up"}
            fields={REGISTRATION_FIELDS}
            additionalLink={ADDITIONAL_LINK}
          />
        </CenterWrapper>
      </Container>
    </>
  );
};

export default Registration;
