import connectToDb from "@/lib/db";
import { User } from "@/models/UserModels";
import bcrypt from "bcryptjs";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectToDb();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not found");
          }
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account!.provider === "google") {
        const { email, name, image } = user;
        try {
          await connectToDb();
          let isUserExist = await User.findOne({ email });

          if (!isUserExist) {
            const newUser = new User({
              name,
              email,
              image,
              isAdmin: false,
            });
            await newUser.save();
            console.log("New user saved");
            isUserExist = newUser;
          }

          user.isAdmin = isUserExist.isAdmin;
        } catch (err) {
          console.error("Error during sign in with Google:", err);
          return false;
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          isAdmin: token.isAdmin,
          image: token.picture,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isAdmin = user.isAdmin;
        token.picture = user.image;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
