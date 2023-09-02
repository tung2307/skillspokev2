import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import { UploadDropzone } from "~/utils/uploadthing";

interface UploadFile {
  fileKey: string;
  fileName: string;
  fileUrl: string;
}
type project = {
  id: string;
  storeId: string;
  clerkId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
};
type UploadFileResponse = UploadFile[];
export default function Project() {
  const { t } = useTranslation();
  const router = useRouter();
  const storeId =
    typeof router.query.storeId === "string" ? router.query.storeId : "";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const isValid = () => {
    return title.trim().length > 0 && description.trim().length > 0;
  };
  const { mutate: createProject, isLoading } = api.project.create.useMutation({
    onSuccess: (data: project) => {
      setProjectId(data.id);
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });

  const {
    mutate: createProjectPicture,
    isLoading: picLoading,
    isSuccess,
  } = api.project.createProjectPicture.useMutation({});
  const [filesToUpload, setFilesToUpload] = useState<UploadFileResponse | null>(
    null
  );
  useEffect(() => {
    // If projectId and files are available and haven't processed yet
    if (projectId && filesToUpload) {
      filesToUpload.forEach((fileData: UploadFile) => {
        if (!fileData) {
          console.error("fileData is undefined");
          return;
        }
        createProjectPicture({
          projectId: projectId,
          fileKey: fileData.fileKey,
          fileUrl: fileData.fileUrl,
        });
      });
      // Clear filesToUpload to prevent processing them again
      setFilesToUpload(null);
    }
  }, [projectId, filesToUpload, createProjectPicture]);

  useEffect(() => {
    if (isSuccess) {
      void router.push(`/storeProfile/manageProject/${storeId}`);
    }
  }, [isSuccess, router, storeId]);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col sm:w-[30rem]">
          <h2 className=" py-5 text-center text-4xl font-bold text-[#F08080]">
            {t("addProject.createProject")}
          </h2>
          <form className="space-y-4 border-b shadow">
            <div className="p-5">
              <div className="pb-2 pt-1">
                <label className=" block ">{t("addProject.title")}:</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-b p-1 outline-none"
                  required
                />
              </div>
              <div className="pb-2 pt-1">
                <label className=" block ">
                  {t("addProject.description")}:
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full resize-none border p-1 outline-none"
                  rows={4} // You can adjust the number of rows as needed
                ></textarea>
              </div>
              <div className=" flex w-full  justify-center">
                <div className=" w-full  sm:w-96 ">
                  <UploadDropzone
                    content={{
                      button({ ready, isUploading }) {
                        if (ready && !isUploading && isValid())
                          return (
                            <div className="rounded bg-[#4682B4] p-2 text-white">
                              {t("create")}
                            </div>
                          );
                      },
                      allowedContent({ isUploading }) {
                        if (isUploading)
                          return (
                            <div className="rounded bg-[#4682B4] p-2 text-white">
                              {t("creating")}
                            </div>
                          );
                      },
                    }}
                    endpoint="imageUploader"
                    className="pb-4 "
                    onClientUploadComplete={(res?: UploadFileResponse) => {
                      if (!res || res.length === 0) {
                        return;
                      }

                      createProject({
                        title: title,
                        description: description,
                        storeId: storeId,
                      });

                      setFilesToUpload(res); // Set the files to be uploaded
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
