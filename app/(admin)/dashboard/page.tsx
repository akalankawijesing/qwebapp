import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  console.log("session", session);
  if (session?.user) {
    return <h1>Welcome admin, {session?.user?.name}</h1>;
  }

  return <h1>Please login</h1>;
}
