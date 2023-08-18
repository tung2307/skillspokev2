import { useRouter } from "next/router";
import { ProfileImage } from "~/components/ProfileImage";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";
const ProfilePage = () => {
  const router = useRouter();
  const userId =
    typeof router.query.userId === "string" ? router.query.userId : ""; // Type assertion here
  const user = useUser();
  useEffect(() => {
    if (userId != user.user?.id || !user.isSignedIn) {
      void router.push("/");
    }
  }, [userId, user.user?.id, user.isSignedIn]);

  return (
    <div className="flex h-auto flex-col md:h-screen md:flex-row xl:flex-row">
      <div className=" mb-5 w-full border-b pb-5 pt-10 md:w-80 md:border-r xl:w-80">
        <div className="flex justify-center">
          <div className="flex w-full flex-col items-center">
            <ProfileImage src={user.user?.imageUrl} />
            <div className="p-5 text-center text-lg font-bold">
              {user.user?.fullName}
            </div>
            <div>
              {user.user?.emailAddresses?.map((emailAddressResource, index) => (
                <div key={index}>{emailAddressResource.emailAddress}</div>
              ))}
            </div>
            <div className="mt-5 rounded border bg-[#4682B4] p-1 text-white hover:bg-white hover:text-black">
              <Link href={"./editPicture/" + userId}>Account setting</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-grow">
        {/* {user?.role == "CUSTOMER" ? (
          <>Customer profile page</>
        ) : (
          <>Pro profile page</>
        )} */}
      </div>
    </div>
  );
};

export default ProfilePage;
