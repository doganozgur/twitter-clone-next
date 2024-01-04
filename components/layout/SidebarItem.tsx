import React from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  label,
  icon: Icon,
  onClick,
}) => {
  console.log(label);
  return (
    <div className="flex items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pounter lg:hidden">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
      <div className="relative hidden lg:flex items-center gap-4 rounded-full  p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
