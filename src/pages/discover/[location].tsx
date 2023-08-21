import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();
  const router = useRouter();
  const location =
    typeof router.query.location === "string"
      ? router.query.location
      : "Bình Thạnh";

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        {t("discover")}
        {" ở "}
        <p className="ml-1 font-bold">{location}</p>
      </div>
    </>
  );
}
