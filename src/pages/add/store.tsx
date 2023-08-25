import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import district from "../../utils/district.json";
import city from "../../utils/city.json";
import { useRouter } from "next/router";
type SpecificFormData = {
  name: string;
  service: string;
  remote: boolean;
  phone: string;
  address1: string;
  address2: string;
  ward: string;
  district: string;
  city: string;
  introduction: string;
};

function removeDiacritics(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // This removes most of the diacritics
    .replace(/Đ/g, "D") // Convert uppercase Đ to D
    .replace(/đ/g, "d"); // Convert lowercase đ to d
}
export default function Store() {
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    service: "",
    remote: false,
    phone: "",
    address1: "",
    address2: "",
    ward: "",
    district: "",
    city: "",
    introduction: "",
  });

  const [serviceInput, setServiceInput] = useState("");
  const [suggestions, setSuggestions] = useState<Array<string>>([]);

  const serviceKeys = Object.keys(t("services", { returnObjects: true }));

  const serviceWithMetadata = serviceKeys.map((serviceKey) => ({
    key: serviceKey, // the key (like "cleaning")
    translation: t(`services.${serviceKey}`), // the translated value (like "Cleaning" or "Dọn dẹp")
    clean: removeDiacritics(t(`services.${serviceKey}`)).toLowerCase(),
  }));

  const handleServiceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setServiceInput(inputValue);

    // Also update the formData with the input value
    setFormData((prev) => ({
      ...prev,
      service: inputValue,
    }));

    const normalizedInputValue = removeDiacritics(inputValue).toLowerCase();

    const filteredServiceSuggestions = serviceWithMetadata
      .filter((itemObj) => itemObj.clean.includes(normalizedInputValue))
      .map((itemObj) => itemObj.translation); // We want to show the translated value in suggestions

    setSuggestions(filteredServiceSuggestions);
  };
  const handleSuggestionClick = (suggestion: string) => {
    setServiceInput(suggestion);
    setFormData((prev) => ({
      ...prev,
      service: suggestion,
    }));
    setSuggestions([]); // Clear suggestions after selecting one
  };

  const [searchDistrictResults, setSearchDistrictResults] = useState<string[]>(
    []
  );
  const [searchCityResults, setSearchCityResults] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSearchDistrictResults([]);
        setSuggestions([]);
        setSearchCityResults([]);
      }
    }

    // Attach the click outside event
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the listener when the component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Filter districts based on the user input
    if (formData.district) {
      const results = district.filter((d: string) =>
        removeDiacritics(d)
          .toLowerCase()
          .includes(formData.district.toLowerCase())
      );
      setSearchDistrictResults(results);
    } else {
      setSearchDistrictResults([]);
    }
  }, [formData.district]);

  useEffect(() => {
    // Filter districts based on the user input
    if (formData.city) {
      const results = city.filter((c: string) =>
        removeDiacritics(c).toLowerCase().includes(formData.city.toLowerCase())
      );
      setSearchCityResults(results);
    } else {
      setSearchCityResults([]);
    }
  }, [formData.city]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target;

    let value: string | boolean;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }

    const name = target.name;

    setFormData((prevState: SpecificFormData) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { mutate } = api.stores.create.useMutation({
    onSuccess: (data) => {
      console.log("Mutation was successful:", data);
      alert(`${t("createSuccessfull")}`);
      if (data !== undefined) {
        void router.push(`/${data.id}`);
      }
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      alert(`${t("createFailed")}: ${error.message}`);
      // Handle error case here (e.g., show an error message to the user)
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate service
    const serviceTranslations = serviceWithMetadata.map(
      (item) => item.translation
    );
    const isValidService = serviceTranslations.includes(formData.service);
    if (!isValidService) {
      alert("Invalid service!"); // Again, replace with your preferred error handling
      return;
    }
    // Validate district
    const isValidDistrict = district.includes(formData.district);
    if (!isValidDistrict) {
      alert("Invalid district!"); // You can replace this with a more user-friendly error handling mechanism
      return;
    }

    const isValidCity = city.includes(formData.city);
    if (!isValidCity) {
      alert("Invalid city!"); // You can replace this with a more user-friendly error handling mechanism
      return;
    }
    const matchingServiceObj = serviceWithMetadata.find(
      (item) => item.translation === serviceInput
    );

    // Check if matchingServiceObj is defined and extract the key
    const serviceKeyForSubmission = matchingServiceObj
      ? matchingServiceObj.key
      : null;

    // If validation passes, proceed with the mutation
    mutate({
      ...formData,
      service: serviceKeyForSubmission?.toString() ?? "",
    });
  };

  return (
    <div className="flex w-full justify-center pb-10 md:border-b">
      <div className="flex w-[30rem] flex-col">
        <h2 className=" py-5 text-center text-4xl font-bold text-[#F08080]">
          {t("store.createStore")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 border-b shadow">
          <div className="p-5">
            <div className="pb-2 pt-1">
              <label className=" block ">{t("store.name")}:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border-b p-1 outline-none"
                required
              />
            </div>

            <div className="pb-2 pt-1">
              <label className=" block">{t("store.service")}:</label>
              <input
                type="text"
                name="service"
                value={serviceInput}
                onChange={handleServiceInputChange}
                className="w-full border-b p-1  outline-none"
                required
              />
              {suggestions.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="relative z-0 h-40 overflow-y-auto rounded-b border"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="cursor-pointer  bg-white p-2 hover:bg-gray-200"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pb-2 pt-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="remote"
                  checked={formData.remote}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Remote?
              </label>
            </div>

            <div className="pb-2 pt-1">
              <label className=" block ">{t("store.phone")}:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border-b p-1  outline-none"
              />
            </div>

            <div className="pb-2 pt-1">
              <label className=" block">{t("store.address1")}:</label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                className="w-full border-b p-1  outline-none"
              />
            </div>

            <div className="pb-2 pt-1">
              <label className=" block">{t("store.address2")}:</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                className="w-full border-b p-1  outline-none"
              />
            </div>

            <div className="pb-2 pt-1">
              <label className=" block ">{t("store.ward")}:</label>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleInputChange}
                className="w-full border-b p-1  outline-none"
              />
            </div>

            <div className="pb-2 pt-1">
              <label className=" block">{t("store.district")}:</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full border-b p-1  outline-none"
                required
              />
              {searchDistrictResults.length > 0 && (
                <div ref={dropdownRef} className="relative z-0">
                  <div className=" absolute top-0 z-10 h-40 w-full overflow-y-auto rounded-b border">
                    {searchDistrictResults.map((result, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, district: result }))
                        }
                        className="cursor-pointer bg-white p-2 hover:bg-gray-200"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pb-2 pt-1">
              <label className=" block">{t("store.city")}:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border-b p-1  outline-none"
                required
              />
              {searchCityResults.length > 0 && (
                <div ref={dropdownRef} className="relative z-0">
                  <div className=" absolute top-0 z-10 h-40 w-full overflow-y-auto rounded-b border">
                    {searchCityResults.map((result, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, city: result }))
                        }
                        className="cursor-pointer bg-white p-2 hover:bg-gray-200"
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="pb-2 pt-1">
              <label className=" block ">{t("store.introduction")}:</label>
              <textarea
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                className="w-full resize-none border p-1 outline-none"
                rows={4} // You can adjust the number of rows as needed
              ></textarea>
            </div>
            <div className="mt-2">
              <button
                type="submit"
                className="w-full rounded bg-[#4682B4] px-5 py-2 font-bold text-white outline-none hover:border hover:bg-white hover:text-[#4682B4]"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
