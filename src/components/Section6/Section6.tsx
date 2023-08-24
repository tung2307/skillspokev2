import { useTranslation } from "react-i18next";

export default function Section6() {
  const { t } = useTranslation();
  return (
    <>
      <div className="h-[30rem] w-full bg-gradient-to-l from-blue-200 to-white">
        <div className="flex flex-col pt-10">
          <div className="flex justify-center text-2xl font-semibold md:text-4xl">
            {t("quickEasy")}
          </div>
        </div>
      </div>
    </>
  );
}
