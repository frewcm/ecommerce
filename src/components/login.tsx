"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="w-full h-dvh bg-dominant flex items-center justify-center">
      <div className="flex space-x-2 items-center bg-recessive  px-4 py-2 rounded">
        <FcGoogle size={40} />
        <button
          onClick={() => signIn("google")}
          className="text-dominant text-md font-inter-ui-regular"
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
}
