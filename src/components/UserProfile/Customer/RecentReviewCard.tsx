import { Rating } from "@mui/material";
import Link from "next/link";
import { api } from "~/utils/api";

type RecentReviewCardProps = {
  reviewData: {
    id: string;
    clerkId: string;
    storeId: string;
    rating: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function RecentReviewCard({
  reviewData,
}: RecentReviewCardProps) {
  const { data: storeData } = api.stores.getStoreProfile.useQuery({
    storeId: reviewData.storeId,
  });

  const date = new Date(reviewData.createdAt);
  const vietnamDate = date.toLocaleDateString("vi", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="h-40 rounded border p-2">
        <div className="flex h-full flex-col gap-2">
          <Link
            href={`/storeProfile/${reviewData.storeId}`}
            className="w-20 text-xl font-bold hover:underline"
          >
            {storeData?.name}
          </Link>
          <div className="flex flex-row gap-2">
            <Rating
              precision={0.5}
              name="read-only"
              value={reviewData.rating}
              readOnly
              size="small"
            />
            <div className="text-sm">{vietnamDate}</div>
          </div>
          <div className=" overflow-y-auto">{reviewData.description}</div>
        </div>
      </div>
    </>
  );
}
