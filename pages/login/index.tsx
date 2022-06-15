import Form from "@components/form/form";
import { Submit } from "@models/form-model";
import { ADDITIONAL_LINK, LOGIN_FIELDS } from "./data";
import CenterWrapper from "@components/centerWrapper/centerWrapper";
import Header from "@components/header/header";

const Login = () => {
  const submit: Submit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };

  return (
    <CenterWrapper width={371}>
      <Header text={"Log in"} placement={"center"} />
      <Form
        submit={submit}
        submitMessage={"Login"}
        fields={LOGIN_FIELDS}
        additionalLink={ADDITIONAL_LINK}
      />
    </CenterWrapper>
  );
};

export default Login;
