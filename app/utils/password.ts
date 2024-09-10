import bcrypt from "bcrypt";

async function saltAndHashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export { saltAndHashPassword };
