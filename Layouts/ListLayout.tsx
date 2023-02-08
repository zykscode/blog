import React from 'react';

import Aside from '#/components/Aside';
import Container from '#/components/Container';
import PostCard from '#/components/PostCard';
import type { BlurredPhoto, Post } from '#/lib/types';
import Me from '#/public/static/images/me.jpg';

type Props = {
  posts: Post[];
  coverImage: BlurredPhoto[];
};

function ListLayout({ posts, coverImage }: Props) {
  return (
    <Container coverWrapper={Me}>
      <div className="page-content page-content-has-aside">
        <article className="page-content-inner">
          <div className="collection block">
            <div className="collection-header">
              <div className="collection-header-title">Blog Posts</div>
            </div>
            <div className="gallery">
              <div className="gallery-view">
                <div className="gallery-grid gallery-grid-size-medium">
                  {posts.map((post) => (
                    <PostCard
                      key={post.title}
                      post={post}
                      coverImages={coverImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>
        <Aside />
      </div>
    </Container>
  );
}

export default ListLayout;
