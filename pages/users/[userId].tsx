import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

import useUser from "../../hooks/useUser";
import Header from "@/components/layout/Header";
import UsersHero from "@/components/users/UsersHero";
import UserBio from "@/components/users/UserBio";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div
        className="
            flex justify-center items-center h-full"
      >
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser?.name} />
      <UsersHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView;
