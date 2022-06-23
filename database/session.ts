import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export const sessionCookie = {
  cookieName: "spotify_user",
  password: "f\\T\\)Dk8g@r_{^s5vxgSDU/qxgn:Htf&",
  cookieOptions: {
    secure: false,
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionCookie);
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionCookie);
}
