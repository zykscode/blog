'use client';

import React from 'react';

import Breadcrumbs from './Breadcrumbs';
import Navs from './Navs';

const Header = () => {
  return (
    <header className="header">
      <div className="nav-header">
        <Breadcrumbs />
        <Navs />
      </div>
    </header>
  );
};

export default Header;
