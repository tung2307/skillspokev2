import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function ProjectPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const storeId =
    typeof router.query.storeId === "string" ? router.query.storeId : "";

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col p-5">
          <div className="flex w-auto justify-center text-4xl font-bold">
            {t("project")}
          </div>
          <div className="w-ful flex h-auto justify-center">
            <div className=" h-96 w-[75vw] border">
              <div className="grid w-full grid-cols-1 gap-10 p-5 lg:grid-cols-2">
                <div
                  className="flex h-80 w-56 items-center justify-center border-2 border-dashed hover:cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    void router.push(`/add/project/${storeId}`);
                  }}
                >
                  + {t("create")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
