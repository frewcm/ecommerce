"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface CatagoryType {
  _id: string;
  catagory_name: string;
}

export default function CatagoryForm({
  catagory,
}: {
  catagory: CatagoryType[];
}) {
  const [parentCat, setParentCat] = useState("");
  const { refresh } = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const { catagory_name } = data;
    const res = await axios.post("/api/catagories", {
      catagory_name,
      parentCatagory: parentCat,
    });
    if (res.status === 200) refresh();
    reset();
  };

  return (
    <form
      className="w-10/12 mx-auto flex flex-col justify-center items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex justify-start">
        <label className=" text-dominant">New catagory name</label>
      </div>
      <div className="flex items-start justify-start space-x-4">
        <div className="w-72 flex flex-col justify-start items-start">
          <input
            {...register("catagory_name", {
              required: "Catagory name is required",
            })}
            type="text"
            placeholder="Name..."
            className="w-full h-10 pl-2 pt-1 outline-teritiary"
          />
          {errors.catagory_name && (
            <p className="text-red-500 text-sm ">{`${errors.catagory_name.message}`}</p>
          )}
        </div>
        <div className="">
          <select
            value={parentCat}
            onChange={(e) => setParentCat(e.target.value)}
            className="h-10 outline-teritiary"
          >
            <option
              className="font-inter-ui-reqular px-1 text-dominant text-sm"
              value=""
            >
              No parent catagory
            </option>
            {catagory.map((cat) => (
              <option key={cat._id} className="h-10" value={cat._id}>
                {cat.catagory_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-16 disabled:bg-dominant/70  disabled:text-white text-recessive bg-dominant px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
}
