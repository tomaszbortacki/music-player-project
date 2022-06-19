import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";

import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress height={3} color="#27AE60" />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
