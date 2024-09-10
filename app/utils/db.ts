import client from "@/app/lib/db";

async function getUserFromDb(email: string, pwHash: string) {
  const collection = client.db().collection("users");
  const user = await collection.findOne({ email, pwHash });
  if (!user) return;
  user.id = user._id;
  delete user._id;
  return user;
}

async function createUser(email: string, pwHash: string) {
  const collection = client.db().collection("users");
  const user = await collection.findOne({ email });
  if (user) {
    throw new Error("Email already in use.");
  }
  collection.insertOne({ _id: email as any, email, pwHash });
}

export { getUserFromDb, createUser };
