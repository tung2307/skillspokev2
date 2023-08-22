import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Section2() {
  const { t } = useTranslation();

  const [ipAddress, setIPAddress] = useState("");

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIPAddress(data.ip))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="mt-4 w-screen">
        <div className="flex justify-center">
          <p className="text-2xl font-semibold">
            {t("popularService")} {ipAddress}
          </p>
        </div>
      </div>
    </>
  );
}
