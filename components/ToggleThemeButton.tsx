/* eslint-disable unused-imports/no-unused-vars */
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp';
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline';
import { useTheme } from 'next-themes';
import React from 'react';

import { useDarkMode } from '#/lib/use-dark-mode';

import styles from './styles.module.css';

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const onToggleDarkMode = React.useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (isDarkMode) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
      toggleDarkMode();
    },
    [toggleDarkMode],
  );

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <>
      {hasMounted && (
        <a
          className={styles.toggleDarkMode}
          href="#"
          role="button"
          onClick={onToggleDarkMode}
          title="Toggle dark mode"
        >
          {isDarkMode ? <IoSunnyOutline /> : <IoMoonSharp />}
        </a>
      )}
    </>
  );
};

export default ToggleThemeButton;
