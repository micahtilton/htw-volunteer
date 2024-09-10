import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "./utils/password";
import { getUserFromDb } from "./utils/db";

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
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const pwHash = await saltAndHashPassword(password);

          user = await getUserFromDb(email, pwHash);

          if (!user) {
            throw new Error("User not found.");
          }

          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
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
