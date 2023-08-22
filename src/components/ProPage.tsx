import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
type ProPageProps = {
  userData?: {
    id: string;
    clerkId: string;
    role: string;
    // Make sure Role is defined somewhere in your code
  } | null;
  storeData?: {
    id: string;
    userId: string;
    name: string;
    remote: boolean;
    phone: string | null;
    // other fields
    updatedAt: Date;
  } | null;
};
const ProPage: React.FC<ProPageProps> = ({ userData, storeData }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex w-full flex-col">
        <div className="h-screen md:h-1/2">
          <p className="m-5 text-xl font-bold">{t("manageService")}</p>
        </div>
        <div className="flex flex-grow border-t">
          <p className="m-5 text-xl font-bold">{t("recentReview")}</p>
        </div>
      </div>
    </>
  );
};
export default ProPage;
