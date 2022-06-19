import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";

import "react-toastify/dist/ReactToastify.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#27AE60"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        nonce={"my-nonce"}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
