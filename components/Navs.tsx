import Link from 'next/link';
import React from 'react';
import Search from './Search';
import ToggleThemeButton from './ToggleThemeButton';

type Props = {};

const isSearchEnabled = true;

const navs = ['blog', 'tags', 'contact'];

const Navs = (props: Props) => {
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
