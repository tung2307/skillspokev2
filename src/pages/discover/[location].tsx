import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const location =
    typeof router.query.location === "string" ? router.query.location : "";
  console.log(location);
  return <></>;
}
