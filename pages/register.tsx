import Form, { RegisterForm } from '#/components/Form'
import LoginLayout from '#/Layouts/LoginLayout'
import React from 'react'

type Props = {}

const Register = (props: Props) => {
  return (
    <>
    <LoginLayout>
    <section className="flexGroup gap-10">
          <div>
            <h2 className="title">Admin login</h2>
            <p> Sign in as an Admin</p>
          </div>
          <RegisterForm/>
        </section>
    </LoginLayout>
    </>
  )
}

export default Register