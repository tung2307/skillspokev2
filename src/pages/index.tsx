// import { SessionStore } from "next-auth/core/lib/cookie";
// import { signIn, signOut, useSession } from "next-auth/react";

import Section1 from "~/components/Section1";
import Section2 from "~/components/Section2";

export default function Home() {
  return (
    <>
      <div className="h-auto w-auto">
        <Section1 />
        <Section2 />
      </div>
    </>
  );
}
