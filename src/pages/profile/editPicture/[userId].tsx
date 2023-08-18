import { UserProfile, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const user = useUser();
  const userId =
    typeof router.query.userId === "string" ? router.query.userId : "";
  function handleClick() {
    void router.push("/profile/" + userId);
  }
  if (!user.isSignedIn || userId == "") {
    return (window.location.href = "/");
  }

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
