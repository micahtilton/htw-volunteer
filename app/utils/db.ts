import client from "@/app/lib/db";
import bcrypt from "bcryptjs";

async function getUserFromDb(email: string, password: string) {
  const collection = client.db().collection("users");

  const cursor = collection.find({});

  let user;
  while (await cursor.hasNext()) {
    user = await cursor.next();

    // Compare the plain password to the stored hashed password
    const isMatch =
      (await bcrypt.compare(password, user.pwHash)) && user.email === email;
    if (isMatch) {
      break; // Return or handle matched password appropriately
    }
  }

  if (!user) return;
  user.id = user._id;
  delete user._id;
  return user;
}

async function createUser(email: string, pwHash: string): Promise<Boolean> {
  const collection = client.db().collection("users");
  const user = await collection.findOne({ email });
  if (user) {
    throw new Error("Email already in use.");
  }
  collection.insertOne({ _id: email as any, email, pwHash });
  return true;
}

export { getUserFromDb, createUser };
