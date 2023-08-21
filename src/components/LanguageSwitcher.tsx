import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import i18n from "~/utils/i18n"; // Adjust the path to point to your i18n.ts file
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const changeLanguage = (lang: "en" | "vi") => {
    setIsOpen(false); // Close the dropdown
    void i18n.changeLanguage(lang); // Change language in i18next

    // Keep the current query parameters
    const { pathname, query } = router;

    // Convert the query object to a query string
    const queryString = Object.entries(query)
      .map(([key, value]) => {
        if (value === undefined) {
          return ""; // Exclude this key-value pair if the value is undefined
        }
        // Handle array values for query parameters
        if (Array.isArray(value)) {
          return value.map((v) => `${key}=${encodeURIComponent(v)}`).join("&");
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .filter((queryPart) => queryPart.length > 0) // Exclude any empty strings
      .join("&");

    // Construct the new URL
    const newUrl = `${pathname}?${queryString}`;
    void router.push(newUrl, undefined, { locale: lang }); // Update locale in Next.js
  };

  const currentLang = i18n.language; // Get the current language from i18n
  let displayLang;

  switch (currentLang) {
    case "en":
      displayLang = "EN";
      break;
    case "vi":
      displayLang = "VN";
      break;
    default:
      displayLang = "Select"; // Default to EN if the language is not recognized
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false); // Close the dropdown if clicked outside
    }
  };
  useEffect(() => {
    // Add the handleClickOutside listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove the handleClickOutside listener from the document
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // An empty dependency array means this effect will only run once, similar to componentDidMount in class components

  return (
    <div className="relative flex items-center text-white" ref={wrapperRef}>
      <div
        className="flex items-center text-sm hover:cursor-pointer md:text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        <LanguageIcon />
        <div>{displayLang}</div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-40 rounded-lg bg-white text-black shadow-lg">
          <button
            onClick={() => changeLanguage("en")}
            className="block w-full px-4 py-2 text-left hover:rounded-t-lg hover:bg-gray-200"
          >
            {t("english")}
          </button>
          <button
            onClick={() => changeLanguage("vi")}
            className="block w-full px-4 py-2 text-left hover:rounded-b-lg hover:bg-gray-200"
          >
            {t("vietnamese")}
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
