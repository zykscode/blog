'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import BlogImage from './BlogImage';
import { BlogNewsletterForm } from './NewsletterForm';
import Pre from './Pre';
import TOCInline from './TOCInline';

const CustomLink = (props: any) => {
  const { href } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link className="link" href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  return (
    <a className="link" target="_blank" rel="noopener noreferrer" {...props} />
  );
};

export const MDXComponents = {
  BlogImage,
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
};

export default MDXComponents;
