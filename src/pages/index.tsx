// import { SessionStore } from "next-auth/core/lib/cookie";
// import { signIn, signOut, useSession } from "next-auth/react";

import Section1 from "~/components/Section1/Section1";
import Section2 from "~/components/Section2/Section2";
import Section3 from "~/components/Section3/Section3";
import Section4 from "~/components/Section4/Section4";
import Section5 from "~/components/Section5/Section5";
import Section6 from "~/components/Section6/Section6";

export default function Home() {
  return (
    <>
      <div className="h-auto w-screen">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
      </div>
    </>
  );
}
