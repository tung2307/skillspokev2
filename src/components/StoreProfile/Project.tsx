import { useState, useEffect } from "react";
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

  const [displayCount, setDisplayCount] = useState(1); // Default to showing 1 project initially.
  const [projectsPerRow, setProjectsPerRow] = useState(1);

  const updateProjectsPerRow = () => {
    const width = window.innerWidth;
    let updatedProjectsPerRow = 1;
    if (width <= 640) {
      // For mobile screens
      updatedProjectsPerRow = 1;
    } else if (width <= 768) {
      // For small screens
      updatedProjectsPerRow = 2;
    } else if (width <= 1024) {
      // For medium screens
      updatedProjectsPerRow = 3;
    } else {
      // For large screens and up
      updatedProjectsPerRow = 4;
    }
    setProjectsPerRow(updatedProjectsPerRow);
    setDisplayCount(updatedProjectsPerRow);
  };

  useEffect(() => {
    updateProjectsPerRow(); // Update the state on mount
    window.addEventListener("resize", updateProjectsPerRow); // Update the state on resize

    return () => {
      // Cleanup
      window.removeEventListener("resize", updateProjectsPerRow);
    };
  }, []);

  const handleSeeMore = () => {
    setDisplayCount((prevCount) => prevCount + projectsPerRow);
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:p-5 lg:grid-cols-3 xl:grid-cols-4">
          {storeProject && storeProject?.length > 0 ? (
            <>
              {storeProject.slice(0, displayCount).map((project) => (
                <ProjectCard key={project.id} projectData={project} />
              ))}
              {storeProject.length > displayCount && (
                <button
                  className="col-span-full w-32 rounded bg-[#4682B4] p-2 text-center text-white"
                  onClick={handleSeeMore}
                >
                  See More
                </button>
              )}
            </>
          ) : (
            <>{t("noInfo")}</>
          )}
        </div>
      </div>
    </>
  );
}
