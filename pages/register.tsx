import React from 'react';

import { RegisterForm } from '#/components/RegisterForm';
import LoginLayout from '#/Layouts/LoginLayout';

const Register = () => {
  return (
    <>
      <LoginLayout>
        <section className="flexGroup gap-10">
          <div>
            <h2 className="title">Admin Registration</h2>
            <p> Register as an Admin</p>
          </div>
          <RegisterForm />
        </section>
      </LoginLayout>
    </>
  );
};

export default Register;
