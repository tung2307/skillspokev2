import { useTranslation } from "react-i18next";
import Image from "next/image";
export default function Section5() {
  const category = [
    "Home",
    "Technology",
    "Fitness",
    "Education",
    "Finance",
    "Travel",
    "Food",
    "More",
  ];
  const { t } = useTranslation();
  const imagePath = "/images/category/";

  return (
    <>
      <div className="flex h-full w-full justify-center pb-10 md:h-[26rem] ">
        <div className="flex w-full flex-col pt-10 text-center md:w-[75vw]">
          <div className="text-2xl font-semibold md:text-4xl">
            {t("category")}
          </div>
          <div className="flex justify-center pt-5 sm:pt-10">
            <div className="mt-5 grid w-64 grid-cols-2 gap-10 sm:w-96 sm:grid-cols-3 md:w-[40rem] md:grid-cols-4">
              {category.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-xl p-2 hover:cursor-pointer hover:shadow-lg"
                >
                  <div className="relative h-[75px] w-[75px]">
                    <Image
                      src={imagePath + `${item}` + ".png"}
                      alt={t(`${item}`)}
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px"
                      className="absolute inset-0 flex items-center justify-center bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
