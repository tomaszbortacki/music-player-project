import { Data } from "@models/request-model";
import axios from "axios";

export const signUp = async (data: Data) => {
  return (await axios.post<void>("/api/signup", data)).data;
};
