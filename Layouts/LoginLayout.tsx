import Aside from '#/components/Aside';
import Container from '#/components/Container';
import { Footer } from '#/components/Footer';
import Me from '#/public/static/images/me.jpg';
import React, { Children, ReactNode } from 'react';

type Props = {
  children:ReactNode
};

const LoginLayout = ({ children }:Props) => {
  return (
    <div className="page-scroller ">
      <section className="m-auto grid lg:grid-cols-2 min-h-3/4 rounded-2xl w-5/6 md:w-3/5 ">
        <div className="bg-gradient-to-tr from-blue-400 to-indigo-600 relative overflow-hidden">Images</div>
        <div className="right flex flex-col bg-[var(--blueBackgroundCo)]  justify-evenly">
          <div className="py-10 text-center">{children}</div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginLayout;
