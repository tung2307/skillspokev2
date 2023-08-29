import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { api } from "~/utils/api";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/nextjs";

export default function PostReview() {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const storeId =
    isClient && router.isReady && typeof router.query.storeId === "string"
      ? router.query.storeId
      : null;
  const storeName =
    isClient && router.isReady && typeof router.query.storeName === "string"
      ? router.query.storeName
      : null;

  useEffect(() => {
    if (isClient) {
      if (!user.isSignedIn) {
        void router.push(`/storeProfile/${storeId}`);
      }
    }
  }, [user, storeId, router, isClient]);

  useEffect(() => {
    if (isClient && !user.isSignedIn) {
      void router.push(`/storeProfile/${storeId}`);
    }
  }, [isClient]);
  // State for the input values
  const [rating, setRating] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [formValidated, setFormValidated] = useState(false);

  const ratingLabels: Record<number, string> = {
    1: "Needs Improvement",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  const { mutate, isLoading } = api.review.create.useMutation({
    onSuccess(data) {
      console.log("Mutation was successful:", data);

      void router.push(`/storeProfile/${data.storeId}`);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);

      // Handle error case here (e.g., show an error message to the user)
    },
  });
  const handleSubmit = () => {
    setFormValidated(true);

    if (
      rating != 0 &&
      storeId != null &&
      rating != null &&
      description.trim() !== ""
    ) {
      mutate({
        storeId: storeId,
        rating: rating,
        description: description,
      });
    }
  };

  return (
    <>
      <div className="flex w-screen justify-center p-10">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-bold">{storeName}</div>
          <div className="w-full rounded border p-5 shadow md:w-[50rem] md:p-10">
            <div className="mb-4">
              <label className="mb-2 block">
                {router.locale === "en" ? <>Rating</> : <>{t("review")}</>}:
              </label>

              <div className="flex flex-row items-center justify-start gap-5 text-sm md:text-lg">
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="medium"
                />
                <div className="">
                  {rating ? (
                    <>{t(`${ratingLabels[rating]}`)}</>
                  ) : (
                    <>{t("selectRating")}</>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="mb-2 block">
                {router.locale === "vi" ? <>Mô Tả</> : <>Description</>}:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none border p-2 outline-none"
                rows={5}
              ></textarea>
              {formValidated && !description.trim() ? (
                <span className="text-red-500">{t("required")}</span>
              ) : null}
            </div>

            <div>
              {isLoading ? (
                <button
                  onClick={handleSubmit}
                  className="rounded bg-[#4682B4] p-2 text-white"
                  disabled
                >
                  {t("posting")}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="rounded bg-[#4682B4] p-2 text-white"
                >
                  {t("post")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
