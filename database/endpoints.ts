import { Data } from "@models/request-model";
import axios from "axios";

export const signUp = async (data: Data): Promise<string> => {
  return (await axios.post<string>("/api/signup", data)).data;
};
