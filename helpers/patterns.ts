import { ValidationRule } from "react-hook-form/dist/types/validator";
import { DICTIONARY } from "@helpers/messages";

export const EMAIL_PATTERN: ValidationRule<RegExp> = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: DICTIONARY.EMAIL,
};
