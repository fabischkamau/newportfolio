import bcrypt from "bcryptjs";
import { client } from "./db.server";

export async function signUpUser(email: string, password: string) {
  const hashed = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return await client.user.create({ data: { email: email, password: hashed } });
}

interface VerifyUser {
  error?: string;
  id?: string;
}

export async function verifyUser(
  email: string,
  password: string
): Promise<VerifyUser> {
  const user = await client.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user?.id) {
    return { error: "Invalid Credentials" };
  }
  const compare = bcrypt.compareSync(password, user.password);
  if (!compare) {
    return { error: "Invalid Credentials" };
  }
  return { id: user.id };
}
