import { IoEyeOffOutline } from '@react-icons/all-files/io5/IoEyeOffOutline';
import { IoEyeOutline } from '@react-icons/all-files/io5/IoEyeOutline';
import { IoKey } from '@react-icons/all-files/io5/IoKey';
import { IoMail } from '@react-icons/all-files/io5/IoMail';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

import styles from '#/styles/Form.module.scss';

export const LoginForm = ({ signin }: { signin: () => Promise<void> }) => {
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
          {!visibility ? <IoEyeOutline /> : <IoEyeOffOutline />}
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
