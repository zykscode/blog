import React from 'react';
import PageLogo from './PageLogo';

type Props = {};

const Breadcrumbs = (props: Props) => {
  console.log({ todo: 'add site name' });
  return (
    <div className="breadcrumbs">
      <div className="breadcrumb active">
        <PageLogo />
        <span >Zykson.com</span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
