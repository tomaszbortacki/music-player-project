import { AdditionalLink, Fields } from "@models/form-model";
import { DICTIONARY } from "@helpers/messages";
import { EMAIL_PATTERN } from "@helpers/patterns";

export const LOGIN_FIELDS: Fields = [
  {
    label: "E-mail",
    name: "email",
    type: "text",
    rules: {
      required: {
        value: true,
        message: DICTIONARY.REQUIRED,
      },
      pattern: EMAIL_PATTERN,
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
