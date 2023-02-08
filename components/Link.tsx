import Link from 'next/link';
import React from 'react';

interface CustomLinkProps {
  href: string;
  children: any;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link legacyBehavior={true} href={href}>
        <a>{children}</a>
      </Link>
    );
  }

  if (isAnchorLink) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href}>
      {children}
    </a>
  );
};

export default CustomLink;
