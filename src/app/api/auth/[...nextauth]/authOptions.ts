import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const emailVerified = (profile as any).email_verified;

      return user.email === "emfowkd@gmail.com" && emailVerified === true;
    },

    async session({ session }) {
      // 관리자 role 부여
      if (session.user?.email === "emfowkd@gmail.com") {
        session.user.role = "admin";
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 로그인 후 홈(/)으로 이동하게 설정
      return baseUrl; // 또는 `${baseUrl}/admin` 같은 것도 가능
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
