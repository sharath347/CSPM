// src/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      console.log(token.id_token);
      const decoded = jwtDecode(token.id_token);
      token.userId = decoded.sub;
      console.log(token.userId);
      return token;
    },
    async session({ session, token }) {
      session.id_token = token.id_token;
      session.user = token.userId; // attach userId to session
      return session;
    },
  },
});
