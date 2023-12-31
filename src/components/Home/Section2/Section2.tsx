import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import ServiceCard from "./ServiceCard";
import cities from "../../../utils/city.json"; // Adjust path to where city.json is located
import district from "../../../utils/district.json";
type ServiceProps = {
  id: string;
  name: string;
};
type ApiResponse = {
  location: {
    city: string;
  };
};

function removeDiacritics(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // This removes most of the diacritics
    .replace(/Đ/g, "D") // Convert uppercase Đ to D
    .replace(/đ/g, "d"); // Convert lowercase đ to d
}

function getClosestCity(cityName: string) {
  cityName = cityName.replace(/city/i, "").trim();
  const processedCityName = removeDiacritics(cityName).toLowerCase();
  const matchingCity = cities.find(
    (city) => removeDiacritics(city).toLowerCase() === processedCityName
  );

  if (!matchingCity) {
    const matchingCity = district.find(
      (province) =>
        removeDiacritics(province).toLowerCase() === processedCityName
    );
    return matchingCity ?? cityName;
  }

  return matchingCity ?? cityName;
}

export default function Section2() {
  const { t } = useTranslation();
  const [isLocation, setIsLocation] = useState(false);
  const [location, setLocation] = useState("Loading...");
  const [initialLocation, setInitialLocation] = useState(location);
  useEffect(() => {
    setInitialLocation(location);
  }, [location]); // Empty dependency array ensures this effect runs only once when the component mounts

  const defaultServices: ServiceProps[] = [
    { id: "default1", name: "Home Cleaning" },
    { id: "default2", name: "Plumbing" },
    { id: "default3", name: "Electrician" },
  ];
  useEffect(() => {
    if (!isLocation) {
      fetch(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((json: ApiResponse) => {
          const vietnameseCity = getClosestCity(json.location.city);
          setLocation(vietnameseCity);
        })
        .catch((error) => {
          console.error("There was a problem fetching the location:", error);
        });

      setIsLocation(true);
    }
  }, [isLocation]);
  const { data: services } = api.stores.getServices.useQuery(
    { location: initialLocation ?? "" },
    { enabled: !!initialLocation }
  );
  const displayedServices = services?.length ? services : defaultServices;

  return (
    <>
      <div className="flex h-auto w-screen flex-col gap-7 bg-gray-100 pb-8 pt-8">
        <div className="flex justify-center">
          <div className="flex flex-row text-lg font-semibold md:text-2xl">
            <p>{t("popularService")}&nbsp;</p>
            <p className="border-b border-[#F08080] text-[#F08080]">
              {location}
            </p>
          </div>
        </div>
        <div className="flex h-full justify-center overflow-y-hidden ">
          <div className="flex max-w-screen-xl gap-8 overflow-x-auto whitespace-nowrap px-4 scrollbar-hide">
            {displayedServices.map((service, index) => {
              if (typeof service === "string") {
                // Handle default services (which are just strings)
                return <ServiceCard key={index} service={service} />;
              } else {
                // Handle actual service objects
                return <ServiceCard key={service.id} service={service} />;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
