import { toast } from "react-toastify";

interface Error {
  response: {
    data: string;
  };
}

type ErrorHandler = (err: Error) => void;

export const errorHandler: ErrorHandler = (err) => {
  toast.error(err.response.data);
};
