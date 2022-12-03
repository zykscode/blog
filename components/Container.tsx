import React from 'react';
import CoverWrapper from './CoverWrapper';
import IconHero from './IconHero';

function Container(props: { [x: string]: any; children: any }) {
  const { children, ...customData } = props;

  return (
    <>
      <CoverWrapper img={customData.coverWrapper} />
      <main className="page page-has-cover page-has-icon page-has-image-icon full-page index-page">
        <IconHero />
        <h1 className="title">Zykson.com</h1>
        {children}
      </main>
      </>
  );
}

export default Container;
