import { Data } from "@models/request-model";
import axios from "axios";
import { SongModel } from "@helpers/song-model";

export const signUp = async (data: Data): Promise<string> => {
  return (await axios.post<string>("/api/signup", data)).data;
};

export const logIn = async (data: Data): Promise<string> => {
  return (await axios.post<string>("/api/login", data)).data;
};

export const addSong = async (data: Partial<FormData>): Promise<string> => {
  return (await axios.post<string>("/api/addSong", data)).data;
};

export const update = async (data: Data): Promise<string> => {
  return (await axios.put<string>("/api/update", data)).data;
};
