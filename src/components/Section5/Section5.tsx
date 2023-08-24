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
                  className="flex items-center justify-center rounded p-2 hover:cursor-pointer hover:border-b-2"
                >
                  <div className="relative h-[75px] w-[75px] border-b">
                    <Image
                      src={imagePath + `${item}` + ".png"}
                      alt={t(`${item}`)}
                      width={75}
                      height={75}
                      objectFit="cover"
                      quality={100}
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
