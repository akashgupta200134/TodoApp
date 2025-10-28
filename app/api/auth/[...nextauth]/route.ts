import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
  secret: process.env.AUTH_SECRET, 
  providers: [
    Credentials({
      name: "email",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "akash@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "Akash", email: "akash@example.com" };

        if (
          credentials?.username === "akash" &&
          credentials?.password === "1234"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
};


// ✅ Correct NextAuth handler extraction
const { handlers } = NextAuth(authOptions);

export const { GET, POST } = handlers;
