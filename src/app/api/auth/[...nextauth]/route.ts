import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { Session, User } from "next-auth";

const adminEmails = ["frewbefekadu32@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: async ({
      session,
      token,
      user,
    }: {
      session?: Session;
      token?: any;
      user?: User;
    }) => {
      if (session?.user?.email && adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
