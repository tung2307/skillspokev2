import Link from "next/link";
import { useTranslation } from "react-i18next";

type StoreDataProps = {
  data: {
    id: string;
    name: string;
    remote: boolean;
    phone: string | null;
    district: string;
    city: string;
    introduction: string | null;
  };
};

export default function SearchResult({ data }: StoreDataProps) {
  const { t } = useTranslation();
  return (
    <>
      <Link href={`/storeProfile/${data.id}`}>
        <div className=" flex w-[35rem] justify-center border-b p-2 md:justify-start">
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="h-[150px] w-[150px] flex-shrink-0 rounded-lg bg-gray-500"></div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{data.name}</div>
                <div>{t("noRating")}</div>
              </div>
              <div>
                {data.phone ? (
                  <>
                    {t("phone")}:&nbsp;{data.phone}
                  </>
                ) : null}
              </div>
              <div>
                {t("address")}:&nbsp;{data.district + ", " + data.city}
              </div>
              {data.remote ? <>Online/Remote</> : null}
              <div
                className="h-[3rem] overflow-hidden"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {data.introduction}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
