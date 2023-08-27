import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Rating from "@mui/material/Rating";
import Image from "next/image";

type ReviewCardProps = {
  review: {
    id: string;
    userId: string;
    storeId: string;
    rating: number;
    description: string;
    createdAt: Date;
  };
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const router = useRouter();

  const date = new Date(review.createdAt);
  const vietnamDate = date.toLocaleDateString("vi", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const { data: clerkUser, isLoading } = api.review.getClerkUserReview.useQuery(
    {
      userId: review.userId,
    },
    { enabled: !!review.userId }
  );

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <div className="border-b p-1 pt-5">
            <div className="flex flex-col gap-1 md:gap-2">
              <div className="flex flex-row gap-2">
                <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                  <Image
                    src={clerkUser?.imageUrl ?? ""}
                    alt="profile"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="flex items-center font-semibold">
                  {clerkUser?.firstName + " " + clerkUser?.lastName ??
                    clerkUser?.username}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <Rating
                  name="read-only"
                  value={review.rating}
                  readOnly
                  size="medium"
                />
                <div className="flex items-center text-sm md:text-base">
                  {vietnamDate}
                </div>
              </div>
              <div>{review.description}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
