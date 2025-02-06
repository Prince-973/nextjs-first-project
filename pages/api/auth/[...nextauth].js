import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

export const authOptions = {
  session: {
    strategy: "jwt", // Use 'jwt' strategy for session handling
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await connectToDatabase();
        const userCollection = client.db().collection("users");

        // Find the user by email
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        // Verify the password
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Wrong password!");
        }

        client.close();

        // Return the user object if authentication is successful
        return {
          email: user.email,
          name: user.name || null,
          image: user.image || null,
        };
      },
    }),
  ],
  secret: "Prince@832004",
};

export default NextAuth(authOptions);
