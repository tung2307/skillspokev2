import { useRouter } from "next/router";
import { useState } from "react";
import { useRef } from "react";
import district from "../utils/district.json";
import service from "../utils/services.json";

type ServiceCategory = {
  "Home Services": string[];
  "Creative Services"?: string[];
  "Food & Dining"?: string[];
  "Technology & Web"?: string[];
  "Health & Wellness"?: string[];
  "Education & Learning"?: string[];
  "Legal & Financial"?: string[];
  "Travel & Leisure"?: string[];
  "Stores & Shopping"?: string[];
};

export default function Search() {
  const router = useRouter();
  const [serviceInput, setServiceInput] = useState("");
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [districtInput, setDistrictInput] = useState("");
  const [districtSuggestions, setDistrictSuggestions] = useState<Array<string>>(
    []
  );
  const serviceDropdownRef = useRef<HTMLDivElement>(null);
  const districtDropdownRef = useRef<HTMLDivElement>(null);

  // Hide the div on the '/hidden-page' route
  if (router.pathname === "/") {
    return null;
  }
  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setServiceInput(inputValue);

    // Create an array to hold all service suggestions
    const allServices: string[] = [];

    service.forEach((category) => {
      Object.values(category).forEach((services) => {
        if (Array.isArray(services)) {
          allServices.push(...services);
        }
      });
    });

    // Filter the suggestions based on user input
    const filteredSuggestions = allServices.filter((item) =>
      item.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleDistrictInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setDistrictInput(inputValue);
    const filteredDistrictSuggestions = district.filter((item) =>
      item.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setDistrictSuggestions(filteredDistrictSuggestions);
  };

  // useEffect(() => {
  //   // Handle clicks outside of the dropdown
  //   function handleClickOutside(e: MouseEvent) {
  //     if (
  //       (serviceDropdownRef.current &&
  //         !serviceDropdownRef.current.contains(e.target as Node)) ||
  //       (districtDropdownRef.current &&
  //         !districtDropdownRef.current.contains(e.target as Node))
  //     ) {
  //       setSuggestions([]);
  //       setDistrictSuggestions([]);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  return (
    <>
      <div className=" hidden h-10 justify-start text-lg text-black md:flex">
        <div className="relative">
          <input
            className="h-full rounded-l border-r pl-5 outline-none md:w-[100%] lg:w-72"
            placeholder="Service"
            value={serviceInput}
            onChange={handleServiceInputChange}
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
                    console.log("Service suggestion clicked:", suggestion);
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
            className="h-full rounded-r border-l pl-5 outline-none md:w-[100%] lg:w-72"
            placeholder="District"
            value={districtInput}
            onChange={handleDistrictInputChange}
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
      </div>
    </>
  );
}
