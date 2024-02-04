import Image from "next/image";
import { useCallback } from "react";
import { useRouter } from "next/router";

import useUser from "@/pages/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data: user } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [userId, router]
  );

  return (
    <div
      className={`
    ${hasBorder ? "border-4 border-black" : ""}
    ${isLarge ? "h-32" : "h-12"}
    ${isLarge ? "w-32" : "w-12"}
    rounded-full
    cursor-pointer
    hover:opacity-90
    transition
    relative
  `}
    >
      <Image
        fill
        alt="avatar"
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        onClick={onClick}
        src={user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
