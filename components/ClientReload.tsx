import Router from 'next/router';
import { useEffect } from 'react';

/**
 * Client-side complement to next-remote-watch
 * Re-triggers getStaticProps when watched mdx files change
 *
 */
export const ClientReload = () => {
  // Exclude socket.io from prod bundle
  useEffect(() => {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import('socket.io-client').then((module) => {
      const socket = module.io();
      socket.on('reload', (_data) => {
        Router.replace(Router.asPath, undefined, {
          scroll: false,
        });
      });
    });
  }, []);

  return null;
};
