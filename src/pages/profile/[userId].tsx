import { useRouter } from "next/router";

const profilePage = () => {
  const router = useRouter();
  const { userId } = router.query; // This will extract the id from the URL

  return (
    <div>
      <p>ID: {userId}</p>
    </div>
  );
};

export default profilePage;
