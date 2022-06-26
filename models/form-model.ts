import { RegisterOptions } from "react-hook-form";
import { Data } from "@models/request-model";

export type Submit = (data: Data) => Promise<void>;

export type Fields = Array<{
  name: string;
  type: "text" | "file" | "password" | "date";
  label?: string;
  rules?: RegisterOptions;
}>;

export interface AdditionalLink {
  title: string;
  link: string;
}
