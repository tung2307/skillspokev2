import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";

export default function Search() {
  const router = useRouter();
  const { service, district } = router.query; // Destructuring the query parameters
  const serviceValue = Array.isArray(service) ? service[0] : service;
  const districtValue = Array.isArray(district) ? district[0] : district;
  const [isSearch, setIsSearch] = useState(false);
  const { t } = useTranslation();
  const [hasQueried, setHasQueried] = useState(false);

  useEffect(() => {
    if (!hasQueried) {
      setHasQueried(true);
    }
  }, []);

  const { data: searchResult } = api.stores.getSearch.useQuery(
    {
      service: serviceValue ?? "",
      location: districtValue ?? "",
    },
    { enabled: !!(serviceValue && districtValue && !hasQueried) }
  );
  useEffect(() => {
    if (searchResult?.length === undefined) return;
    if (searchResult?.length > 0) {
      setIsSearch(true);
    }
  }, [searchResult]);
  return (
    <>
      <div className="flex flex-col pb-5 md:border-b md:pb-10">
        <div className="w-full pb-10">
          {isSearch ? (
            <>Show the search</>
          ) : (
            <>
              <div className="p-5 md:p-10">
                <div className="text-base font-bold md:text-xl">
                  {t("noServiceFound", {
                    service: serviceValue,
                    district: districtValue,
                  })}
                </div>
                <div>{t("findClose")} </div>
              </div>
            </>
          )}
        </div>
        <div>
          <div className="flex justify-center">
            <p className="mb-3 mt-3 w-[90%] text-center">{t("addStore")}</p>
          </div>

          <div className="flex justify-center">
            <Link href="/add/store">
              <p className="flex w-40 justify-center rounded-lg border bg-[#4682B4] p-2 text-white hover:bg-white hover:text-[#4682B4]">
                {t("create")}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
