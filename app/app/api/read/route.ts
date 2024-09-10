// import { createUser } from "@/utils/db";
// import { saltAndHashPassword } from "@/utils/password";
// import { getUserFromDb } from "@/utils/db";

export async function GET(req: Request) {
  return Response.json(req.json())
  // const { email, password } = await req.json();
  // let user;
  // try {
  //   user = await getUserFromDb(email, password);
  //   if (!user) return Response.json("Could not find user.", {status: 500})
  //   return Response.json(user, {status: 200})
  // } catch (error) {
  //   return Response.json("Email already exists.", {
  //     status: 500,
  //   });
  // }
}