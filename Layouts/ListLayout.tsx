import Aside from '#/components/Aside';
import Container from '#/components/Container';
import PostCard from '#/components/PostCard';
import { Tag } from '#/lib/types';
import Me from '#/public/static/images/me.jpg';
import React from 'react'

function ListLayout({posts}) {
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
                {posts.map((post: { slug: any; images?: any; id?: string; content?: { markdown: string } | undefined; title: string; date?: string | undefined; summary?: string; coverImage?: string | undefined; readingTime?: string | undefined; createdAt?: string | undefined; tags?: Tag[] },i:number) => (
                  <PostCard
                    key={post.title+i}
                    post={post}
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
  )
}

export default ListLayout