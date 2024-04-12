import connectDB from "@/lib/connectDB";
import catagory from "@/models/CatagoryModel";

export async function DELETE(
  req: Request,
  { params }: { params: { _id: string } }
) {
  await connectDB();
  const { _id } = params;
  const deleteCatagory = await catagory.deleteOne({ _id });
  return new Response(JSON.stringify(deleteCatagory));
}
