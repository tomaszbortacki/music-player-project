import { AdditionalLink, Fields } from "@models/form-model";
import { DICTIONARY } from "@helpers/messages";

export const LOGIN_FIELDS: Fields = [
  {
    label: "E-mail",
    name: "email",
    type: "email",
    rules: {
      required: {
        value: true,
        message: DICTIONARY.REQUIRED,
      },
    },
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    rules: {
      required: {
        value: true,
        message: DICTIONARY.REQUIRED,
      },
      minLength: {
        value: 8,
        message: DICTIONARY.MIN_LENGTH,
      },
    },
  },
];

export const ADDITIONAL_LINK: AdditionalLink = {
  link: "/registration",
  title: "Create a new account",
};
