import { FieldValues, UseFormWatch } from "react-hook-form";
import { Fields } from "@models/form-model";
import { Dispatch, SetStateAction } from "react";
import { DICTIONARY } from "@helpers/messages";

export const customRules = (
  fields: Fields,
  setter: Dispatch<SetStateAction<Fields>>,
  watch: UseFormWatch<FieldValues>
) => {
  setter(
    fields.map((field) => {
      switch (field.name) {
        case "rpassword":
          field.rules = {
            ...field.rules,
            validate: (value) =>
              watch("password") !== value
                ? DICTIONARY.REPEAT_PASSWORD
                : undefined,
          };
          break;
      }

      return field;
    })
  );
};
