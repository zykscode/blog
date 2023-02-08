'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import React from 'react';

import BlogImage from './BlogImage';
import { BlogNewsletterForm } from './NewsletterForm';
import Pre from './Pre';

type Props = {
  post: MDXRemoteSerializeResult;
};

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

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function headingElements(props: any) {
  return <span className="bg-pink">{props}</span>;
}

export const MDXComponents = {
  BlogImage,
  a: CustomLink,
  h2: headingElements,
  img: RoundedImage,
  pre: Pre,
  BlogNewsletterForm,
};

const MDXRender = ({ post }: Props) => {
  return <MDXRemote {...post} />;
};

export default MDXRender;
