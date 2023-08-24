import { useTranslation } from "react-i18next";
import Image from "next/image";
export default function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex h-full w-screen flex-col pt-5 sm:px-40 sm:pt-16 md:h-[24rem] md:px-10 lg:px-20">
        <div className="flex h-full w-full flex-col justify-center gap-5 md:flex-row md:gap-20 lg:gap-40">
          <div className="flex flex-col gap-5 text-center">
            <div className="border-b text-xl font-semibold">
              {t("customerService")}
            </div>
            <div className="flex flex-col gap-2">
              <div>{t("helpCenter")}</div>
              <div>{t("payment")}</div>
              <div>{t("refund")}</div>
              <div>{t("contact")}</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 text-center">
            <div className="border-b text-xl font-semibold">
              {t("aboutSkillspoke")}
            </div>
            <div className="flex flex-col gap-2 ">
              <div>{t("intro")}</div>
              <div>{t("career")}</div>
              <div>{t("terms")}</div>
              <div>{t("privacyPolicy")}</div>
              <div>{t("contactMedia")}</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 text-center">
            <div className="border-b text-xl font-semibold">
              {t("connectUs")}
            </div>
            <div className="flex h-[50px] w-full items-center justify-center md:w-[200px]">
              <Image
                alt="Social Media"
                src="/images/socialMedia.png"
                width={200}
                height={50}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full items-end justify-center border-b border-t text-sm">
          © 2023 <p className="text-[#4682B4]"> &nbsp;Skillspoke,LLC</p>
        </div>
      </div>
    </>
  );
}
