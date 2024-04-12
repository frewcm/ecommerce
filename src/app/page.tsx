import Login from "@/components/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session?.user) {
    return <Login />;
  } else {
    return redirect("/dashboard");
  }
}
