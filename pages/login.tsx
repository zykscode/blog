import Link from 'next/link';
import type { Session } from 'next-auth';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { LoginForm } from '#/components/Form';
import LoginLayout from '#/Layouts/LoginLayout';

interface SignInFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = event.currentTarget
      .elements as unknown as SignInFormData;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // do not redirect on success
    });

    const session = (await getSession()) as Session | null;
    if (result?.error) {
      // handle error
      setErrorMessage(result.error);
    } else if (session) {
      // handle success
      console.log('Success:', session.user);
    }
  }

  const { data: session, status } = useSession();

  const loading = status === 'loading';

  if (loading) return null;

  return (
    <>
      {session ? (
        <p>
          <span>Signed in as {session?.user?.email}</span>
          <Link href="/account">
            <a>My Account</a>
          </Link>
          <button title="login" onClick={signOut}>
            Sign out
          </button>
        </p>
      ) : (
        <LoginLayout>
          <section className="flexGroup gap-10">
            <div>
              <h2 className="title">Admin login</h2>
              <p> Sign in as an Admin</p>
            </div>
            <LoginForm signin={handleSignIn} />
          </section>
        </LoginLayout>
      )}
    </>
  );
};

export default Login;
