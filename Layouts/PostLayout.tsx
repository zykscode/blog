import { MDXRemote } from 'next-mdx-remote';
import React from 'react';

import MDXComponents from '#/components/MDXRender';
import Container from '#/components/PostContainer';
import type { BlurredPhoto } from '#/lib/types';

type Props = {
  post: any;
  coverImage: BlurredPhoto;
  authorImg: BlurredPhoto;
};

const components = MDXComponents;
function PostLayout({ post, coverImage, authorImg }: Props) {
  console.log({ todo: ['speechify something'] }, post.content);
  return (
    <Container
      authorImg={authorImg}
      coverWrapper={coverImage}
      post={post}
      title={post.title}
    >
      <MDXRemote
        compiledSource={post.content!.compiledSource}
        components={{ components }}
      />
    </Container>
  );
}

export default PostLayout;
