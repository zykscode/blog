import React from 'react';
import CoverWrapper from './CoverWrapper';
import { Footer } from './Footer';
import IconHero from './IconHero';

function Container(props: { [x: string]: any; children: any }) {
  const { children, ...customData } = props;

  return (
    <div className="page-scroller ">
      <CoverWrapper img={customData.coverWrapper} />
      <main className="page page-has-cover page-has-icon page-has-image-icon full-page index-page">
        <IconHero />
        <h1 className="title capitalize">{customData.tag && `${customData.tag} blog post`||'Zykson.com'}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Container;
