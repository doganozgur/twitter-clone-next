import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";

interface SidebarItemProps {
  label: string;
  href?: string;
  auth?: boolean;
  icon: IconType;
  onClick?: () => void;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  label,
  icon: Icon,
  auth,
  onClick,
  alert,
}) => {
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) router.push(href);
  }, [onClick, href, router, auth, currentUser, loginModal]);

  return (
    <div className="flex items-center" onClick={handleClick}>
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pounter lg:hidden">
        <Icon size={24} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={80} />
        ) : null}
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
      <div className="relative hidden lg:flex items-center gap-4 rounded-full  p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
