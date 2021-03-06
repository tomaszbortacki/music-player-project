import { ReactNode } from "react";
import Head from "next/head";

interface Props {
  subpage?: string;
  children: ReactNode | Array<ReactNode>;
}

const CustomHeader = ({ subpage, children }: Props) => {
  return (
    <>
      <Head>
        <title>Cutify{subpage ? ` - ${subpage}` : ""}</title>
        <meta name={"author"} content={"Tomasz Bortacki"} />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      {children}
    </>
  );
};

export default CustomHeader;
