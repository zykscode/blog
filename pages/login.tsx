import { signIn } from 'next-auth/react';
import React from 'react';

import { LoginForm } from '#/components/Form';
import LoginLayout from '#/Layouts/LoginLayout';

const Login = () => {
  const handleGoogleSignin = async () => {
    signIn('google', {
      callbackUrl: 'http://localhost:3000',
    });
  };

  return (
    <>
      <LoginLayout>
        <section className="flexGroup gap-10">
          <div>
            <h2 className="title">Admin login</h2>
            <p> Sign in as an Admin</p>
          </div>
          <LoginForm signin={handleGoogleSignin} />
        </section>
      </LoginLayout>
    </>
  );
};

export default Login;
