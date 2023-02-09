import React from 'react';

import Container from '#/components/PostContainer';
import type { BlurredPhoto, Post } from '#/lib/types';

type Props = {
  post: Post;
  coverImage: BlurredPhoto;
  authorImg: BlurredPhoto;
};

function PostLayout({ post, coverImage, authorImg }: Props) {
  return (
    <Container authorImg={authorImg} coverWrapper={coverImage} post={post}>
      <h4>postting</h4>
    </Container>
  );
}

export default PostLayout;
