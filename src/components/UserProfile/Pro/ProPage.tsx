import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import ManageStoreCard from "./ManageStoreCard";
import RecentReviewCard from "./RecentReview";

type UserDataProps = {
  userData:
    | {
        id: string;
        clerkId: string;
        name: string | null;
        role: string;
      }
    | null
    | undefined;
};

export default function ProPage({ userData }: UserDataProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: storeData } = api.stores.getStoreUserProfile.useQuery(
    { userId: userData?.id ?? "" },
    { enabled: !!userData?.id }
  );
  const { data: recentReviews } = api.review.getNewestReview.useQuery(
    {
      userId: userData?.id ?? "",
    },
    { enabled: !!userData?.id }
  );
  const { t } = useTranslation();
  return (
    <>
      <div className="flex h-auto w-full flex-col pt-5">
        <div className="flex justify-center pb-10 pl-5 md:justify-start">
          <div className="flex flex-col">
            <p className="pb-2 text-xl font-bold">{t("manageService")}</p>
            <div className="grid  grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {storeData?.map((store) => (
                <ManageStoreCard key={store.id} storeData={store} />
              ))}
              <Link href="/add/store">
                <div className=" flex h-[300px] w-[220px] items-center justify-center border-2 border-dashed hover:border-solid hover:bg-gray-100">
                  + {t("create")}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex h-auto w-full justify-center border-t p-2 md:justify-start md:p-5">
          <div className="flex w-full flex-col items-start">
            <p className="text-xl font-bold">{t("recentReview")}</p>
            <div className="grid w-full grid-cols-1 gap-10 p-5 lg:grid-cols-2">
              {/* Show only the first 4 reviews or all if expanded */}
              {(isExpanded ? recentReviews : recentReviews?.slice(0, 4))?.map(
                (review) => (
                  <RecentReviewCard key={review.id} reviewData={review} />
                )
              )}
            </div>
            {/* Display "See More" only if there are more than 4 reviews and it's not expanded */}
            {recentReviews && recentReviews?.length > 4 && !isExpanded && (
              <button
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => setIsExpanded(true)}
              >
                See More
              </button>
            )}
            {/* Optionally add a "See Less" button when expanded */}
            {isExpanded && (
              <button
                className="mt-4 text-blue-500 hover:underline"
                onClick={() => setIsExpanded(false)}
              >
                See Less
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
