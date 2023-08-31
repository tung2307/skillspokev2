import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import RecentReviewCard from "./RecentReviewCard";

type UserDataProps = {
  userData: {
    id: string;
    clerkId: string;
    name: string | null;
    role: string;
  };
};
export default function CustomerPage({ userData }: UserDataProps) {
  const { t } = useTranslation();
  const { data: recentReview } = api.review.getRecentReview.useQuery(
    { clerkId: userData.clerkId },
    { enabled: !!userData.clerkId }
  );

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="max-h-[150vh] min-h-[50vh] w-full overflow-y-auto border-b p-5">
          <div className="flex flex-col gap-2">
            <div className="text-xl font-bold">{t("yourRecentReview")}</div>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {recentReview?.map((review) => (
                <RecentReviewCard key={review.id} reviewData={review} />
              ))}
            </div>
          </div>
        </div>
        <div className="h-[50vh]"></div>
      </div>
    </>
  );
}
