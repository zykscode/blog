import Header from '#/components/Header';
import '#/styles/globals.css';
import '#/styles/style.scss';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="">
        <div className="notion app">
          <div className="viewport"></div>
          <div className="frame">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
