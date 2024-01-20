import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      // connect with DB here
      async authorize(credentials) {
        // const client = await clientPromise;
        // const accountsCollection = client
        //   .db(process.env.DB_NAME)
        //   .collection('accounts');

        // const email = credentials?.email?.toLowerCase();
        // const account = await accountsCollection.findOne({ email });

        // if (!account) {
        //   throw new Error('Account does not exist.');
        // }

        // // Validate password
        // const passwordIsValid = await bcrypt.compare(
        //   credentials?.password || '',
        //   account.password || ''
        // );

        // if (!passwordIsValid) {
        //   throw new Error('Invalid credentials');
        // }

        // // Check if account is approved
        // if (!account.isApproved) {
        //   throw new Error('Account not approved yet.');
        // }

        // const usersCollection = client
        //   .db(process.env.DB_NAME)
        //   .collection('users');

        // const user = await usersCollection.findOne({ _id: account.user });

        // return {
        //   id: account._id.toString(),
        //   name: user?.name || '',
        //   email: account.email,
        //   role: account.role,
        // };

        return {
          id: '1',
          email: credentials?.email?.toLowerCase(),
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions)