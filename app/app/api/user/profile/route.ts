import client from "@/app/lib/db";
import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = async (res: Request) => {
  const { user } = (await getSession()) as any;
  if (!user) return NextResponse.json({ status: 401 });

  const collection = client.db("users").collection("profile");
  const user_data = await collection.findOne({ _id: user.sid });

  if (user_data) return NextResponse.json(user_data);

  const to_add = {
    ...user,
    _id: user.sid,
    bio: "Default Bio",
    interests: "Default Interests",
    skills: "Default Skills",
    dob: null,
  };

  delete to_add.sid;

  const added = await collection.insertOne(to_add);

  if (!added.acknowledged) return NextResponse.json({ status: 500 });

  return NextResponse.json(to_add);
};

export const POST = (res: Request) => {};
