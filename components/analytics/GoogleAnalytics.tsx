import Script from 'next/script';

import { siteMetadata } from '#/data/siteMetadata';
import type { WindowWithGtag } from '#/lib/types';

const GAScript: React.FC = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${siteMetadata.analytics.googleAnalyticsId}`}
      />
      <Script strategy="lazyOnload" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteMetadata.analytics.googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
        `}
      </Script>
    </>
  );
};

export default GAScript;

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  const windowWithGtag = window as unknown as WindowWithGtag;
  if (windowWithGtag.gtag) {
    windowWithGtag.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};
