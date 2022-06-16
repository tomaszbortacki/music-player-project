import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import NextProgress from "next-progress";

import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextProgress
        height={4}
        color={"#27AE60"}
        delay={300}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
