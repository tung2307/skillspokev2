import { useUser } from "@clerk/nextjs";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Project from "~/components/StoreProfile/Project";
import Review from "~/components/StoreProfile/Review";
import { api } from "~/utils/api";
import Image from "next/image";
export default function StoreProfile() {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useUser();
  const [rating, setRating] = useState<number | null>(null);

  let id = "";
  if (typeof router.query.storeId === "string") {
    id = router.query.storeId;
  } else if (Array.isArray(router.query.storeId)) {
    id = router.query.storeId[0] ?? "";
  }
  const { data: profilePic } = api.stores.getStoreProfilePicture.useQuery(
    {
      storeId: id,
    },
    { enabled: !!id }
  );
  const { data: storeData, isLoading } = api.stores.getStoreProfile.useQuery(
    {
      storeId: id,
    },
    { enabled: !!id }
  );

  const { data: userData } = api.users.getUserStoreProfile.useQuery(
    {
      userId: storeData?.userId ?? "",
    },
    { enabled: !!storeData && !!storeData.userId }
  );

  const servicesArray = storeData?.service
    .split(", ")
    .map((service) => service.trim());

  function handleSaveClick() {
    if (!user.isSignedIn) {
      const currentURL = window.location.href;
      void router.push(`/sign-in/${encodeURIComponent(currentURL)}`);
    }
    
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="flex w-full justify-center ">
        <div className="h-auto w-full p-5 pt-10 text-sm sm:text-lg md:w-[55rem] md:p-10 xl:w-[65rem]">
          <div className="flex h-full w-full flex-col gap-10">
            <div className="flex w-full flex-col gap-2 md:flex-row md:gap-3">
              <div className="flex justify-center">
                <div className="flex flex-col gap-2">
                  <div className="flex h-auto w-[200px] items-center justify-center rounded ">
                    {profilePic ? (
                      <Image
                        src={profilePic.fileUrl}
                        alt="profilePic"
                        width={200} // Set the width
                        height={200} // Set the height
                        objectFit="cover" // This will make the image cover the container while maintaining its aspect ratio
                        className="rounded shadow"
                      />
                    ) : (
                      <Image
                        src={"/images/appLogo/Placeholder_view_vector.svg.png"}
                        alt="profilePic"
                        width={200} // Set the width
                        height={200} // Set the height
                        objectFit="cover" // This will make the image cover the container while maintaining its aspect ratio
                        className="rounded shadow"
                      />
                    )}
                  </div>
                  <div className="flex w-full justify-center">
                    {userData?.role === "PRO" &&
                      user.isSignedIn &&
                      userData.clerkId === user.user.id && (
                        <Link
                          href={`/storeProfile/editPicture/${storeData!.id}`}
                          className="rounded border bg-[#4682B4] p-1 text-white hover:bg-[#4683b4aa] hover:text-black"
                        >
                          Edit picture
                        </Link>
                      )}
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-grow items-center text-center md:text-left ">
                <div className="flex w-full flex-col gap-3 ">
                  <div className="text-4xl font-bold">{storeData?.name}</div>
                  <div className="flex flex-row items-center justify-center gap-2 text-xl md:justify-start">
                    {rating === null ? (
                      <>{t("noRating")}</>
                    ) : (
                      <>{parseFloat(rating.toString()).toFixed(1)}</>
                    )}
                    <Rating
                      name="read-only"
                      value={rating}
                      readOnly
                      size="medium"
                    />
                  </div>
                  <div className="flex w-full justify-center md:justify-start">
                    <div
                      className="w-20 rounded-lg border-2  text-center text-lg  hover:cursor-pointer hover:bg-[#4682B4] hover:text-white"
                      onClick={handleSaveClick}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t">
              <div className="pt-5 text-xl font-bold">{t("introduction")}</div>
              <div>
                {storeData?.introduction ? (
                  <>{storeData.introduction}</>
                ) : (
                  <>{t("noInfo")}</>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1 border-t">
              <div className="pt-5 text-xl font-bold">{t("overview")}</div>
              <div className="flex flex-row">
                <div>{t("owner")}:&nbsp;</div>
                <div className="font-bold">
                  {userData?.id ? (
                    <>{userData?.name}</>
                  ) : (
                    <>
                      <div className="flex flex-col md:flex-row">
                        {t("noInfo")}.&nbsp;
                        <div className="text-blue-500 hover:cursor-pointer hover:underline">
                          {t("claim")}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <div>{t("phone")}:&nbsp;</div>
                <div className="">
                  {storeData?.phone ? (
                    <>{storeData?.phone}</>
                  ) : (
                    <>{t("noInfo")}</>
                  )}
                </div>
              </div>
              <div className="flex flex-row">
                <div>{t("address")}:&nbsp;</div>
                <div className="flex flex-row">
                  {storeData?.address1 ? (
                    <>
                      {storeData?.address1 + ","}
                      {storeData?.address2 + ","}
                      {storeData?.ward + ","}
                      {storeData?.district + ","}
                      {storeData?.city + ","}
                      {storeData?.country + ","}
                    </>
                  ) : (
                    <>
                      {storeData?.district + ", "}
                      {storeData?.city + ", "}
                      {storeData?.country}
                    </>
                  )}
                </div>
              </div>
              {storeData?.remote ? (
                <div className="flex flex-row">
                  {t("alsoServe")}:&nbsp;<p className="font-bold">Online</p>
                </div>
              ) : null}
              {storeData?.verify ? (
                <p className="font-bold text-green-500">{t("bg-check")}!</p>
              ) : (
                <p className="font-bold text-red-500">{t("!bg-check")}!</p>
              )}
            </div>
            <div className="flex flex-col gap-2 border-t">
              <div className="pt-5 text-xl font-bold">{t("project")}</div>
              <Project />
            </div>
            <div className="flex flex-col items-start gap-2 border-t">
              <div className="pt-5 text-xl font-bold">{t("specialist")}</div>
              <div className="flex flex-row gap-2">
                {servicesArray?.map((service, index) => (
                  <div key={index} className="h-auto rounded-lg border p-1">
                    {t(`services.${service}`)}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t">
              <div className="pt-5 text-xl font-bold">{t("review")}</div>
              <Review
                data={{
                  id: storeData!.id,
                  name: storeData!.name,
                  userId: storeData?.userId ?? null,
                }}
                onRatingChange={(newRating) => setRating(newRating)}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
