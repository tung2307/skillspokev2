import Rating from "@mui/material/Rating";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Review from "../StoreProfile/Review";

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
  const [rating, setRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  return (
    <>
      <Link href={`/storeProfile/${data.id}`}>
        <div className=" flex w-full justify-center border-b p-10 md:w-[35rem] md:justify-start md:p-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="h-[150px] w-[150px] flex-shrink-0 rounded-lg bg-gray-500"></div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className=" text-xl font-bold md:text-3xl">
                  {data.name}
                </div>
                <div className="text:small flex flex-row items-center justify-center gap-2 md:justify-start md:text-base">
                  {rating === null ? (
                    <>{t("noRating")}</>
                  ) : (
                    <>{parseFloat(rating.toString()).toFixed(1)}</>
                  )}
                  <Rating
                    name="read-only"
                    value={rating}
                    readOnly
                    size="small"
                  />
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
      <div className="hidden">
        <Review
          data={{
            id: data.id, 
            name: data.name, 
            userId: data?.userId ?? "",
          }}
          onRatingChange={(newRating) => setRating(newRating)}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
