import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ProfileImage } from "./ProfileImage";

export function TopNav() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const session = useSession();
  //     {
  //     required: true,
  //     onUnauthenticated() {
  //       redirect("/");
  //     },
  //   } Check: https://www.youtube.com/watch?v=Eh3EpwqT4cM
  const user = session.data?.user;
  const isLoading = session.status === "loading";
  return (
    <>
      <div className="sticky top-0 flex h-20 items-center justify-between bg-[#4682B4] px-4">
        <div className="text-xl font-bold text-white md:text-2xl xl:text-4xl">
          <Link href="/">SKILLSPOKE</Link>
        </div>
        <div className="relative flex items-center justify-start gap-4 whitespace-nowrap text-sm text-white md:gap-5 md:text-base xl:gap-10 xl:text-lg">
          <Link href="/join">Join Our Network</Link>

          <Link href="/discover">Discover</Link>

          {isLoading ? (
            <div></div> // Loading state
          ) : user == null ? (
            <button onClick={() => void signIn()}>Log In</button>
          ) : (
            <div className="relative">
              <button onClick={() => setDropdownVisible(!dropdownVisible)}>
                <ProfileImage src={session.data?.user.image} />
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 rounded border border-gray-200 bg-white text-black shadow-lg">
                  <Link href={`/profile/${user.id}`}>Profile</Link>
                  <button
                    onClick={() => void signOut()}
                    className="block w-full px-4 py-2 text-left"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
