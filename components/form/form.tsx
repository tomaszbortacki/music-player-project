import { AdditionalLink, Fields, Submit } from "@models/form-model";
import { useForm } from "react-hook-form";
import Errors from "@components/errors/errors";
import styles from "./form.module.scss";
import Link from "next/link";

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
    formState: { errors, isSubmitting },
  } = useForm();

  if (!fields.length) return null;

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      {fields.map((field, key) => (
        <label key={key} className={styles.form__group}>
          <input
            className={`${styles.form__input} ${
              errors[field.type] ? styles.form__input__error : ""
            }`}
            type={field.type}
            placeholder={field.label}
            {...register(field.name, field.rules)}
          />
          <Errors error={errors[field.type]} />
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
        {isSubmitting ? "subbiting" : submitMessage}
      </button>
    </form>
  );
};

export default Form;
