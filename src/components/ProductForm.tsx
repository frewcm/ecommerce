"use client";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface ProductDataType {
  _id: string;
  product_name: string;
  description: string;
  catagory: string;
  price: string;
}

interface CatagoryList {
  _id: string;
  catagory_name: string;
}

export default function ProductForm({
  searchParams,
  catagory_list,
}: {
  searchParams: ProductDataType;
  catagory_list: CatagoryList[];
}) {
  const { push } = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      product_name: searchParams.product_name,
      description: searchParams.description,
      price: Number(searchParams.price),
    },
  });

  const [imageUrl, setImageUrl] = useState("");
  const [cat, setCat] = useState("");

  const onSubmit = async (data: FieldValues) => {
    const { product_name, description, price } = data;
    const res = await axios.put("/api/products", {
      _id: searchParams._id,
      product_name,
      description,
      catagory: cat,
      price,
      image: imageUrl,
    });
    reset();
    if (res.status === 200) push("/products");
  };

  return (
    <section className="h-[700px] flex-grow">
      <div className="w-10/12 mx-auto pt-10 pb-2 flex items-center">
        <p className="font-inter-ui-bold text-dominant text-2xl">
          Edit product
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-10/12 mx-auto font-inter-ui-regular text-dominant flex flex-col"
      >
        <div className="flex flex-col mt-2 mb-2">
          <label>Product name</label>
          <input
            {...register("product_name", {
              required: "Product name is required",
            })}
            className="w-8/12 h-10 pl-2 pt-1  outline-teritiary"
            type="text"
            placeholder="Product name..."
          />
          {errors.product_name && (
            <p className="text-red-500 text-sm ">{`${errors.product_name.message}`}</p>
          )}
        </div>
        <div className="flex flex-col mt-2 mb-2">
          <label>Catagory</label>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="w-8/12 h-10 pl-2 pt-1  outline-teritiary mr-2"
          >
            <option value="">
              {searchParams.catagory.length > 0
                ? searchParams.catagory
                : "Uncatagorized"}
            </option>
            {catagory_list.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.catagory_name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex flex-col items-start mt-2 mb-2">
          <label>Upload image</label>
          <UploadButton
            endpoint="productPicture"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              console.log(`${error.message}`);
            }}
          />
        </div>
        <div className="flex flex-col mt-2 mb-2">
          <label>Description</label>
          <textarea
            {...register("description", {
              required: "description is required",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters",
              },
            })}
            className="w-8/12 pl-2 pt-2  outline-teritiary"
            placeholder="Description..."
            id="description"
            cols={30}
            rows={3}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm ">{`${errors.description.message}`}</p>
          )}
        </div>
        <div className="flex flex-col mt-2 mb-2">
          <label>Price</label>
          <input
            {...register("price", { required: "Price is required" })}
            className="w-8/12 h-10 pl-2 pt-1  outline-teritiary"
            placeholder="Price..."
            type="text"
          />
          {errors.price && (
            <p className="text-red-500 text-sm ">{`${errors.price.message}`}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-8/12 disabled:bg-dominant/70 mt-4 disabled:text-white text-recessive bg-dominant px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </section>
  );
}
