import { useTranslation } from "react-i18next";
import { api } from "~/utils/api";
import ProjectCard from "./ProjectCard";

type StoreDataProps = {
  storeData: { id: string };
};

export default function Project({ storeData }: StoreDataProps) {
  const { t } = useTranslation();
  const { data: storeProject } = api.project.getStoreProject.useQuery(
    {
      storeId: storeData.id,
    },
    { enabled: !!storeData.id }
  );

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex flex-row">
          {storeProject && storeProject?.length > 0 ? (
            <>
              {storeProject?.map((project) => (
                <ProjectCard key={project.id} projectData={project} />
              ))}
            </>
          ) : (
            <>{t("noInfo")}</>
          )}
        </div>
      </div>
    </>
  );
}
