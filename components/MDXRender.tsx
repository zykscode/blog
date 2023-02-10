/* eslint-disable import/no-dynamic-require */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable global-require */

import { getMDXComponent } from 'mdx-bundler/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';

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

interface MDXComponentsProps {
  components: any;
  layout: string;
  rest: any;
}

export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
  wrapper: ({ components, layout, ...rest }: MDXComponentsProps) => {
    const Layout = require(`../layouts/${layout}`).default;
    return <Layout {...rest} />;
  },
};

interface MDXLayoutRendererProps {
  layout: string;
  mdxSource: string;
  rest: any;
}

export const MDXLayoutRenderer = ({
  layout,
  mdxSource,
  ...rest
}: MDXLayoutRendererProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return <MDXLayout layout={layout} components={{ MDXComponents }} {...rest} />;
};
