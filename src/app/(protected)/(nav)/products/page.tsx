import connectDB from "@/lib/connectDB";
import product from "@/models/ProductModel";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface Data {
  _id: string;
  product_name: string;
  catagory: {
    catagory_name: string;
  };
  description: string;
  price: number;
}

export default async function Products() {
  await connectDB();
  const res: Data[] = await product.find({}).populate("catagory");
  const jsonString = JSON.stringify(res);
  const plainObject = JSON.parse(jsonString);
  console.log(plainObject);
  return (
    <section className="h-[1000px]">
      <div className="w-10/12 mx-auto pt-10 pb-2 flex items-center justify-between">
        <div className="font-inter-ui-bold text-2xl text-dominant">
          Products
        </div>
        <Link
          href={"/products/new"}
          className="px-2 py-1 flex items-center space-x-1 font-inter-ui-regular text-xs text-dominant bg-dominant/10 border border-primary rounded-full"
        >
          <GoPlus className="text-dominant" size={18} />
          <p className="font-inter-ui-bold text-xs text-dominant">
            Add new product
          </p>
        </Link>
      </div>
      <div className="w-10/12  mx-auto mt-4">
        <DataTable columns={columns} data={plainObject} />
      </div>
    </section>
  );
}
