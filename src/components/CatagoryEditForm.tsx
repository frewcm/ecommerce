"use client";
import catagory from "@/models/CatagoryModel";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GoPlus } from "react-icons/go";

interface CatagoryType {
  _id: string;
  catagory_name: string;
  parentCatagory: string;
  properties: {
    name: string;
    values: string;
  }[];
}

interface CatagoryList {
  _id: string;
  catagory_name: string;
  parentCatagory: {
    catagory_name: string;
  };
  properties: {
    name: string;
    values: string;
  }[];
}
[];

interface CatForProperty {
  _id: string;
  catagory_name: string;
  parentCatagory: {
    catagory_name: string;
  };
  properties: {
    name: string;
    values: string;
  }[];
}

interface Properties {
  name: string;
  values: string;
}

export default function CatagoryEditForm({
  searchParams,
  catagory_list,
}: {
  searchParams: CatagoryType;
  catagory_list: CatagoryList[];
}) {
  const [parentCat, setParentCat] = useState("");
  const [property, setProperty] = useState<Properties[]>([]);
  const { refresh, push } = useRouter();

  useEffect(() => {
    const catForProperty = catagory_list.find((p) => p._id == searchParams._id);
    if (
      catForProperty?.properties !== null &&
      catForProperty?.properties !== undefined
    ) {
      setProperty(catForProperty.properties);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      catagory_name: searchParams?.catagory_name,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    const { catagory_name } = data;
    const res = await axios.put("/api/catagories", {
      _id: searchParams._id,
      catagory_name,
      parentCatagory: parentCat,
      properties: property?.map((p) => ({
        name: p.name,
        values: typeof p.values === "string" ? p.values.split(",") : [],
      })),
    });
    if (res.status === 200) {
      refresh();
      push("/catagories");
    }

    reset();
  };

  const addProperty = () => {
    setProperty((perv) => {
      return [...perv, { name: "", values: "" }];
    });
  };

  const updatePropertyName = (
    index: number,
    property: Properties,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setProperty((perv) => {
      let properties = [...perv];
      properties[index].name = e.target.value;
      return properties;
    });
  };

  const updatePropertyValue = (
    index: number,
    property: Properties,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setProperty((perv) => {
      let properties = [...perv];
      properties[index].values = e.target.value;
      return properties;
    });
  };

  const removeProperty = (indexToRemove: number) => {
    setProperty((perv) => {
      const newProperties = [...perv].filter((prop, propIndex) => {
        return propIndex !== indexToRemove;
      });
      return newProperties;
    });
  };

  return (
    <>
      <form
        className="mt-12 w-10/12 mx-auto flex flex-col justify-center items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex justify-start">
          <label className=" text-dominant">Edit catagory</label>
        </div>
        <div className="h-20 flex items-start justify-start space-x-4">
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
              className="h-10 w-24 pr-1 outline-teritiary"
            >
              <option
                className="font-inter-ui-reqular px-1 text-dominant text-sm"
                value=""
              >
                {searchParams.parentCatagory.length > 0
                  ? searchParams.parentCatagory
                  : "No parent catagory"}
              </option>
              {catagory_list.map((par) => (
                <option key={par._id} className="h-10" value={par?._id}>
                  {par?.catagory_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* add properties */}
        <div className=" flex flex-col">
          <button
            onClick={addProperty}
            className="w-32 mb-2 px-2 py-1 flex justify-center items-center space-x-1 font-inter-ui-regular text-xs text-dominant bg-dominant/10 border border-primary rounded-full"
          >
            <GoPlus size={20} />
            <label className="font-inter-ui-bold text-xs text-dominant">
              Add properties
            </label>
          </button>
          <div>
            {property?.length > 0 &&
              property.map((property, index) => {
                return (
                  <div className="my-2 flex items-center" key={index}>
                    <input
                      value={property.name}
                      onChange={(e) => updatePropertyName(index, property, e)}
                      className="h-8 mr-4 pl-1 outline-teritiary"
                      type="text"
                      placeholder="Name..."
                    />
                    <input
                      value={property.values}
                      onChange={(e) => updatePropertyValue(index, property, e)}
                      className="h-8 pl-1 outline-teritiary"
                      type="text"
                      placeholder="Value..."
                    />
                    <button
                      className="px-2 ml-4 text-sm bg-gray-400 text-white h-8 rounded"
                      onClick={() => removeProperty(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <Link
            className="py-2 px-4 text-sm bg-gray-400 text-white rounded"
            href={"/catagories"}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" text-sm disabled:bg-dominant/70  disabled:text-white text-recessive bg-dominant px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
