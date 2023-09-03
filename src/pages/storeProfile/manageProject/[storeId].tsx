import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "~/components/StoreProfile/ProjectCard";

import { api } from "~/utils/api";

export default function ProjectPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const storeId =
    typeof router.query.storeId === "string" ? router.query.storeId : "";
  const { data } = api.project.getStoreProject.useQuery({ storeId: storeId });
  const user = useUser();
  useEffect(() => {
    if (!user.isSignedIn) void router.push("/");
  }, [user.isSignedIn, router]);
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col p-5">
          <div className="flex w-auto justify-center text-4xl font-bold">
            {t("project")}
          </div>
          <div className="w-ful mt-10 flex h-auto justify-center">
            <div className=" flex h-full w-[75vw] justify-center border">
              <div className="grid w-full grid-cols-1 gap-10 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data?.map((project) => {
                  return <ProjectCard key={project.id} projectData={project} />;
                })}

                <div
                  className="flex h-80 w-56 items-center justify-center border-2 border-dashed hover:cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    void router.push(`/add/project/${storeId}`);
                  }}
                >
                  + {t("create")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
