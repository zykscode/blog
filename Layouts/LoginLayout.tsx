import type { ReactNode } from 'react';
import React from 'react';

import { Footer } from '#/components/Footer';

type Props = {
  children: ReactNode;
};

const LoginLayout = ({ children }: Props) => {
  return (
    <div className="page-scroller ">
      <section className="min-h-3/4 m-auto grid w-5/6 rounded-2xl md:w-3/5 lg:grid-cols-2 ">
        <div className="relative overflow-hidden bg-gradient-to-tr from-blue-400 to-indigo-600">
          Images
        </div>
        <div className="right flex flex-col justify-evenly  bg-[var(--blueBackgroundCo)]">
          <div className="py-10 text-center">{children}</div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginLayout;
