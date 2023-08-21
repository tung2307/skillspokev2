import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Search() {
  const router = useRouter();
  const { service, district } = router.query; // Destructuring the query parameters

  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <p className="mb-3 mt-3 w-[90%] text-center">{t("addStore")}</p>
        </div>

        <div className="flex justify-center">
          <Link href="/add/store">
            <p className="flex w-40 justify-center rounded-lg border bg-[#4682B4] p-2 text-white">
              {t("create")}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
