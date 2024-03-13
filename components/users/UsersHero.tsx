import React from "react";
import Image from "next/image";

import useUser from "@/pages/hooks/useUser";
import Avatar from "../Avatar";
import UserBio from "./UserBio";

interface UsersHeroTypes {
  userId: string;
}

const UsersHero: React.FC<UsersHeroTypes> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  console.log(fetchedUser);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={fetchedUser?.userId as string} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UsersHero;
