import { addUser } from "@/app/lib/mongodbFunction";

export async function POST(req: Request) {
  const { username, password } = await req.json()

  try {
    await addUser(username, password);
  } catch {
    return Response.json("could not add user")
  }

  return Response.json({ status: 200 })
}