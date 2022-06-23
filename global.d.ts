import "iron-session";
import { UserModel } from "@helpers/user-model";

declare module "iron-session" {
  interface IronSessionData {
    user?: UserModel;
  }
}
