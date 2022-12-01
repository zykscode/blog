import '../styles/globals.css'
import '../styles/styles.scss'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='bg-green-400 h-10'>
        <nav className='nav' >
          <ul >
            <li className='bg-pink-400'>hwlle</li>
            <li>hwlle</li>
            <li>hwlle</li>
            <li>hwlle</li>
          </ul>
        </nav>
        {children}</body>
    </html>
  )
}
