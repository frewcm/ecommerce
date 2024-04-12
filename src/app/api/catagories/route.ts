import connectDB from "@/lib/connectDB";
import catagory from "@/models/CatagoryModel";

export async function POST(req: Request) {
  await connectDB();
  const { catagory_name, parentCatagory, properties } = await req.json();
  const catagoryFields = {
    catagory_name,
    ...(parentCatagory.length > 0 && { parentCatagory }),
    ...(properties?.length > 0 && { properties }),
  };

  const createCatagory = await catagory.create(catagoryFields);

  return new Response(JSON.stringify(createCatagory), { status: 200 });
}

export async function PUT(req: Request) {
  await connectDB();
  const { _id, catagory_name, parentCatagory, properties } = await req.json();
  const updateCatagory = await catagory.updateOne(
    { _id },
    {
      ...(catagory_name.length > 0 && { catagory_name }),
      ...(parentCatagory.length > 0 && { parentCatagory }),
      ...(properties?.length > 0 && { properties }),
    }
  );
  return new Response(JSON.stringify(updateCatagory), { status: 200 });
}
