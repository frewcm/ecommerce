"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FaAngleDown } from "react-icons/fa6";

export default function Nav() {
  const { data: session } = useSession();
  if (!session) redirect("/");
  return (
    <div className="w-full px-8 bg-white h-16 flex items-center justify-end shadow-md">
      <div className="flex items-center space-x-2 bg-recessive rounded p-1 ">
        <img
          src={session.user?.image!}
          className="w-6 rounded-full"
          alt="admin image"
        />
        <span className="font-inter-ui-regular text-dominant text-sm tracking-wider">
          {session.user?.name?.split(" ")[0]}
        </span>
        <FaAngleDown className="text-dominant mt-1" />
      </div>
    </div>
  );
}
