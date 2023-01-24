import FourZeroFour from '#/components/404';
import { Footer } from '#/components/Footer';
import { useTheme } from 'next-themes';
import React from 'react'

function ErrorLayout({}) {
  const { theme} = useTheme()
  return (
    <div className="page-scroller ">
    <section className="m-auto grid lg:grid-cols-2 min-h-3/4 rounded-2xl w-5/6 md:w-3/5 ">
    <FourZeroFour theme={theme}/>
    </section>
    <Footer />
  </div>

  )
}

export default ErrorLayout