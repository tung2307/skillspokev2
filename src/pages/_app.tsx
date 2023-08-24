import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";

import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import "../utils/i18n";
import { viVN, enUS } from "@clerk/localizations";
import { useRouter } from "next/router";
import TopNav from "~/components/NavBar/TopNav";
import Footer from "~/components/Footer/Footer";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;

  // Choose the appropriate Clerk localization based on the current locale
  const clerkLocalization = locale === "vi" ? viVN : enUS;

  return (
    <ClerkProvider localization={clerkLocalization} {...pageProps}>
      <Head>
        <title>Skillspoke</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col ">
        <TopNav />
        <div className="mx-auto w-screen">
          <div className="min-h-screen flex-grow">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </div>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
