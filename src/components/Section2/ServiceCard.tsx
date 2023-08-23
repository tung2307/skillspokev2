import Image from "next/image";
import { useTranslation } from "react-i18next";
type ServiceProps = {
  id: string;
  name: string;
};

type ServiceDataProps = {
  service: ServiceProps | null | string;
};

export default function ServiceCard({ service }: ServiceDataProps) {
  const { t } = useTranslation();
  if (!service) return null;

  if (typeof service === "string") {
    return <div className="h-full bg-white">{service}</div>;
  }

  return (
    <>
      <div className="flex w-full flex-col gap-5 pb-5 md:gap-10">
        <div className="flex w-full justify-center">
          <div className="h-[150px] w-[250px] rounded-lg border md:h-[200px] md:w-[300px]">
            <Image
              src="/"
              alt={t(`services.${service.name}`)}
              width={300}
              height={200}
              className="flex items-center justify-center rounded-lg bg-white"
            />
          </div>
        </div>

        <div className="flex w-full flex-grow justify-center text-base font-semibold md:text-lg">
          {t(`services.${service.name}`)}
        </div>
      </div>
    </>
  );
}
