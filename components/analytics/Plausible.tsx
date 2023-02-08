import Script from 'next/script';
import React from 'react';

import { siteMetadata } from '#/data/siteMetadata';

const PlausibleScript: React.FC = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        data-domain={siteMetadata.analytics.plausibleDataDomain}
        src="https://plausible.io/js/plausible.js"
      />
      <Script strategy="lazyOnload" id="plausible-script">
        {`
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
        `}
      </Script>
    </>
  );
};

export default PlausibleScript;

declare global {
  interface WindowWithPlausible extends Window {
    plausible: (...args: any[]) => void;
  }
}

// https://plausible.io/docs/custom-event-goals
export const logEvent = (eventName: string, ...rest: any[]) => {
  const windowWithPlausible = window as unknown as WindowWithPlausible;
  if (windowWithPlausible.plausible) {
    return windowWithPlausible.plausible(eventName, ...rest);
  }
};
