import MobileApp from "./MobileApp";
import Image from "next/image";
import ssLogo from "../../../public/images/Skillspoke_fb.png";
import { useTranslation } from "react-i18next";
export default function Section3() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex  w-screen flex-col md:h-[36rem] md:flex-row">
        <div className="w-screen border-b px-5 pb-5 sm:p-10 md:w-[50vw] md:border-r">
          <div className="flex flex-col p-5 sm:p-20 md:w-full md:p-0">
            <div className="flex flex-col gap-2">
              <div className="h-[80px] w-[80px]">
                <Image alt="SS Logo" src={ssLogo} width={80} height={80} />
              </div>
              <div className="text-xl font-semibold">{t("whyUs")}</div>
              <div className="rounded-lg border p-2 text-base shadow-lg md:text-lg">
                Skillspoke là một nền tảng toàn cầu kết nối nhà cung cấp dịch vụ
                và khách hàng một cách tiện lợi. Chúng tôi cung cấp nhiều tính
                năng và lợi ích giúp khách hàng dễ dàng tìm kiếm được dịch vụ phù
                hợp với nhu cầu của bạn. Đối với Pros, chúng tôi giúp các bạn
                tiếp cận khách hàng nhiều hơn và phát triển việc kinh doanh của
                bạn.
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <MobileApp />
      </div>
    </>
  );
}
