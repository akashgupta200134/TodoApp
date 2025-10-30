import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.image = user.image; // ✅ Always take image from DB
        session.user.name = user.name;
        session.user.email = user.email;
      }
      return session;
    },
    async signIn({ user, profile }) {
      const googleProfile = profile as { picture?: string };
      if (googleProfile?.picture) {
        // ✅ Always sync image from Google when signing in
        await prisma.user.update({
          where: { id: user.id },
          data: { image: googleProfile.picture },
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
