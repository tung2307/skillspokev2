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
  }, [userId, user.user?.id, user.isSignedIn]);

  return (
    <>
      <div className="my-10 flex justify-center">
        <div className="text-xl font-bold">
          <button onClick={handleClick}>&#x2190;</button>
        </div>
        <UserProfile />
      </div>
    </>
  );
}
