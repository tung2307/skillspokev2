import { useRouter } from "next/router";

import { UploadDropzone } from "@uploadthing/react";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OurFileRouter } from "~/server/uploadthing";
import { useTranslation } from "react-i18next";

interface UploadFile {
  fileKey: string;
  fileName: string;
  fileUrl: string;
}

type UploadFileResponse = UploadFile[];

export default function EditPicture() {
  const { t } = useTranslation();
  // Changed to uppercase
  const router = useRouter();
  const storeId =
    typeof router.query.storeId === "string" ? router.query.storeId : null;
  const { mutate: createPic } = api.stores.createProfilePic.useMutation({});
  const [data, setData] = useState<UploadFile | null>(null);
  const [originalData, setOriginalData] = useState<UploadFile | null>(null);

  const { data: profilePicture } = api.stores.getStoreProfilePicture.useQuery(
    { storeId: storeId ?? "" },
    { enabled: !!storeId }
  );
  const [done, setDone] = useState(false);
  const { mutate: deletePic } = api.stores.deleteProfilePic.useMutation();

  useEffect(() => {
    if (profilePicture != null) {
      const transformedData: UploadFile = {
        fileKey: profilePicture.fileKey,
        fileName: "",
        fileUrl: profilePicture.fileUrl,
      };
      setData(transformedData);
      setOriginalData(transformedData);
    }
  }, [profilePicture]);

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (done) {
        deletePic({
          storeId: storeId ?? "",
          name: data?.fileKey ?? "",
        });
      }

      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [done, data, originalData, storeId, deletePic]);

  return (
    <>
      <div className="flex h-screen w-screen flex-row justify-center gap-5 p-10 md:p-20">
        <div className=" w-64 p-2 sm:w-80 md:w-96 md:p-0">
          <UploadDropzone<OurFileRouter>
            content={{
              button({ ready, isUploading }) {
                if (ready && !isUploading)
                  return <div className="p-3 ">{t("post")}</div>;
              },
              allowedContent({ isUploading }) {
                if (isUploading) return <div>{t("posting")}</div>;
              },
            }}
            className="pb-4 "
            endpoint="profilePicture"
            onClientUploadComplete={(res?: UploadFileResponse) => {
              if (!res || res.length === 0) {
                console.error("Response is undefined or empty");
                return;
              }

              const fileData: UploadFile | undefined = res[0];
              if (!fileData) {
                console.error("fileData is undefined");
                return;
              }

              createPic({
                storeId: storeId ?? "",
                fileKey: fileData.fileKey,
                fileUrl: fileData.fileUrl,
              });

              setData(fileData);
              setDone(true);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        {data && (
          <div className="flex flex-col gap-3">
            <div className="flex h-auto w-[200px] items-center justify-center overflow-hidden rounded border">
              <Image
                src={data.fileUrl}
                alt={data.fileName}
                width={200}
                height={200}
                objectFit="cover"
                className="rounded shadow"
              />
            </div>
            {done && (
              <div className="flex w-full flex-row justify-center gap-5">
                <button
                  className="rounded border p-1 hover:bg-gray-100"
                  onClick={() => {
                    deletePic({
                      storeId: storeId ?? "",
                      name: data.fileKey ?? "",
                    });
                    setDone(false);
                    setData(originalData);
                  }}
                >
                  Cancel
                </button>
                <Link
                  className="rounded border p-1 hover:bg-gray-100"
                  href={`/storeProfile/${storeId}`}
                  onClick={() => {
                    deletePic({
                      storeId: storeId ?? "",
                      name: originalData?.fileKey ?? "",
                    });
                    setDone(false);
                  }}
                >
                  Save
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
