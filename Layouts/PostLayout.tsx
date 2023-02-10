/* eslint-disable unused-imports/no-unused-imports */
import React from 'react';

import { MDXLayoutRenderer } from '#/components/MDXRender';
import Container from '#/components/PostContainer';
import type { BlurredPhoto } from '#/lib/types';

type Props = {
  post: any;
  coverImage: BlurredPhoto;
  authorImg: BlurredPhoto;
  code: string;
  children: any;
};

function PostLayout({ post, children, coverImage, authorImg }: Props) {
  console.log({ todo: ['speechify something'] });
  return (
    <Container
      authorImg={authorImg}
      coverWrapper={coverImage}
      post={post}
      title={post.title}
    >
      {children}
    </Container>
  );
}

export default PostLayout;
