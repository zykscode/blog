import React from 'react';

import CoverWrapper from './CoverWrapper';
import { Footer } from './Footer';
import IconHero from './IconHero';
import PageProperty from './PageProperty';

function Container(props: { [x: string]: any; children: any }) {
  const { children, ...customData } = props;

  return (
    <div className="page-scroller ">
      <CoverWrapper img={customData.coverWrapper} />
      <main className="page page-has-cover page-has-icon page-has-image-icon full-page">
        <IconHero img={customData.authorImg} />
        <h1 className="title capitalize">
          {(customData.title && `${customData.title} `) || 'Zykson.com'}
        </h1>
        <PageProperty post={customData.post} />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Container;
