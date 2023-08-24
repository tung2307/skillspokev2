import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import DiscoverCard from "./DiscoverCard";

export default function Section4() {
  const { t } = useTranslation();
  const categories = ["Food", "Education", "Technology"]; // This array helps manage our transforms
  const [selectedItem, setSelectedItem] = useState<string>(
    categories[0] ?? "Food"
  );
  const getTransform = (itemName: string) => {
    const selectedIndex = categories.indexOf(selectedItem || "");
    const currentIndex = categories.indexOf(itemName);

    if (currentIndex < selectedIndex) {
      return "translateX(-50%)"; // Move left if the current item is before the selected item
    } else if (currentIndex > selectedIndex) {
      return "translateX(50%)"; // Move right if the current item is after the selected item
    }
    return "translateX(0%)"; // No movement if current item is the selected item
  };

  const getDivStyles = (itemName: string) => {
    const baseStyles = "transition-transform duration-500 ease-in-out"; // Base transition styles
    if (itemName === selectedItem) {
      return `${baseStyles} border border-white bg-white text-black cursor-pointer rounded p-1 border shadow`;
    }
    return `${baseStyles} cursor-pointer hover:border hover:border-white hover:rounded transform p-1 ${getTransform(
      itemName
    )}`;
  };

  const [isLocation, setIsLocation] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (isLocation === false) {
      fetch(`https://api.ipregistry.co/?key=${process.env.NEXT_PUBLIC_API_KEY}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((json: { location: { city: string } }) => {
          setLocation(json.location.city);
        })
        .catch((error) => {
          console.error("There was a problem fetching the location:", error);
        });

      setIsLocation(true);
    }
  }, [isLocation]);

  return (
    <>
      <div className="flex w-screen justify-center bg-[#1166b13f] pb-4 md:h-[37rem] ">
        <div className="flex w-full flex-col gap-2 p-3 pt-5 md:w-[75vw] md:p-10">
          <div className="text-2xl font-semibold md:text-4xl">
            {t("discover")}
          </div>
          <div className="flex flex-row gap-3 text-center text-lg md:gap-10 md:text-xl ">
            {categories.map((category) => (
              <div
                key={category}
                className={getDivStyles(category)}
                onClick={() => setSelectedItem(category)}
              >
                {t(`${category}`)}
              </div>
            ))}
            <div className="flex transform cursor-pointer items-center p-1 hover:rounded hover:border hover:border-white">
              <Link href={`/discover/${location}`}>{t("More")}</Link>
            </div>
          </div>
          {/* Show the DiscoverCard based on the selected category */}
          <DiscoverCard category={selectedItem} location={location} />
        </div>
      </div>
    </>
  );
}
