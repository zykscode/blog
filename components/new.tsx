import React, { useState } from 'react';
import styles from '#/styles/Form.module.scss';
import { Formik, useFormik } from 'formik';
import { IoMail } from '@react-icons/all-files/io5/IoMail';
import { BiUser } from '@react-icons/all-files/bi/BiUser';
import { IoKey } from '@react-icons/all-files/io5/IoKey';
import { AiOutlineEye } from '@react-icons/all-files/ai/aiOutlineEye';
import { AiOutlineEyeInvisible } from '@react-icons/all-files/ai/AiOutlineEyeInvisible';
import Input from './Input';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password must contain at least one Uppercase, lowercase and special character',
    ),
  cpassword: Yup.string().when('password', {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both password need to be the same',
    ),
  }),
});

export const RegisterForm = () => {
  const [visibility, setVisibility] = useState(false);
  const handleVisibilty = () => {
    return setVisibility(!visibility);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validationSchema: { signupSchema },
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form className="flexGroup gap-5" onSubmit={formik.handleSubmit}>
      <Input
        formik={{
          touched: 'firstName',
          errors: 'firstName',
          handleBlur: formik.handleBlur,
          handleChange: formik.handleChange,
          values: 'firstName',
        }}
        type={'text'}
        name={'firstName'}
        placeholder={'firstName'}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <BiUser />
        </div>
      </Input>
      <Input
        formik={{
          touched: 'username',
          errors: 'username',
          handleBlur: formik.handleBlur,
          handleChange: formik.handleChange,
          values: 'username',
        }}
        type={'text'}
        name={'username'}
        placeholder={'Username'}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <BiUser />
        </div>
      </Input>
      <Input
        formik={{
          touched: 'username',
          errors: 'username',
          handleBlur: formik.handleBlur,
          handleChange: formik.handleChange,
          values: 'username',
        }}
        type={'text'}
        name={'username'}
        placeholder={'Username'}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <BiUser />
        </div>
      </Input>
      <Input
        formik={{
          touched: 'email',
          errors: 'email',
          handleBlur: formik.handleBlur,
          handleChange: formik.handleChange,
          values: 'email',
        }}
        type={'text'}
        name={'email'}
        placeholder={'name@mail.com'}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoMail />
        </div>
      </Input>

      <Input
        formik={{
          touched: 'password',
          errors: 'password',
          handleBlur: formik.handleBlur,
          handleChange: formik.handleChange,
          values: 'password',
        }}
        type={visibility ? 'text' : 'password'}
        name={'password'}
        placeholder={'Password'}
      >
        <span className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoKey />
        </span>

        <span
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-500 dark:text-gray-400"
          onClick={handleVisibilty}
        >
          {!visibility ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      </Input>

      {/* Login Buttons */}
      <div className={styles.input_button}>
        <button className={styles.button} type="submit">
          Login
        </button>
      </div>
      <div className={styles.input_button}>
        <button className={styles.custom_button}>Sign with Google</button>
      </div>
    </form>
  );
};
