import { useTranslation } from "react-i18next";

import Image from "next/image";
import mobileApp from "../../../public/images/Group 25.svg";
import appleLink from "../../../public/images/0788d2fcf65f7962bdc7fb4775ddcd0a 1.svg";
import androidLink from "../../../public/images/c31ead5a632deb79820919d0e8c0b97b 1.svg";
import Link from "next/link";

export default function MobileApp() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex h-full w-screen flex-col border-l md:w-[50vw]">
        <div className="flex h-full w-full justify-center">
          <div className="flex flex-col ">
            <div className="flex justify-center pt-5 text-lg font-semibold sm:text-3xl">
              {t("appAvailable")}
            </div>
            <div className="mt-5 flex transform flex-col  gap-2 sm:translate-x-32 sm:translate-y-16 md:translate-x-12 md:translate-y-5 lg:translate-x-36 lg:translate-y-10">
              <Link href="/">
                <Image
                  alt="Apple Link"
                  src={appleLink as string}
                  width={130}
                  height={100}
                />
              </Link>
              <Link href="/">
                <Image
                  alt="Android Link"
                  src={androidLink as string}
                  width={130}
                  height={100}
                />
              </Link>
            </div>
            <div
              className="
    flex 
    h-[300px] 
    w-[300px] 
    transform 
    items-end 
    sm:h-[400px] 
    sm:w-[400px]
    sm:translate-x-56 
    sm:translate-y-0
    md:-translate-x-5
    md:translate-y-0
    lg:h-[400px]
    lg:w-[350px]
    lg:translate-x-36 
    lg:translate-y-0 
    xl:translate-x-56 
    xl:translate-y-0
    "
            >
              <Image
                alt="Mobile App"
                src={mobileApp as string}
                width={400}
                height={400}
                className="z-11 sticky"
              />
            </div>
          </div>

          <div className="w-0 sm:w-64 md:w-80">
            <div className=" -z-10 hidden h-full w-full justify-end rounded-es-[30px] rounded-ss-[30px] bg-[#4682B4] lg:flex "></div>
          </div>
        </div>
      </div>
    </>
  );
}
