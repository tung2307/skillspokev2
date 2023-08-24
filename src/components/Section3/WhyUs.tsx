import Image from "next/image";
import ssLogo from "../../../public/images/Skillspoke_fb.png";
import { useTranslation } from "react-i18next";

export default function WhyUs() {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-screen border-b px-5 pb-5 sm:p-10 md:w-[50vw] md:border-r">
        <div className="flex flex-col p-5 sm:p-20 md:w-full md:p-0">
          <div className="flex flex-col gap-2">
            <div className="h-[40px] w-[40px] md:h-[80px] md:w-[80px]">
              <Image alt="SS Logo" src={ssLogo} layout="responsive" />
            </div>
            <div className=" text-xl font-semibold md:text-4xl">
              {t("whyUs")}
            </div>
            <div className="rounded-lg border p-2 text-base shadow-lg md:text-lg">
              {t("aboutUs")}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
