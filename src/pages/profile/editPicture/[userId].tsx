import { UserProfile } from "@clerk/nextjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const userId =
    typeof router.query.userId === "string" ? router.query.userId : "";
  function handleClick() {
    router.push("/profile/" + userId);
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
