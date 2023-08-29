import Link from "next/link";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import Image from "next/image";
import { useRouter } from "next/router";
type StoreDataProps = {
  storeData: {
    id: string;
    userId: string;
    name: string;
    service: string;
    remote: boolean;
    phone: string | null;
    address1: string | null;
    address2: string | null;
    ward: string | null;
    district: string;
  };
};

export default function ManageStoreCard({ storeData }: StoreDataProps) {
  const router = useRouter();
  const { data: storePic } = api.stores.getStoreProfilePicture.useQuery(
    {
      storeId: storeData.id,
    },
    { enabled: !!storeData.id }
  );
  const { t } = useTranslation();
  const { mutate, isLoading } = api.stores.deleteStore.useMutation({
    onSuccess: () => {
      router.reload();
    },
  });
  function handleDeleteClick() {
    mutate({ storeId: storeData.id });
  }
  return (
    <>
      <div className="flex h-[300px] w-[220px] flex-col border-2 border-solid">
        <div className="flex h-[200px] w-full flex-col">
          {storePic ? (
            <Image
              src={storePic?.fileUrl}
              alt="profile"
              width={150}
              height={150} // Adjust the height to be consistent with the width
              objectFit="cover"
              className="flex h-full w-full justify-center"
            />
          ) : (
            <Image
              src="/images/appLogo/Placeholder_view_vector.svg.png"
              alt="profile"
              width={150}
              height={150} // Adjust the height to be consistent with the width
              objectFit="cover"
              className="flex h-full w-full justify-center"
            />
          )}

          {/* Placeholder for the other half */}
        </div>
        <div className="border-t p-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row">
              <Link href={`/storeProfile/${storeData.id}`}>
                <div className="text-xl font-bold hover:underline">
                  {storeData.name}
                </div>
              </Link>
            </div>
            <div className="flex flex-row justify-center gap-2 text-sm">
              <div className="w-40 rounded border bg-[#4682B4] p-2 text-center text-white hover:cursor-pointer hover:bg-white hover:text-black">
                {t("edit")}
              </div>
              <div
                className="w-40 rounded border bg-red-500 p-2 text-center text-white hover:cursor-pointer hover:bg-white hover:text-black"
                onClick={handleDeleteClick}
              >
                {isLoading ? <>{t("deleting")}</> : <> {t("delete")}</>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
