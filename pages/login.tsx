import Form from '#/components/Form';
import New from '#/components/new';
import LoginLayout from '#/Layouts/LoginLayout';
import { signIn } from 'next-auth/react';
import React from 'react';

type Props = {};

const Login = (props: Props) => {
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
          <Form signin={handleGoogleSignin}/>
        </section>
      </LoginLayout>
    </>
  );
};

export default Login;
