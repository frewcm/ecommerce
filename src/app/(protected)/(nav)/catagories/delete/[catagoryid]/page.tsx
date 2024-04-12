"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function DeleteCatagory() {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const handleDelete = async () => {
    const res = await axios.delete(
      `/api/catagories/${searchParams.get("_id")}`
    );
    if (res.status === 200) {
      push("/catagories");
    }
    console.log(res);
  };

  return (
    <div className="w-10/12 mx-auto pt-10 pb-2 flex flex-col items-start justify-start">
      <p className="text-start font-inter-ui-bold text-dominant text-lg">
        Do you really want to delete {searchParams.get("catagory_name")}?
      </p>
      <div className="w-full mt-4 flex items-start justify-start space-x-4">
        <Link
          href={"/catagories"}
          className="bg-gray-300 rounded text-dominant px-3 py-1"
        >
          Cancel
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 rounded text-recessive px-3 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
