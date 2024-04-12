import CatagoryEditForm from "@/components/CatagoryEditForm";
import connectDB from "@/lib/connectDB";
import catagory from "@/models/CatagoryModel";

export default async function EditCatagory({
  searchParams,
}: {
  searchParams: {
    _id: string;
    catagory_name: string;
    parentCatagory: string;
    properties: {
      name: string;
      values: string;
    }[];
  };
}) {
  await connectDB();
  const res = await catagory.find({}).populate("parentCatagory");
  const jsonString = JSON.stringify(res);
  const plainObject = JSON.parse(jsonString);

  return (
    <div>
      <CatagoryEditForm
        searchParams={searchParams}
        catagory_list={plainObject}
      />
    </div>
  );
}
