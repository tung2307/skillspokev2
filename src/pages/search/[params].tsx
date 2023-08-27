import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import SearchResult from "~/components/SearchPage/SearchResult";
import { api } from "~/utils/api";

export default function Search() {
  const router = useRouter();
  const { service, district } = router.query; // Destructuring the query parameters
  const serviceValue = Array.isArray(service) ? service[0] : service;
  const districtValue = Array.isArray(district) ? district[0] : district;
  const { t } = useTranslation();

  const { data: searchResult, isLoading } = api.stores.getSearch.useQuery({
    service: serviceValue ?? "",
    location: districtValue ?? "",
  });
  if (isLoading) {
    return <div></div>; // This can be a spinner or any other loading indicator you'd prefer.
  }
  return (
    <>
      <div className="flex flex-col pb-2 md:border-b md:pb-10">
        {searchResult?.length ? (
          <>
            <div className="flex w-full justify-center pb-5 md:pb-10 md:pt-10">
              {searchResult.map((result, index) => (
                <SearchResult key={index} data={result} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="w-full pb-10">
              <div className="p-5 md:p-10">
                <div className="text-base font-bold md:text-xl">
                  {t("noServiceFound", {
                    service: serviceValue,
                    district: districtValue,
                  })}
                </div>
                <div>{t("findClose")} </div>
              </div>
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
    </>
  );
}
