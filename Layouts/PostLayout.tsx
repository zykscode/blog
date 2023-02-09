import { MDXRemote } from 'next-mdx-remote';
import React from 'react';

import components from '#/components/MDXRender';
import Container from '#/components/PostContainer';
import type { BlurredPhoto, Post } from '#/lib/types';

type Props = {
  post: Post;
  coverImage: BlurredPhoto;
  authorImg: BlurredPhoto;
};

function PostLayout({ post, coverImage, authorImg }: Props) {
  console.log({ todo: ['speechify something'] });
  return (
    <Container
      authorImg={authorImg}
      coverWrapper={coverImage}
      post={post}
      title={post.title}
    >
      <MDXRemote {...post.content} components={{ ...components }} />
    </Container>
  );
}

export default PostLayout;
