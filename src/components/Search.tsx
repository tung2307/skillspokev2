import { useRouter } from "next/router";
type SearchProps = {
  className?: string;
};
export default function Search({ className = "" }: SearchProps) {
  const router = useRouter();

  // Hide the div on the '/hidden-page' route
  if (router.pathname === "/") {
    return null;
  }
  return (
    <>
      <div className={`${className}`}></div>
    </>
  );
}
