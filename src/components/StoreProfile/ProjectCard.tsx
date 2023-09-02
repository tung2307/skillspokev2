type ProjectProps = {
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

export default function ProjectCard({ projectData }: ProjectProps) {
  return <></>;
}
