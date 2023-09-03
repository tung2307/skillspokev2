import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../utils/api";

import LanguageSwitcher from "../ComponentHelpers/LanguageSwitcher";
import { ProfileImage } from "../ComponentHelpers/ProfileImage";
import Search from "./Search";

export default function TopNav() {
  const router = useRouter();
  const { t } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLocation, setIsLocation] = useState(false);
  const [location, setLocation] = useState("Loading...");
  const [isNavVisible, setIsNavVisible] = useState(true);

  const isHome = router.pathname === "/";
  const user = useUser();
  const userId = user.user?.id;
  const [initialUserId, setInitialUserId] = useState(userId);
  useEffect(() => {
    setInitialUserId(userId);
  }, [userId]); // Empty dependency array ensures this effect runs only once when the component mounts

  const { data, error } = api.users.getUserbyClerk.useQuery(
    { userId: initialUserId ?? "" },
    { enabled: !!initialUserId } // Query will only run if initialUserId is truthy
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      // Handle the error here
    }
  }, [error]);

  const { mutate } = api.users.create.useMutation({});

  useEffect(() => {
    if (data === null && user.isSignedIn) {
      mutate({ name: user.user?.fullName ?? "" });
    }
  }, [user.user?.fullName, data, mutate, user.isLoaded]);

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
  useEffect(() => {
    if (!isLocation) {
      fetch(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((json: { location: { city: string } }) => {
          setLocation(json.location.city);
        })
        .catch((error) => {
          console.error("There was a problem fetching the location:", error);
        });

      setIsLocation(true);
    }
  }, [isLocation]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight && router.pathname == "/") {
        // window.innerHeight is the height of the viewport
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.pathname]);
  function handleClickSignIn() {
    const currentURL = window.location.href;
    void router.push(`/sign-in/${encodeURIComponent(currentURL)}`);
  }
  return (
    <>
      {isNavVisible ? (
        <div className="sticky top-0 z-20 flex h-20 w-screen items-center justify-between bg-[#4682B4] pr-5">
          <div className="flex flex-grow justify-start md:gap-4 xl:gap-40">
            <div className="pl-8 text-2xl font-bold text-white sm:text-4xl">
              <Link href="/">SKILLSPOKE</Link>
            </div>
            {isHome ? null : <Search />}
          </div>

          <div className="relative hidden items-center justify-start gap-2 whitespace-nowrap text-sm text-white md:flex md:text-base xl:flex xl:text-lg">
            <Link href={`/discover/${location}`} className=" hover:border-b">
              {t("discover")}
            </Link>

            {!user.isLoaded ? (
              <div></div> // Loading state
            ) : user.user == null ? (
              <div
                className="rounded border bg-white p-1 text-[#4682B4] hover:cursor-pointer hover:bg-[#4682B4] hover:text-white"
                onClick={handleClickSignIn}
              >
                {t("signIn")}
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownVisible(!dropdownVisible)}>
                  <ProfileImage
                    src={user.user?.imageUrl}
                    className="h-[50px] w-[50px]"
                  />
                </button>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-auto rounded border border-gray-200 bg-white text-black shadow-lg">
                    <div onClick={closeAll} className="flex w-full flex-col">
                      <div className="p-1 text-center text-base font-bold md:p-2 md:text-lg xl:p-3  xl:text-xl">
                        {user.user.fullName}
                      </div>
                      <div className="w-full border-b"></div>
                      <Link href={`/userProfile/${user.user.id}`} passHref>
                        <div className="block w-full p-3 text-left hover:bg-gray-100">
                          {t("fullProfile")}
                        </div>
                      </Link>
                      <div className="block w-full p-3 text-left hover:bg-gray-100">
                        <SignOutButton>
                          <button className="w-full text-left">
                            {t("signOut")}
                          </button>
                        </SignOutButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* After md the above div will be hidden and below div show up as a dropdown */}

          <div className="flex md:hidden xl:hidden">
            {user.user == null ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuVisible(!menuVisible)}
                  className="flex -translate-y-1 transform text-5xl text-white"
                >
                  ≡
                </button>
                {menuVisible && (
                  <div className="absolute right-0 mt-2 w-auto rounded border border-gray-200 bg-white text-black shadow-lg">
                    <div onClick={closeAll} className="flex w-40 flex-col">
                      <Link href={`/search/page`}>
                        <div className="block w-full p-3 text-left hover:bg-gray-100">
                          {t("search")}
                        </div>
                      </Link>
                      <Link href={`/discover/${location}`}>
                        <div className="block w-full p-3 text-left hover:bg-gray-100">
                          {t("discover")}
                        </div>
                      </Link>

                      <div
                        className="block w-full p-3 text-left hover:cursor-pointer hover:bg-gray-100"
                        onClick={handleClickSignIn}
                      >
                        {t("signIn")}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={menuRef}>
                <button onClick={() => setMenuVisible(!menuVisible)}>
                  <ProfileImage
                    src={user.user?.imageUrl}
                    className="h-[50px] w-[50px]"
                  />
                </button>
                {menuVisible && (
                  <div className="absolute right-0 mt-2 w-auto rounded border border-gray-200 bg-white text-black shadow-lg">
                    <div onClick={closeAll} className="flex w-40 flex-col">
                      <div className="p-1 text-center text-lg font-bold md:p-2 md:text-lg  xl:p-3 xl:text-xl">
                        {user.user.fullName}
                      </div>
                      <div className="w-full border-b"></div>
                      <Link href={`/userProfile/${user.user.id}`}>
                        <div className="block w-full p-3 text-left hover:bg-gray-100">
                          {t("fullProfile")}
                        </div>
                      </Link>
                      <Link href={`/search/page`}>
                        <div className="block w-full p-3 text-left hover:bg-gray-100">
                          {t("search")}
                        </div>
                      </Link>
                      <Link href={`/discover/${location}`}>
                        <div className="block w-full p-3 text-left hover:bg-gray-100">
                          {t("discover")}
                        </div>
                      </Link>

                      <div className="block w-full p-3 text-left hover:bg-gray-100">
                        <SignOutButton>
                          <button className="w-full text-left">
                            {t("signOut")}
                          </button>
                        </SignOutButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mx-2 flex items-center ">
            <LanguageSwitcher />
          </div>
        </div>
      ) : (
        <>
          {isHome ? (
            <div className="sticky top-0 z-10 flex h-20 w-screen items-center justify-center border-b bg-gray-100">
              <div className="flex justify-center md:hidden md:gap-4 xl:gap-40">
                <div className="pl-8 text-2xl font-bold text-[#4682B4] sm:text-4xl">
                  <Link href="/">SKILLSPOKE</Link>
                </div>
              </div>
              <Search />
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
