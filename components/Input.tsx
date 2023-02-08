import type { ReactNode } from 'react';
import React from 'react';

import styles from '#/styles/Form.module.scss';

interface Props {
  formik: {
    touched: any;
    errors: any;
    handleBlur: (event: any) => void;
    handleChange: (event: any) => void;
    values: any;
  };
  type: string;
  name: string;
  placeholder: string;
  children: ReactNode;
}

const Input: React.FC<Props> = ({
  formik,
  type,
  name,
  placeholder,
  children,
}) => {
  return (
    <div className={styles.input_group}>
      {children}
      <input
        className={` ${styles.input_text}  ${
          formik.touched[name] && formik.errors[name]
            ? ' border-[var(--red)] ring-[var(--red)]'
            : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values[name]}
      />
    </div>
  );
};

export default Input;
