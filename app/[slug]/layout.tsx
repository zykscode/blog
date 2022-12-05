import Container from '#/components/Container';
import Me from '#/public/static/images/me.jpg';
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return <>{children}</>;
}
