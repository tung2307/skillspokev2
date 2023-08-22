import React from "react";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
class MyClassComponent extends React.Component {
  myIp: string | null = null;

  getMyIp = () => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        return response.json();
      })
      .then((res: any) => {
        this.myIp = get(res, "ip");
      })
      .catch((err: any) => console.error("Problem fetching my IP", err));
  };

  render() {
    return (
      <>
        {" "}
        <div>
          My IP: {this.myIp} {/* Render the myIp value here */}
        </div>
      </>
    );
  }
}

export default function Section2() {
  const { t } = useTranslation();
  return (
    <>
      <div className="mt-4 w-screen">
        <div className="flex justify-center">
          <p className="text-2xl font-semibold">
            {t("popularService")} {}
          </p>
          <MyClassComponent />
        </div>
      </div>
    </>
  );
}
