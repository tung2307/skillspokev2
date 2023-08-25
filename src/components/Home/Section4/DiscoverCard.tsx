import { useTranslation } from "react-i18next";
import servicesData from "../../../utils/services.json";
import Image from "next/image";
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
                  width={300}
                  height={250}
                  quality={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1000px"
                  className="absolute left-0 top-0 h-full w-full object-cover object-center"
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
