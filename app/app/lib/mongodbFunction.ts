import bcrypt from "bcrypt"
import client from "./db"

async function addUser(username: string, password: string) {
  let hashedPassword = await bcrypt.hash(password, 10)
  if (!hashedPassword) return Response.json("could not hash")

  await client.connect()
  const collection = client.db().collection("users")

  try {
    await collection.insertOne({ _id: username as any, username, password: hashedPassword })
  } catch (error) {
    throw error
  }
}

export { addUser }