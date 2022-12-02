import Container from '#/components/Container'; 
import '../styles/globals.scss';
import Me from '#/public/static/images/me.jpg'
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
        <Container coverWrapper={Me}>{children}</Container>
      </body>
    </html>
  );
}
