import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRef } from "react";
import district from "~/utils/district.json";
import service from "~/utils/services.json";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

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

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setServiceInput(inputValue);
    const filteredServiceSuggestions = service.filter((item) =>
      item.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setSuggestions(filteredServiceSuggestions);
  };
  const handleDistrictInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setDistrictInput(inputValue);
    const normalizedInputValue = removeDiacritics(inputValue.toLowerCase());
    const filteredDistrictSuggestions = district.filter((item) =>
      removeDiacritics(item.toLowerCase()).startsWith(normalizedInputValue)
    );
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

  // Hide the div on the '/hidden-page' route

  if (router.pathname === "/") {
    return null;
  }
  // SearchButton
  function handleOnClick() {
    const isServiceValid = service.includes(serviceInput);
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
        <div className="relative">
          <input
            className="h-full rounded-l border-r pl-2 outline-none md:w-[100%] lg:w-72"
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
        <div className="relative">
          <input
            className="h-full border-l border-r pl-2 outline-none md:w-[100%] lg:w-72"
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
          className="mr-2 flex w-[2rem] items-center justify-center rounded-r border-r bg-white text-[] hover:cursor-pointer"
          onClick={handleOnClick}
        >
          <SearchIcon />
        </div>
      </div>
    </>
  );
}
