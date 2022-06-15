import { RegisterOptions } from "react-hook-form";

export type Submit = (data: Record<string, string>) => void;

export type Fields = Array<{
  name: string;
  type: string;
  label?: string;
  rules?: RegisterOptions;
}>;

export interface AdditionalLink {
  title: string;
  link: string;
}
