import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Project from "~/components/StoreProfile/Project";
import Review from "~/components/StoreProfile/Review";
import { api } from "~/utils/api";

export default function StoreProfile() {
  const router = useRouter();
  const { t } = useTranslation();
  let id = "";
  if (typeof router.query.storeId === "string") {
    id = router.query.storeId;
  } else if (Array.isArray(router.query.storeId)) {
    id = router.query.storeId[0] ?? "";
  }

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

  function handleSaveClick() {
    return;
  }
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="flex w-full justify-center border-b">
          <div className="h-auto w-full p-5 pt-10 text-sm sm:text-lg md:w-[40rem] md:p-10 xl:w-[50rem]">
            <div className="flex h-full w-full flex-col gap-10">
              <div className="flex w-full flex-col md:flex-row md:gap-3">
                <div className="flex justify-center">
                  <div className="flex h-[200px] w-[200px] items-center justify-center rounded bg-gray-400 ">
                    Image Placeholder
                  </div>
                </div>
                <div className="flex h-full flex-grow items-center text-center md:text-left ">
                  <div className="flex w-full flex-col gap-3 ">
                    <div className="text-4xl font-bold">{storeData?.name}</div>
                    <div className="text-xl">{t("noRating")}</div>
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
                <div className="pt-5 text-xl font-bold">
                  {t("introduction")}
                </div>
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
                        <div className="flex flex-row">
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
                <div className="h-auto rounded-lg border p-1">
                  {t(`services.${storeData?.service}`)}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t">
                <div className="pt-5 text-xl font-bold">{t("review")}</div>
                <Review />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
