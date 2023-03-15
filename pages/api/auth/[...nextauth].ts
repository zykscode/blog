import { compare, hash } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { Post } from '#/lib/types';
import { graphcms } from '#/services/_graphcms';

import { CreateNextAuthUserByEmail, GetNextAuthUserByEmail } from './_auth';

interface Author {
  id: string;
  password: string;
  email: string;
  name?: string;
  posts?: Post[];
  slug?: string;
}

interface CustomSession extends Session {
  userId?: string;
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'name@mail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      authorize: async (credentials: any) => {
        const { email, password } = credentials;

        const { user } = await graphcms.request(GetNextAuthUserByEmail, {
          email,
        });

        if (!user) {
          const { newUser } = await graphcms.request(
            CreateNextAuthUserByEmail,
            {
              email,
              password: await hash(password, 12),
            },
          );

          return {
            id: newUser.id,
            email,
          };
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error('Wrong credentials. Try again.');
        }

        return {
          id: user.id,
          name: email,
          email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.userId = token.sub;
      return Promise.resolve(session);
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(options);
