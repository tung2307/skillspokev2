import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { TopNav } from "~/components/TopNav";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Skillspoke</title>
        <meta
          name="description"
          content="This is a Twitter clone by Web Dev Simplified"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNav />
      <div className="container mx-auto flex flex-col sm:pr-4">
        <div className="min-h-screen flex-grow border-x">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
