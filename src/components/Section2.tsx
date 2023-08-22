import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IPAddressResponse {
  ip: string;
}

export default function Section2() {
  const { t } = useTranslation();

  const [ipAddress, setIPAddress] = useState<string>("");

  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data: IPAddressResponse) => setIPAddress(data.ip)) // Using the defined interface here
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
