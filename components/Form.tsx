import React, { useState } from 'react';
import styles from '#/styles/Form.module.scss';
import { Formik, useFormik } from 'formik';
import { IoMail } from '@react-icons/all-files/io5/IoMail';
import { BiUser } from '@react-icons/all-files/bi/BiUser';
import { IoKey } from '@react-icons/all-files/io5/IoKey';
import { AiOutlineEye } from '@react-icons/all-files/ai/aiOutlineEye';
import { AiOutlineEyeInvisible } from '@react-icons/all-files/ai/AiOutlineEyeInvisible';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = {
  signin: any;
};

interface SigninFormValues {
  email: string;
  password: string;
}

interface SigninFormErrors {
  email?: string;
  password?: string;
}

const signupSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.*\d)(?=.{8,})/,
      'Password must contain at least one Uppercase, lowercase, number and special character',
    ),
  cpassword: Yup.string().when('password', {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref('password')], "Password doesn't match"),
  }),
});

export const RegisterForm = () => {
  const [visibility, setVisibility] = useState(false);
  const [cPassordVisibility, setCPassowrdvisibility] = useState(false);
  const router = useRouter();
  const handleVisibilty = () => {
    return setVisibility(!visibility);
  };
  const handleCPasswordVisibilty = () => {
    return setCPassowrdvisibility(!cPassordVisibility);
  };

  const onSubmit = async (values: {
    email: string;
    password: string;
    username: string;
    cpassword: string;
  }) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    await fetch('http://localhost:3000/api/auth/signup', options)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push('http://localhost:3000');
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validationSchema: signupSchema,
    onSubmit,
  });
  return (
    <form className="flexGroup gap-5" onSubmit={formik.handleSubmit}>
      <div className={styles.input_group}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <BiUser />
        </div>
        <input
          className={` ${styles.input_text}  ${
            formik.touched.username && formik.errors.username
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type="text"
          placeholder="Username"
          {...formik.getFieldProps('username')}
        />
      </div>
      <div className={styles.input_group}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoMail />
        </div>
        <input
          className={` ${styles.input_text}  ${
            formik.touched.email && formik.errors.email
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type="email"
          name="email"
          placeholder="name@mail.com"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>

      <div className={styles.input_group}>
        <span className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoKey />
        </span>

        <input
          className={` ${styles.input_text}  ${
            formik.touched.password && formik.errors.password
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type={visibility ? 'text' : 'password'}
          placeholder="Password"
          {...formik.getFieldProps('password')}
        />

        <span
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-500 dark:text-gray-400"
          onClick={handleVisibilty}
        >
          {!visibility ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      </div>
      {formik.touched.password && formik.errors.password && (
        <span className="text-sm text-red-400">{formik.errors.password}</span>
      )}
      <div className={styles.input_group}>
        <span className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoKey />
        </span>

        <input
          className={` ${styles.input_text}  ${
            formik.touched.cpassword && formik.errors.cpassword
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type={cPassordVisibility ? 'text' : 'password'}
          placeholder="Confirm Password"
          {...formik.getFieldProps('cpassword')}
        />

        <span
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-500 dark:text-gray-400"
          onClick={handleCPasswordVisibilty}
        >
          {!cPassordVisibility ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      </div>
      {formik.touched.cpassword && formik.errors.cpassword && (
        <span className="text-sm text-red-400">{formik.errors.cpassword}</span>
      )}
      {/* Login Buttons */}
      <div className={styles.input_button}>
        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export const LoginForm = ({ signin }) => {
  const [visibility, setVisibility] = useState(false);
  const handleVisibilty = () => {
    return setVisibility(!visibility);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: { email: string; password: string }) => {
      const status = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      });

      console.log(status);
    },
  });
  return (
    <form className="flexGroup gap-5" onSubmit={formik.handleSubmit}>
      <div className={styles.input_group}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoMail />
        </div>
        <input
          className={` ${styles.input_text}  ${
            formik.touched.email && formik.errors.email
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type="email"
          name="email"
          placeholder="name@mail.com"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>

      <div className={styles.input_group}>
        <span className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoKey />
        </span>

        <input
          className={` ${styles.input_text}  ${
            formik.touched.password && formik.errors.password
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type={visibility ? 'text' : 'password'}
          placeholder="Password"
          {...formik.getFieldProps('password')}
        />

        <span
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-500 dark:text-gray-400"
          onClick={handleVisibilty}
        >
          {!visibility ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      </div>
      {formik.touched.password && formik.errors.password && (
        <span className="text-sm text-red-400">{formik.errors.password}</span>
      )}

      {/* Login Buttons */}
      <div className={styles.input_button}>
        <button className={styles.button} type="submit">
          Login
        </button>
      </div>
      <div className={styles.input_button}>
        <button type="button" onClick={signin} className={styles.button_custom}>
          Sign with Google
        </button>
      </div>
    </form>
  );
};
