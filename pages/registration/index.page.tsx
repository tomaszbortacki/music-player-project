import Form from "@components/form/form";
import { Submit } from "@models/form-model";
import { ADDITIONAL_LINK, REGISTRATION_FIELDS } from "./data";
import CenterWrapper from "@components/centerWrapper/centerWrapper";
import Header from "@components/header/header";
import Logo from "@components/logo/logo";
import { Container } from "react-bootstrap";
import { signUp } from "@database/endpoints";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { errorHandler } from "@helpers/error-handler";

const Registration = () => {
  const router = useRouter();

  const submit: Submit = (data) => {
    const { rpassword, ...signUpData } = data;

    return signUp(signUpData)
      .then(async (message) => {
        toast.success(message);
        await router.push("/login");
      })
      .catch(errorHandler);
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
