import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "./utils/password";
import axios from "axios";
// import { getUserFromDb } from "./utils/db";

async function authorize(credentials) {
  try {
    let user = null;

    const { email, password } = credentials as {
      email: string;
      password: string;
    };
    
    user = await axios.post("http://localhost:3000/api/read", {email, password})
    const data = await user.data
    user = data

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {email:{},password:{}},
      authorize: authorize,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log({ token, user });
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
});

export { authorize };
