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

const validates = (values: SigninFormValues): SigninFormErrors => {
  const errors: SigninFormErrors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Enter your password';
  }

  return errors;
};

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
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both password need to be the same',
    ),
  }),
});

const Form = ({ signin }: Props) => {
  const [visibility, setVisibility] = useState(false);
  const handleVisibilty = () => {
    return setVisibility(!visibility);
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validates,
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form className="flexGroup gap-5" onSubmit={formik.handleSubmit}>
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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <BiUser />
        </div>
        <input
          className={` ${styles.input_text}  ${
            formik.touched.email && formik.errors.email
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type="text"
          name="email"
          placeholder="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
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
        <button onClick={signin} className={styles.custom_button}>
          Sign with Google
        </button>
      </div>
    </form>
  );
};

export const RegisterForm = () => {
  const [visibility, setVisibility] = useState(false);
  const [cPassordVisibility, setCPassowrdvisibility] = useState(false);
  
  const handleVisibilty = () => {
    return setVisibility(!visibility);
  };
  const handleCPasswordVisibilty = () => {
    return setCPassowrdvisibility(!cPassordVisibility);
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
    validationSchema: signupSchema,
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form className="flexGroup gap-5" onSubmit={formik.handleSubmit}>
      <div className={styles.input_group}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <BiUser />
        </div>
        <input
          className={` ${styles.input_text}  ${
            formik.touched.firstName && formik.errors.firstName
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type="text"
          placeholder="First Name"
          {...formik.getFieldProps('firstName')}
        />
      </div>
      <div className={styles.input_group}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <BiUser />
        </div>
        <input
          className={` ${styles.input_text}  ${
            formik.touched.lastName && formik.errors.lastName
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type="text"
          placeholder="Last Name"
          {...formik.getFieldProps('lastName')}
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
      {formik.touched.password && formik.errors.password && <span className='text-sm text-red-400'>{formik.errors.password}</span>}
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
      {formik.touched.cpassword && formik.errors.cpassword && <span className='text-sm text-red-400'>{formik.errors.cpassword}</span>}
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

export default Form;
