import CatagoryForm from "@/components/CatagoryForm";
import catagory from "@/models/CatagoryModel";
import connectDB from "@/lib/connectDB";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Catagories() {
  await connectDB();
  const res = await catagory.find().populate("parentCatagory");
  const jsonString = JSON.stringify(res);
  const plainObject = JSON.parse(jsonString);

  return (
    <section className="h-[1000px]">
      <div className="w-10/12 mx-auto pt-10 pb-2 flex items-center ">
        <p className="font-inter-ui-bold text-dominant text-2xl">Catagories</p>
      </div>
      <div>
        <CatagoryForm catagory={plainObject} />
      </div>
      <div className="w-10/12 mx-auto mt-4">
        <div className="w-10/12">
          <DataTable columns={columns} data={plainObject} />
        </div>
      </div>
    </section>
  );
}
