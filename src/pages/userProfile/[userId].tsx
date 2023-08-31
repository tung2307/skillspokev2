import { useRouter } from "next/router";
import { ProfileImage } from "~/components/ComponentHelpers/ProfileImage";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import ProPage from "~/components/UserProfile/Pro/ProPage";
import CustomerPage from "~/components/UserProfile/Customer/CustomerPage";

const ProfilePage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const userId =
    typeof router.query.userId === "string" ? router.query.userId : ""; // Type assertion here
  const user = useUser();

  const { data: userData } = api.users.getUserbyClerk.useQuery(
    { userId: userId ?? "" },
    { enabled: !!userId } // Query will only run if userId is truthy
  );

  return user.isSignedIn ? (
    <>
      <div className="flex h-auto flex-col border-b md:flex-row xl:flex-row">
        <div className="w-full border-b pb-5 pt-10 md:w-[30vw]  md:border-b-0 md:border-r">
          <div className="flex justify-center">
            <div className="flex w-full flex-col items-center">
              <ProfileImage src={user.user?.imageUrl} />
              <div className="p-5 text-center text-lg font-bold">
                {user.user?.fullName}
              </div>
              <div>
                {user.user?.emailAddresses?.map(
                  (emailAddressResource, index) => (
                    <div key={index}>{emailAddressResource.emailAddress}</div>
                  )
                )}
              </div>
              <div className="mt-5 rounded border bg-[#4682B4] p-1 text-white hover:bg-white hover:text-black">
                <Link href={"./editPicture/" + userId}>
                  {t("accountSetting")}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full md:w-[75vw] ">
          {userData?.role == "CUSTOMER" ? (
            <CustomerPage userData={userData} />
          ) : (
            <>
              <ProPage userData={userData} />
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <>{t("logOut-signIn")}</>
  );
};

export default ProfilePage;
