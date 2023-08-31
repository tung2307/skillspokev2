import { api } from "~/utils/api";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";

type StoreFavProps = {
  storeFav: {
    id: string;
    storeId: string;
    clerkId: string;
    createdAt: Date;
  };
};
export default function StoreFavorite({ storeFav }: StoreFavProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useUser();
  const { data: storeData } = api.stores.getStoreProfile.useQuery({
    storeId: storeFav.storeId,
  });

  const { data: storePic } = api.stores.getStoreProfilePicture.useQuery({
    storeId: storeFav.storeId,
  });

  const [isSaved, setIsSaved] = useState(false);
  const { mutate: createSave } = api.stores.createFavorite.useMutation({
    onSuccess: (data) => {
      console.log("Successfully saved!", data);
      setIsSaved(true);
    },
    onError: (error) => {
      console.error("Failed to save!", error);
    },
  });
  const { mutate: deleteSave } = api.stores.deleteFavorite.useMutation({
    onSuccess: () => {
      setIsSaved(false);
      void router.reload();
    },
    onError: (error) => {
      console.error("Failed to save!", error);
    },
  });
  function handleSaveClick() {
    if (!user.isSignedIn) {
      const currentURL = window.location.href;
      void router.push(`/sign-in/${encodeURIComponent(currentURL)}`);
    }

    if (isSaved) {
      deleteSave({ storeId: storeData?.id ?? "" });
    } else {
      createSave({ storeId: storeData?.id ?? "" });
    }
  }
  const isUserSignedIn = !!user.user?.id && !!storeData?.id;
  const { data: isStoreSaved, refetch: refetchStoreSavedStatus } =
    api.stores.checkIfStoreIsFavorite.useQuery(
      {
        storeId: storeData?.id ?? "",
        clerkId: user.user?.id ?? "",
      },
      {
        enabled: isUserSignedIn, // This determines if the query should run or not
      }
    );

  useEffect(() => {
    if (user.isSignedIn) {
      void refetchStoreSavedStatus();
      setIsSaved(!!isStoreSaved);
    }
  }, [user.isSignedIn, refetchStoreSavedStatus, isStoreSaved]);

  return (
    <>
      <div className="flex h-40 w-[30rem] flex-row items-center rounded border p-2 text-base">
        <div className=" w-96 rounded">
          {storePic ? (
            <Image
              src={storePic.fileUrl}
              alt="profilePic"
              width={150}
              height={100}
              objectFit="cover"
              className="flex items-center rounded shadow"
            />
          ) : (
            <Image
              src={"/images/appLogo/Placeholder_view_vector.svg.png"}
              alt="profilePic"
              width={150}
              height={100}
              objectFit="cover"
              className="flex items-center rounded shadow"
            />
          )}
        </div>
        <div className="flex h-full flex-col items-start p-2">
          <div className="flex w-full flex-row items-center gap-2">
            <Link
              href={`/storeProfile/${storeData?.id}`}
              className="text-xl font-bold hover:underline"
            >
              {storeData?.name}
            </Link>

            <div
              className={`w-20 rounded-lg border-2 text-center text-lg hover:cursor-pointer ${
                isSaved
                  ? "bg-red-300 hover:bg-red-500 hover:text-white"
                  : "hover:bg-[#4682B4] hover:text-white"
              }`}
              onClick={handleSaveClick}
            >
              {isSaved ? <>{t("unsave")}</> : <>{t("save")}</>}
            </div>
          </div>
          <div>
            {storeData?.phone ? (
              <>
                {t("phone")}:&nbsp;{storeData.phone}
              </>
            ) : null}
          </div>
          <div>
            {t("address")}:&nbsp;{storeData?.district + ", " + storeData?.city}
          </div>
          {storeData?.remote ? <>Online/Remote</> : null}
          <div
            className="h-[3rem] overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {storeData?.introduction}
          </div>
        </div>
      </div>
    </>
  );
}
