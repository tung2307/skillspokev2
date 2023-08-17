import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ProfileImage } from "~/components/ProfileImage";
import Link from "next/link";
const ProfilePage = () => {
  const router = useRouter();
  const userId =
    typeof router.query.userId === "string" ? router.query.userId : ""; // Type assertion here
  const session = useSession({
    required: true,
    onUnauthenticated() {
      void router.push(`/api/auth/signin?callbackUrl=/profile/${userId}`);
    },
  });

  const user = session.data?.user;
  return (
    <div className="flex flex-row">
      <div className="h-screen w-80 border-r pt-10">
        <div className="flex justify-center">
          <div className="flex w-full flex-col items-center">
            <ProfileImage src={user?.image} className="h-[150px] w-[150px]" />
            {user?.image ? (
              <>
                <div className="mt-4">Low image quality?</div>
                <Link href={`/profile/${userId}`} className="text-blue-400">
                  Update here
                </Link>
              </>
            ) : null}
            <div className="p-5 text-center text-lg font-bold">
              {user?.name}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-grow"></div>
    </div>
  );
};

export default ProfilePage;
