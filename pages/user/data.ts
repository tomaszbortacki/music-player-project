import { Fields } from "@models/form-model";
import { DICTIONARY } from "@helpers/messages";

export const USER_FIELDS: Fields = [
  {
    label: "Firstname",
    name: "firstname",
    type: "text",
  },
  {
    label: "Lastname",
    name: "lastname",
    type: "text",
  },
  {
    label: "Birth date - 01/01/2000\n",
    name: "birthday",
    type: "date",
  },
  {
    label: "E-mail",
    name: "email",
    type: "text",
    rules: {
      disabled: true,
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
  {
    label: "Repeat password",
    name: "rpassword",
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