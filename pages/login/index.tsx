import Form from "@components/form/form";
import { Submit } from "@models/form-model";
import { ADDITIONAL_LINK, LOGIN_FIELDS } from "./data";

const Login = () => {
  const submit: Submit = (data) => {
    console.log(data);
  };

  return (
    <section>
      <Form
        submit={submit}
        submitMessage={"Login"}
        fields={LOGIN_FIELDS}
        additionalLink={ADDITIONAL_LINK}
      />
    </section>
  );
};

export default Login;
