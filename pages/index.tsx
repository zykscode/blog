import Container from '#/components/Container';
import Me from '#/public/static/images/me.jpg';
import Aside from '#/components/Aside';
import { getSession, signOut, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Session } from 'inspector';
import { PageSEO } from '#/components/SEO';

export default function Home() {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut();
  };
  return (
    <>
      <h2>We are home</h2>
      <button onClick={handleSignOut}>signOut</button>
    </>
  );
}

const Guest = () => {
  <>
    <PageSEO
      title={siteMetadata.title}
      description={siteMetadata.description}
    />
    <Container coverWrapper={Me}>
      <div className="page-content page-content-has-aside">
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
  </>;
};

const Author = ({ session, handleSignOut }: { session: Session }) => {
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
  </Container>;
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
