import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProfileImage } from "./ProfileImage";
import Search from "./Search";

export function TopNav() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const session = useSession();
  //     {
  //     required: true,
  //     onUnauthenticated() {
  //       redirect("/");
  //     },
  //   } Check: https://www.youtube.com/watch?v=Eh3EpwqT4cM
  const [menuVisible, setMenuVisible] = useState(false);
  const user = session.data?.user;
  const isLoading = session.status === "loading";
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const closeAll = () => {
    setDropdownVisible(false);
    setMenuVisible(false);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="sticky top-0 z-10 flex h-20 items-center justify-between bg-[#4682B4] px-4">
        <div className="flex justify-start">
          <div className="text-4xl font-bold text-white ">
            <Link href="/">SKILLSPOKE</Link>
          </div>
          <div>
            <Search className=""/>
          </div>
        </div>

        <div className="relative hidden items-center justify-start gap-2 whitespace-nowrap text-sm text-white md:flex md:gap-5 md:text-base xl:flex xl:gap-10 xl:text-lg">
          <Link href="/join">Join Our Network</Link>
          <Link href="/discover">Discover</Link>

          {isLoading ? (
            <div></div> // Loading state
          ) : user == null ? (
            <button onClick={() => void signIn()}>Log In</button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownVisible(!dropdownVisible)}>
                <ProfileImage
                  src={session.data?.user.image}
                  className="h-12 w-12"
                />
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-auto rounded border border-gray-200 bg-white text-black shadow-lg">
                  <div onClick={closeAll} className="flex w-full flex-col">
                    <div className="p-1 text-center text-base font-bold md:p-2 md:text-lg xl:p-3  xl:text-xl">
                      {user.name}
                    </div>
                    <div className="w-full border-b"></div>
                    <Link href={`/profile/${user.id}`} passHref>
                      <div className="block w-full p-3 text-left hover:bg-gray-100">
                        Full Profile
                      </div>
                    </Link>
                    <button
                      onClick={() => void signOut()}
                      className="w-full p-3 text-left hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* After md the above div will be hidden and below div show up as a dropdown */}

        <div className="flex md:hidden xl:hidden">
          {user == null ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuVisible(!menuVisible)}
                className="flex items-center text-5xl text-white"
              >
                ≡
              </button>
              {menuVisible && (
                <div className="absolute right-0 mt-2 w-auto rounded border border-gray-200 bg-white text-black shadow-lg">
                  <div onClick={closeAll} className="flex w-40 flex-col">
                    <Link href="/join">
                      <div className="block w-full p-3 text-left hover:bg-gray-100">
                        Join Our Network
                      </div>
                    </Link>
                    <Link href="/discover">
                      <div className="block w-full p-3 text-left hover:bg-gray-100">
                        Discover{" "}
                      </div>
                    </Link>
                    <button
                      onClick={() => void signIn()}
                      className="w-full p-3 text-left hover:bg-gray-100"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuVisible(!menuVisible)}>
                <ProfileImage
                  src={session.data?.user.image}
                  className="h-12 w-12"
                />
              </button>
              {menuVisible && (
                <div className="absolute right-0 mt-2 w-auto rounded border border-gray-200 bg-white text-black shadow-lg">
                  <div onClick={closeAll} className="flex w-40 flex-col">
                    <div className="p-1 text-center text-lg font-bold md:p-2 md:text-lg  xl:p-3 xl:text-xl">
                      {user.name}
                    </div>
                    <div className="w-full border-b"></div>
                    <Link href={`/profile/${user.id}`}>
                      <div className="block w-full p-3 text-left hover:bg-gray-100">
                        Full Profile
                      </div>
                    </Link>
                    <Link href="/join">
                      <div className="block w-full p-3 text-left hover:bg-gray-100">
                        Join Our Network
                      </div>
                    </Link>
                    <Link href="/discover">
                      <div className="block w-full p-3 text-left hover:bg-gray-100">
                        Discover{" "}
                      </div>
                    </Link>
                    <button
                      onClick={() => void signOut()}
                      className="w-full p-3 text-left hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
