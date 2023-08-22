import { UserProfile, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const user = useUser();
  const userId =
    typeof router.query.userId === "string" ? router.query.userId : "";
  function handleClick() {
    void router.push("/profile/" + userId);
  }
  useEffect(() => {
    if (userId != user.user?.id || !user.isSignedIn) {
      void router.push("/");
    }
  }, [userId, user.user?.id, user.isSignedIn, router]);

  return (
    <>
      <div className="my-2 flex flex-col justify-center md:my-10 md:flex-row">
        <div className=" flex items-start p-3 text-xl font-bold md:p-0">
          <button onClick={handleClick}>&#x2190;</button>
        </div>
        <UserProfile />
      </div>
    </>
  );
}
