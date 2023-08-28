import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import ReviewCard from "./ReviewCard";
import Rating from "@mui/material/Rating";
import { useEffect } from "react";
type StoreDataProps = {
  data: {
    id: string; // changed to lowercase 'string'
    name: string; // changed to lowercase 'string'
    userId: string | null; // changed to lowercase 'string'
  };
  onRatingChange?: (rating: number) => void;
  isLoading: boolean;
};
export default function Review({
  data,
  onRatingChange,
  isLoading,
}: StoreDataProps) {
  const user = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  function handleSignIn() {
    const currentURL = window.location.href;
    void router.push(`/sign-in/${encodeURIComponent(currentURL)}`);
  }

  const { data: reviewData } = api.review.getStoreReview.useQuery(
    {
      storeId: data.id.toString(),
    },
    { enabled: !!data.id }
  );

  const { data: userData } = api.users.getUserbyId.useQuery(
    { userId: data.userId ?? "" },
    { enabled: !!data.userId }
  );
  const totalRating = reviewData?.reduce(
    (total, review) => total + review.rating,
    0
  );

  const averageRatingDisplay =
    totalRating && reviewData?.length
      ? (totalRating / reviewData.length).toFixed(1)
      : "0.0";

  const averageRating = parseFloat(averageRatingDisplay);

  const starCounts = [1, 2, 3, 4, 5].map((star) =>
    reviewData
      ? reviewData.filter((review) => review.rating === star).length
      : 0
  );

  useEffect(() => {
    if (onRatingChange) {
      onRatingChange(averageRating);
    }
  }, [averageRating, onRatingChange]);

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <div className="flex w-full flex-col">
            <div className="flex flex-col justify-between gap-5 border-b pb-5 md:flex-row">
              <div className="flex items-center">
                <div className="flex flex-col items-center gap-3 text-6xl">
                  {averageRatingDisplay}
                  <Rating
                    precision={0.5}
                    name="read-only"
                    value={averageRating}
                    readOnly
                    size="large"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 md:w-[26rem]">
                {starCounts.map((count, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between gap-2"
                  >
                    <div className="flex w-16 flex-row justify-center gap-1">
                      {5 - index}{" "}
                      <div>
                        {5 - index === 1 ? (
                          <>{t("star")}</>
                        ) : (
                          <>{router.locale === "en" ? <>stars</> : <>sao</>}</>
                        )}
                      </div>
                    </div>
                    <div className="flex h-2 w-full items-center rounded-lg border border-gray-300 bg-white md:w-[400px]">
                      <div
                        className="h-2 rounded-lg bg-blue-500"
                        style={{
                          width: `${
                            (count / (reviewData?.length ?? 1)) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-grow">
                <div className="flex w-full items-center justify-center">
                  {user.isSignedIn ? (
                    <>
                      {user.user.id != userData?.clerkId ??
                      userData?.role === "PRO" ? (
                        <>
                          <div className=" rounded border p-1 hover:bg-[#4682B4] hover:text-white">
                            <Link
                              href="/storeProfile/postReview/[storeId]/[storeName]"
                              as={`/storeProfile/postReview/${data.id}/${data.name}`}
                            >
                              {t("review")}
                            </Link>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <button onClick={handleSignIn}>{t("signIn")}</button>
                  )}
                </div>
              </div>
            </div>
            <div>
              {reviewData
                ?.sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
