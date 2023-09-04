import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

type ProjectDataProps = {
  projectData: {
    id: string;
    storeId: string;
    clerkId: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string;
  };
};

export default function ProjectCard({ projectData }: ProjectDataProps) {
  const user = useUser();
  const router = useRouter();
  const { data } = api.project.getProjectPicture.useQuery({
    projectId: projectData.id,
  });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollValue = direction === "left" ? -300 : 300; // adjust the value as needed
      container.scrollBy({ left: scrollValue, behavior: "smooth" });
    }
  };
  const { t } = useTranslation();
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const { mutate, isLoading } = api.project.deleteProject.useMutation({
    onSuccess: () => {
      // Code to execute upon successful mutation
      console.log("Project deleted successfully");
      void router.reload();
    },
    onError: (error) => {
      // Code to execute if there is an error
      console.log("Error deleting project:", error);
    },
  });
  function handleClick() {
    mutate({ projectId: projectData.id });
  }

  return (
    <>
      <div className="flex flex-col text-lg">
        <div className="relative flex h-80 w-56 justify-center rounded-t border">
          <div className="flex flex-col">
            <div>
              <button
                className="absolute left-0 top-1/2 z-10 -translate-y-20 transform rounded-r bg-gray-50 p-2"
                onClick={() => handleScroll("left")}
              >
                {"<"}
              </button>
              <div
                className="relative flex h-[180px] w-full flex-row overflow-x-hidden"
                ref={scrollContainerRef}
              >
                {data?.map((imageData, index) => (
                  <Image
                    key={index}
                    src={imageData.fileUrl}
                    alt="Project picture"
                    width={300}
                    height={200}
                    className="rounded-t"
                  />
                ))}
              </div>
              <button
                className="absolute right-0 top-1/2 z-10 -translate-y-20 transform rounded-l bg-gray-50 p-2"
                onClick={() => handleScroll("right")}
              >
                {">"}
              </button>
            </div>

            <div
              className="flex w-full justify-center font-bold hover:cursor-pointer hover:underline"
              onClick={handleModal}
            >
              {projectData.title}
            </div>
            <div className="line-clamp-4 flex w-full justify-start overflow-hidden px-1">
              {projectData.description}
            </div>
          </div>
        </div>
        {user.user?.id == projectData.clerkId && (
          <div className="w-56 rounded-b border-b border-l border-r">
            <div className="flex justify-center">
              <button
                className=" m-1 w-20 rounded bg-red-500 p-1 text-white"
                onClick={handleClick}
              >
                {isLoading ? <>{t("deleting")}</> : <> {t("delete")}</>}
              </button>
            </div>
          </div>
        )}
      </div>
      {isModalVisible && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="h-3/4 w-3/4 overflow-y-auto bg-white">
            <button
              onClick={handleModal}
              className="w-10 border bg-red-500 p-1 text-white"
            >
              X
            </button>
            <div className="flex justify-center p-5">
              <div className="relative flex h-[180px] w-full flex-row overflow-x-auto md:h-[400px]">
                {data?.map((imageData, index) => (
                  <div key={index} className="h-full w-full flex-shrink-0">
                    <Image
                      src={imageData.fileUrl}
                      alt="Project picture"
                      width={300}
                      height={200}
                      objectFit="cover"
                      className="h-full w-full cursor-pointer rounded"
                      onClick={() =>
                        window.open(
                          imageData.fileUrl,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <h2 className="mb-4 text-center text-2xl">{projectData.title}</h2>
            <p className=" px-4">{projectData.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
