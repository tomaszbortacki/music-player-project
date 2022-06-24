import { Data } from "@models/request-model";
import axios from "axios";

export const signUp = async (data: Data): Promise<string> => {
  return (await axios.post<string>("/api/signup", data)).data;
};

export const logIn = async (data: Data): Promise<string> => {
  return (await axios.post<string>("/api/login", data)).data;
};

export const addSong = async (data: FormData): Promise<string> => {
  return (await axios.post<string>("/api/addSong", data)).data;
};
