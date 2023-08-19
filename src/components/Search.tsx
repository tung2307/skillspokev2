import { useRouter } from "next/router";
import { useState } from "react";

import district from "../utils/district.json";
import service from "../utils/services.json";

export default function Search() {
  const router = useRouter();
  const [serviceInput, setServiceInput] = useState("");
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [districtInput, setDistrictInput] = useState("");
  // Hide the div on the '/hidden-page' route
  if (router.pathname === "/") {
    return null;
  }

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setServiceInput(inputValue);

    // Create an array to hold all service suggestions
    let allServices: Array<string> = [];
    service.forEach((category) => {
      Object.values(category).forEach((services) => {
        allServices = [...allServices, ...services];
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
  };

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
            <div className="absolute z-10 w-full rounded-b border bg-white">
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
            className="h-full rounded-r border-l pl-5 outline-none md:w-[100%] lg:w-72"
            placeholder="District"
            value={districtInput}
            onChange={handleDistrictInputChange}
          />
        </div>
      </div>
    </>
  );
}
