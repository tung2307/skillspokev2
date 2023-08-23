import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRef } from "react";
import district from "~/utils/district.json";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import service from "~/utils/services.json";

function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function Search() {
  const { t } = useTranslation();
  const router = useRouter();
  const [serviceInput, setServiceInput] = useState("");
  const [suggestions, setSuggestions] = useState<Array<string>>([]);

  const [districtInput, setDistrictInput] = useState("");
  const [districtSuggestions, setDistrictSuggestions] = useState<Array<string>>(
    []
  );
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const districtDropdownRef = useRef<HTMLDivElement>(null);

  const serviceKeys = Object.keys(t("services", { returnObjects: true }));

  const serviceWithMetadata = serviceKeys.map((serviceKey) => ({
    key: serviceKey, // the key (like "cleaning")
    translation: t(`services.${serviceKey}`), // the translated value (like "Cleaning" or "Dọn dẹp")
    clean: removeDiacritics(t(`services.${serviceKey}`)).toLowerCase(),
  }));

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setServiceInput(inputValue);
    const normalizedInputValue = removeDiacritics(inputValue).toLowerCase();

    const filteredServiceSuggestions = serviceWithMetadata
      .filter((itemObj) => itemObj.clean.includes(normalizedInputValue))
      .map((itemObj) => itemObj.translation); // We want to show the translated value in suggestions

    setSuggestions(filteredServiceSuggestions);
  };

  const districtWithMetadata = district.map((item) => ({
    original: item,
    clean: removeDiacritics(item.toLowerCase()),
  }));

  const handleDistrictInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setDistrictInput(inputValue);
    const normalizedInputValue = removeDiacritics(inputValue.toLowerCase());
    const filteredDistrictSuggestions = districtWithMetadata
      .filter((itemObj) => itemObj.clean.startsWith(normalizedInputValue))
      .map((itemObj) => itemObj.original);
    setDistrictSuggestions(filteredDistrictSuggestions);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      (serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(e.target as Node)) ??
      (districtDropdownRef.current &&
        !districtDropdownRef.current.contains(e.target as Node))
    ) {
      setSuggestions([]);
      setDistrictSuggestions([]);
    }
  };

  useEffect(() => {
    // Check the condition inside the hook
    if (router.pathname !== "/") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    // No cleanup function is returned if the condition is not met
  }, [router.pathname]); // Dependency on the router pathname

  // SearchButton
  function handleOnClick() {
    const isServiceValid = serviceWithMetadata.some(
      (item) => item.translation === serviceInput
    );

    const isDistrictValid = district.includes(districtInput);

    // Check if the service and district are included in the json files
    if (isServiceValid && isDistrictValid) {
      // Proceed with desired action, such as routing to search results page
      void router.push(
        `/search/results?service=${serviceInput}&district=${districtInput}`
      );
    } else if (!isServiceValid) {
      // Notify user that their input is not valid
      alert("Please enter a valid service.");
    } else if (!isDistrictValid) {
      // Notify user that their input is not valid
      alert("Please enter a valid district.");
    }
  }

  return (
    <>
      <div className=" hidden h-10 justify-start text-lg text-black md:flex">
        <div className="relative rounded-l border-b border-l border-t shadow">
          <input
            className="h-full rounded-l pl-2 outline-none md:w-[100%] lg:w-72"
            placeholder={t("service")}
            value={serviceInput}
            onChange={handleServiceInputChange}
            required
          />
          {suggestions.length > 0 && (
            <div
              ref={serviceDropdownRef}
              className="absolute max-h-40 w-full overflow-y-scroll rounded-b border bg-white"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => {
                    setServiceInput(suggestion);
                    setSuggestions([]); // Clears the suggestions once clicked
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative border-b border-l border-t shadow">
          <input
            className="h-full pl-2 outline-none md:w-[100%] lg:w-72"
            placeholder={t("district")}
            value={districtInput}
            onChange={handleDistrictInputChange}
            required
          />
          {districtSuggestions.length > 0 && (
            <div
              ref={districtDropdownRef}
              className="absolute max-h-40 w-full overflow-y-scroll rounded-b border bg-white"
            >
              {districtSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => {
                    setDistrictInput(suggestion);
                    setDistrictSuggestions([]); // Clears the suggestions once clicked
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className="mr-2 flex w-[2rem] items-center justify-center rounded-r border-b border-l border-r border-t bg-white text-[] shadow hover:cursor-pointer"
          onClick={handleOnClick}
        >
          <SearchIcon />
        </div>
      </div>
    </>
  );
}
