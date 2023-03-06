/* eslint-disable unused-imports/no-unused-vars */

'use client';

import cs from 'classnames';
import Link from 'next/link';
import React from 'react';
import { IoMoonSharp, IoSunnyOutline } from 'react-icons/io5';

import { useDarkMode } from '#/lib/use-dark-mode';

import Search from './Search';
import styles from './styles.module.css';

const isSearchEnabled = false;
const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode();
    console.log('here in the toggle theme button');
  }, []);

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </div>
  );
};
const navs = ['blog', 'portfolio', 'contact'];

const Navs = () => {
  console.log({ todo: 'Navs' });
  return (
    <nav className="nav-header-rhs breadcrumbs">
      {navs.map((nav) => {
        return (
          <Link className="breadcrumb button" key={nav} href={`/${nav}`}>
            {nav}
          </Link>
        );
      })}
      <ToggleThemeButton />

      {isSearchEnabled && <Search />}
    </nav>
  );
};

export default Navs;
