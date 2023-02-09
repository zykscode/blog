import React from 'react';

import AsideTOC from './AsideTOC';
import CoverWrapper from './CoverWrapper';
import { Footer } from './Footer';
import IconHero from './IconHero';
import PageProperty from './PageProperty';

function Container(props: { [x: string]: any; children: any }) {
  const { children, ...customData } = props;
  const { post, coverWrapper, authorImg, title } = customData;
  return (
    <div className="page-scroller ">
      <CoverWrapper img={coverWrapper} />
      <main className="page page-has-cover page-has-icon page-has-image-icon full-page">
        <IconHero img={authorImg} />
        <h1 className="title capitalize">
          {(title && `${title} `) || 'Zykson.com'}
        </h1>
        {/* <AudioPlayer word={''} /> */}
        <PageProperty post={post} />
        {/* <ReadWordsOut text={post.content.text} />
         */}
        <div className="page-content page-content-has-aside page-content-has-toc">
          <article className="page-content-inner">{children}</article>
          <AsideTOC />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Container;
