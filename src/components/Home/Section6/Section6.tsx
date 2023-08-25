import { useTranslation } from "react-i18next";

export default function Section6() {
  const { t } = useTranslation();
  return (
    <>
      <div className=" h-full w-full bg-gradient-to-l from-blue-200 to-white pb-10 hover:cursor-default">
        <div className="flex flex-col gap-2 pt-5 md:gap-10">
          <div className="flex justify-center text-2xl font-semibold md:text-4xl">
            {t("quickEasy")}
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-2 text-3xl font-semibold md:flex-row md:text-6xl">
            <span className="hidden text-gray-400 md:flex">&#10230;</span>
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 bg-white text-base shadow">
              {t("find")}
            </div>
            <span className="hidden text-[#4682B4] md:flex">&#10230;</span>
            <span className="flex text-[#4682B4] md:hidden">&#8595;</span>
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 bg-white text-base shadow">
              {t("confirm")}
            </div>
            <span className="hidden text-[#4682B4] md:flex">&#10230;</span>
            <span className="flex text-[#4682B4] md:hidden">&#8595;</span>
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 bg-white text-base shadow">
              {t("review")}
            </div>
            <span className="hidden text-gray-400 md:flex">&#10230;</span>
          </div>
        </div>
      </div>
    </>
  );
}
