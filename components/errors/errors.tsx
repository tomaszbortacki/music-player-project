import { FieldError } from "react-hook-form";
import styles from "./errors.module.scss";

interface Props {
  error: FieldError;
}

const Errors = ({ error }: Props) => {
  if (!error) return null;

  return <span className={styles.error}>{error.message}</span>;
};

export default Errors;
