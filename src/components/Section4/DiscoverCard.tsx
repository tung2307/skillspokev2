import { useTranslation } from "react-i18next";
import servicesData from "../../utils/services.json";
import Image from "next/image";
import { useState } from "react";

const services: ServicesType = servicesData as ServicesType;

type Props = {
  category: string;
  location: string;
};
type ServicesType = {
  Beauty: string[];
  "Home Services": string[];
  "Creative Services": string[];
  Food: string[];
  Technology: string[];
  Fitness: string[];
  Education: string[];
  Financial: string[];
  Travel: string[];
  Retail: string[];
};

export default function DiscoverCard({ category, location }: Props) {
  const { t } = useTranslation();
  const serviceList = services[category as keyof ServicesType];
  const imagePath = "/images/services/";

  return (
    <div className="relative mt-5 rounded bg-white p-5 shadow-md">
      <div className="flex w-full flex-row gap-10 overflow-x-auto">
        {/* Added overflow-x-auto here */}
        {serviceList?.map((service, idx) => (
          <div key={idx} className="flex-none pb-5">
            <div className="flex flex-col rounded border">
              <div className="relative h-[250px] w-[300px] overflow-hidden border-b">
                <Image
                  src={imagePath + `${service}` + ".png"}
                  alt={t(`services.${service}`)}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  className="absolute inset-0 flex items-center justify-center bg-white"
                />
              </div>
              <div className="flex justify-center py-3 font-semibold">
                {t(`services.${service}`)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
