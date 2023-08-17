import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const userId =
    typeof router.query.userId === "string" ? router.query.userId : ""; // Type assertion here
  const session = useSession({
    required: true,
    onUnauthenticated() {
      void router.push(`/api/auth/signin?callbackUrl=/profile/${userId}`);
    },
  });
}
