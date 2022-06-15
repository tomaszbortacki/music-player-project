import { AdditionalLink, Fields, Submit } from "@models/form-model";
import { useForm } from "react-hook-form";
import Errors from "@components/errors/errors";
import styles from "./form.module.scss";
import Link from "next/link";
import Spinner from "@components/spinner/spinner";
import { useEffect, useState } from "react";
import { DICTIONARY } from "@helpers/messages";

interface Props {
  submit: Submit;
  submitMessage: string;
  additionalLink?: AdditionalLink;
  fields: Fields;
}

const Form = ({ submit, submitMessage, additionalLink, fields }: Props) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [formFields, setFormFields] = useState<Fields>([]);

  useEffect(() => {
    setFormFields(
      fields.map((field) => {
        if (field.name === "rpassword") {
          field.rules = {
            ...field.rules,
            validate: (value) =>
              watch("password") !== value
                ? DICTIONARY.REPEAT_PASSWORD
                : undefined,
          };
        }

        return field;
      })
    );
  }, [fields, watch]);

  if (!formFields.length) return null;

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      {formFields.map((field, key) => (
        <label key={key} className={styles.form__group}>
          <input
            className={`${styles.form__input} ${
              errors[field.type] ? styles.form__input__error : ""
            }`}
            type={field.type}
            placeholder={field.label}
            {...register(field.name, field.rules)}
          />
          <Errors error={errors[field.name]} />
        </label>
      ))}
      {additionalLink && (
        <section className={styles.form__additional}>
          <Link href={additionalLink.link}>
            <a
              className={styles.form__additional__link}
              title={additionalLink.title}
            >
              {additionalLink.title}
            </a>
          </Link>
        </section>
      )}
      <button className={"button"} type={"submit"}>
        {isSubmitting ? <Spinner /> : submitMessage}
      </button>
    </form>
  );
};

export default Form;
