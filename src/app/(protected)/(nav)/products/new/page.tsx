import NewProductForm from "@/components/NewProductForm";
import connectDB from "@/lib/connectDB";
import catagory from "@/models/CatagoryModel";

export default async function New() {
  await connectDB();
  const res = await catagory.find({}).populate({
    path: "catagory",
    options: { strictPopulate: false },
  });
  const jsonString = JSON.stringify(res);
  const plainObject = JSON.parse(jsonString);

  return (
    <>
      <section className="h-[700px] flex-grow relative">
        <div className="w-10/12 mx-auto pt-10 pb-2 flex items-center ">
          <p className="font-inter-ui-bold text-primary text-2xl">
            New product
          </p>
        </div>
        <NewProductForm catagory_list={plainObject} />
      </section>
    </>
  );
}
