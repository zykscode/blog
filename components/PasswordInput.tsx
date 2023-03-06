

// function PasswordInput(props) {
//   const {
//     placeholder,
//     name,
//     value,
//     onChange,
//     type,
//     cPassordVisibility,
//     handleCPasswordVisibilty,
//     error,
//     touched,
//   } = props;
//   return (
//     <div className="relative">
//       <div className={styles.input_group}>
//         <span className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3 text-gray-500 dark:text-gray-400">
//           <IoKey />
//         </span>
//         <input
//           id={name}
//           name={name}
//           value={value}
//           typeof={type}
//           onChange={onChange}
//           className={` ${styles.input_text}  ${
//             touched && error
//               ? ' border-[var(--red)] ring-[var(--red)]'
//               : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
//           }`}
//           type={cPassordVisibility ? 'text' : 'password'}
//           placeholder={placeholder}
//           {...props}
//         />
//         <span
//           className="absolute inset-y-0 right-0 z-50 flex cursor-pointer items-center pr-3 text-gray-500 opacity-100 dark:text-gray-400"
//           onClick={handleCPasswordVisibilty}
//         >
//           {!cPassordVisibility ? <IoEyeOutline /> : <IoEyeOffOutline />}
//         </span>
//       </div>
//       {touched && error && <div className={styles.error}>{error}</div>}
//     </div>
//   );
// }
// export default PasswordInput;
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline, IoKey } from 'react-icons/io5';

import styles from '#/styles/Form.module.scss';

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  onBlur: () => void;
}

export const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  error,
  onBlur,
}: PasswordInputProps) => {
  const [visibility, setVisibility] = useState(false);
  const handleVisibilty = () => setVisibility(!visibility);

  return (
      <div className={styles.input_group}>
        <span className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-3 text-gray-500 dark:text-gray-400">
          <IoKey />
        </span>

        <input
          className={` ${styles.input_text}  ${
            error
              ? 'border-[var(--red)] ring-[var(--red)]'
              : 'border-[var(--blue)] ring-[var(--blue)] focus:border-[var(--blue)] focus:ring-[var(--blue)] '
          }`}
          type={visibility ? 'text' : 'password'}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />

        <span
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-500 dark:text-gray-400"
          onClick={handleVisibilty}
        >
          {!visibility ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </span>

        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>

  );
};
