import product from "@/models/ProductModel";
import connectDB from "@/lib/connectDB";

interface CreatedProduct {
  product_name: string;
  description: string;
  price: number;
}

export async function POST(req: Request) {
  await connectDB();

  const { product_name, catagory, description, price, image } =
    await req.json();
  const createdProduct: CreatedProduct = await product.create({
    product_name,
    ...(catagory.length > 0 && { catagory }),
    description,
    price,
    image,
  });
  return new Response(JSON.stringify(createdProduct), { status: 200 });
}

export async function PUT(req: Request) {
  await connectDB();
  const { _id, product_name, catagory, description, price, image } =
    await req.json();

  const updateFields = {
    product_name,
    ...(catagory.length > 0 && { catagory }),
    description,
    price,
    ...(image.length > 0 && { image }),
  };

  const updateProduct = await product.updateOne({ _id }, updateFields);

  return new Response(JSON.stringify(updateProduct), { status: 200 });
}
