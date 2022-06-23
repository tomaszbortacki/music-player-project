import { UserModel } from "@helpers/user-model";
import { IronSession } from "iron-session";

declare module "http" {
  interface IncomingMessage {
    session: IronSession & {
      user: UserModel;
    };
  }
}
