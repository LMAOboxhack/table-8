import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        const response = await fetch('http://127.0.0.1:5000/auth/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const responseData = await response.json();

        if (responseData.is_success) {
          return { ...responseData.user, accessToken: responseData.accessToken };
        } else {
          throw new Error('Invalid credentials.')
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token
    },
    async session({ session, token }) {
      session.user.accessToken = token
      return session
    },
  }
};

export default NextAuth(authOptions)
