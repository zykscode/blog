import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline, IoKey, IoMail } from 'react-icons/io5';

import { AuthContext } from '#/context/authentication';

import styles from '#/styles/Form.module.scss';

export const LoginForm = () => {
  const { LoginToAccount } = useContext(AuthContext)!;
  const [visibility, setVisibility] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const body = {
        email: values.email,
        password: values.password,
      };
      await LoginToAccount(body);
    },
  });

  const handleVisibilty = () => {
    return setVisibility(!visibility);
  };

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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoKey />
        </div>
        <input
          className={` ${styles.input_text}  ${
            formik.touched.password && formik.errors.password
              ? ' border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type={visibility ? 'text' : 'password'}
          name="password"
          placeholder="**********"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div
          onClick={handleVisibilty}
          className="pointer-events-auto absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-500 dark:text-gray-400"
        >
          {visibility ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </div>
      </div>
      <button className={styles.submit_button} type="submit">
        Login
      </button>
    </form>
  );
};
