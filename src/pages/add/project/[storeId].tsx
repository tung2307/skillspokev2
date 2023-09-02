import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Project() {
  const { t } = useTranslation();
  const router = useRouter();
  const storeId =
    typeof router.query.storeId === "string" ? router.query.storeId : "";
  return (
    <>
      <div></div>
    </>
  );
}
