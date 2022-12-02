import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import Navs from './Navs';

type Props = {};

const Header = (props: Props) => {
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
