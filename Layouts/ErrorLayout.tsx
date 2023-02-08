import { useTheme } from 'next-themes';
import React from 'react';

import FourZeroFour from '#/components/404';
import { Footer } from '#/components/Footer';

function ErrorLayout() {
  const { theme } = useTheme();
  return (
    <div className="page-scroller ">
      <section className="min-h-3/4 m-auto grid w-5/6 rounded-2xl bg-[var(--blueBackground)] md:w-3/5 ">
        <FourZeroFour theme={theme} />
      </section>
      <Footer />
    </div>
  );
}

export default ErrorLayout;
