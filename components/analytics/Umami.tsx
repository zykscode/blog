import Script from 'next/script';
import React from 'react';

import { siteMetadata } from '#/data/siteMetadata';

const UmamiScript: React.FC = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id={siteMetadata.analytics.umamiWebsiteId}
        src="https://umami.example.com/umami.js"
      />
    </>
  );
};

export default UmamiScript;
