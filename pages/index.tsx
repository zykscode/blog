import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth/core/types';
import { getSession, signOut, useSession } from 'next-auth/react';

import Aside from '#/components/Aside';
import Container from '#/components/Container';
import { PageSEO } from '#/components/SEO';
import { siteMetadata } from '#/data/siteMetadata';
import Me from '#/public/static/images/me.jpg';
import Header from '#/ui/header';

const Guest = () => {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <Container coverWrapper={Me}>
        <div className="page-content page-content-has-aside">
          <Header />
          <article className="page-content-inner">
            <div className="collection block">
              <div className="collection-header">
                <div className="collection-header-title">Blog Posts</div>
              </div>
            </div>
          </article>
          <Aside />
        </div>
      </Container>
      ;
    </>
  );
};

export const Author = ({ session }: { session: Session }) => {
  console.log(session);
  return (
    <Container coverWrapper={Me}>
      <div className="page-content page-content-has-aside">
        <article className="page-content-inner">
          <div className="collection block">
            <div className="collection-header">
              <div className="collection-header-title">Blog Posts</div>
              {session.user!.name}
            </div>
          </div>
        </article>
        <Aside />
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default function Home() {
  const { data: session, status } = useSession();
  const handleSignOut = () => {
    signOut();
  };

  const loading = status === 'loading';

  return (
    <>
    <Header />
      <h2>{loading}</h2>
      {!session ? <Guest /> : <Author session={session} />}
      <button onClick={handleSignOut}>signOut</button>
    </>
  );
}
