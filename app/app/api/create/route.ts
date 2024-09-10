import { createUser } from "@/utils/db";
import { saltAndHashPassword } from "@/utils/password";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const hashedPassword = await saltAndHashPassword(password);
  try {
    await createUser(email, hashedPassword);
  } catch (error) {
    return Response.json("Email already exists.", {
      status: 500,
    });
  }

  return Response.json("Created user.", { status: 200 });
}
