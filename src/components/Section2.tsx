import React from "react";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

type ApiResponse = {
  ip: string;
};

class MyClassComponent extends React.Component {
  myIp: string | null = null;

  getMyIp = () => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((res: ApiResponse) => {
        this.myIp = get(res, "ip");
      })
      .catch((err: Error) => console.error("Problem fetching my IP", err));
  };

  componentDidMount() {
    this.getMyIp();
  }

  render() {
    return (
      <>
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
