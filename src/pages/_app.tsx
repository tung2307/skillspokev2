import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { TopNav } from "~/components/TopNav";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Skillspoke</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col ">
        <TopNav />
        <div className="mx-auto w-full">
          <div className="min-h-screen flex-grow">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
