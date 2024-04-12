import ProductForm from "@/components/ProductForm";
import catagory from "@/models/CatagoryModel";

export default async function EditProduct({
  searchParams,
}: {
  searchParams: {
    _id: string;
    product_name: string;
    catagory: string;
    description: string;
    price: string;
  };
}) {
  const res = await catagory.find({});
  const jsonString = JSON.stringify(res);
  const plainObject = JSON.parse(jsonString);
  return (
    <div>
      <ProductForm searchParams={searchParams} catagory_list={plainObject} />
    </div>
  );
}
