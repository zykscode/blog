import Link from '#/components/Link'
import { PageSEO } from '#/components/SEO'
import Tag from '#/components/Tag'
import { getAllFilesFrontMatter } from '#/lib/mdx'
import formatDate from '#/lib/utils/formatDate'

import NewsletterForm from '#/components/NewsletterForm'
import { siteMetadata } from '#/data/siteMetadata'
import Container from '#/components/Container'
import Me from '#/public/static/images/me.jpg';
import Aside from '#/components/Aside'
import PostCard from '#/components/PostCard'
import { Tag } from '#/lib/types'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  console.log(posts)
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
                 {posts.map((post: { slug: any; images?: any; id?: string; content?: { markdown: string } | undefined; title?: string; date?: string | undefined; summary?: string; coverImage?: string | undefined; readingTime?: string | undefined; createdAt?: string | undefined; tags?: Tag[] }) => (
                  <PostCard
                    key={post.slug}
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
