import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header(): JSX.Element {
  const { data: session, status } = useSession();

  const loading = status === 'loading';

  if (loading) return null;

  return (
    <header>
      <Link href="/">Homepage</Link>

      {session ? (
        <p>
          <span>Signed in as {session?.user?.email}</span>
          <Link href="/account">My Account</Link>
          <button onClick={() => signOut()}>Sign out</button>
        </p>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </header>
  );
}
