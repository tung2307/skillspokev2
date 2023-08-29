import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Image from "next/image";
import { Rating } from "@mui/material";
import Link from "next/link";
type ReviewDataProps = {
  reviewData: {
    id: string;
    userId: string;
    storeId: string;
    rating: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function RecentReview({ reviewData }: ReviewDataProps) {
  const user = useUser();
  const { data: clerkUser } = api.review.getClerkUserReview.useQuery(
    {
      userId: reviewData.userId,
    },
    { enabled: !!reviewData.userId && !!user.isSignedIn }
  );

  const { data: storeData } = api.stores.getStoreProfile.useQuery(
    { storeId: reviewData.storeId },
    { enabled: !!reviewData.storeId && !!user.isSignedIn }
  );

  const date = new Date(reviewData.createdAt);
  const vietnamDate = date.toLocaleDateString("vi", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <>
      <div className="flex w-full flex-col gap-1 rounded border p-2 ">
        <div>
          {storeData && (
            <Link href={`/storeProfile/${storeData.id}`}>
              <div className="text-xl font-bold">{storeData.name}</div>
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center gap-2 border-b pb-2">
          {clerkUser && (
            <>
              <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                <Image
                  src={clerkUser?.imageUrl}
                  alt="profile"
                  width={50}
                  height={50}
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">
                  {clerkUser.firstName + " " + clerkUser.lastName}
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Rating
                    precision={0.5}
                    name="read-only"
                    value={reviewData.rating}
                    readOnly
                    size="small"
                  />
                  <div className="text-sm">{vietnamDate}</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div>{reviewData.description}</div>
      </div>
    </>
  );
}
