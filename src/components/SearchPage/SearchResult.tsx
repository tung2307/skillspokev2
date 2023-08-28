import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import Review from "../StoreProfile/Review";
import Image from "next/image";
type StoreDataProps = {
  data: {
    id: string;
    name: string;
    remote: boolean;
    phone: string | null;
    district: string;
    city: string;
    introduction: string | null;
    userId: string | null;
  };
};

export default function SearchResult({ data }: StoreDataProps) {
  const { data: profilePic } = api.stores.getStoreProfilePicture.useQuery({
    storeId: data.id,
  });
  const { data: ratingReview } = api.review.getStoreReview.useQuery({
    storeId: data.id,
  });

  const totalRating = ratingReview?.reduce(
    (total, review) => total + review.rating,
    0
  );

  const averageRatingDisplay =
    totalRating && ratingReview?.length
      ? (totalRating / ratingReview.length).toFixed(1)
      : "0.0";

  const averageRating = parseFloat(averageRatingDisplay);

  const { t } = useTranslation();
  return (
    <>
      <Link href={`/storeProfile/${data.id}`}>
        <div className=" flex w-96 justify-center border-b p-10 md:w-[35rem] md:justify-start md:p-2">
          <div className="flex flex-grow flex-col justify-center gap-2 md:flex-row">
            <div className="flex w-full justify-center  md:w-[150px]">
              <div className="h-auto w-[150px] flex-shrink-0 rounded-lg">
                {profilePic ? (
                  <Image
                    src={profilePic.fileUrl}
                    alt="profilePic"
                    width={150} // Set the width
                    height={150} // Set the height
                    objectFit="cover" // This will make the image cover the container while maintaining its aspect ratio
                    className=" rounded shadow"
                  />
                ) : (
                  <Image
                    src={"/images/appLogo/Placeholder_view_vector.svg.png"}
                    alt="profilePic"
                    width={150} // Set the width
                    height={150} // Set the height
                    objectFit="cover" // This will make the image cover the container while maintaining its aspect ratio
                    className="rounded shadow"
                  />
                )}
              </div>
            </div>

            <div className="flex flex-grow flex-col">
              <div className="flex flex-col items-center md:flex-row  md:justify-between">
                <div className=" text-xl font-bold md:text-3xl">
                  {data.name}
                </div>
                <div className="text:small flex flex-row items-center justify-center gap-2 md:justify-start md:text-base">
                  {averageRating === 0.0 ? (
                    <>{t("noRating")}</>
                  ) : (
                    <>{parseFloat(averageRating.toString()).toFixed(1)}</>
                  )}
                  {averageRating !== 0.0 && (
                    <Rating
                      name="read-only"
                      value={averageRating}
                      readOnly
                      size="small"
                    />
                  )}
                </div>
              </div>
              <div>
                {data.phone ? (
                  <>
                    {t("phone")}:&nbsp;{data.phone}
                  </>
                ) : null}
              </div>
              <div>
                {t("address")}:&nbsp;{data.district + ", " + data.city}
              </div>
              {data.remote ? <>Online/Remote</> : null}
              <div
                className="h-[3rem] overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {data.introduction}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
