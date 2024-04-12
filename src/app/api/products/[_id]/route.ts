import connectDB from "@/lib/connectDB";
import product from "@/models/ProductModel";

export async function DELETE(
  req: Request,
  { params }: { params: { _id: string } }
) {
  await connectDB();
  const { _id } = params;
  const deleteProduct = await product.deleteOne({ _id });
  return new Response(JSON.stringify(deleteProduct));
}
