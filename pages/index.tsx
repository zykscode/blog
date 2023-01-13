import Link from '#/components/Link';
import { PageSEO } from '#/components/SEO';
import Tag from '#/components/Tag';
import { getAllFilesFrontMatter } from '#/lib/mdx';
import formatDate from '#/lib/utils/formatDate';

import NewsletterForm from '#/components/NewsletterForm';
import { siteMetadata } from '#/data/siteMetadata';
import Container from '#/components/Container';
import Me from '#/public/static/images/me.jpg';
import Aside from '#/components/Aside';
import PostCard from '#/components/PostCard';

import { getPlaiceholder, IGetPlaiceholderReturn } from 'plaiceholder';

const MAX_DISPLAY = 5;

const blurImages = async (photo: any) => {
  const { base64, img } = await getPlaiceholder(photo);
  return {
    ...img,
    base64,
  };
};

export async function getStaticProps() {
  let posts = await getAllFilesFrontMatter('blog');
  const newPosts = await Promise.all(posts.map(async (post) => {
    if (post.images) {
      const blurredImages = await Promise.all(post.images.map(async (image: string | Buffer) => {
        return await blurImages(image);
      }));
      return { ...post, images: blurredImages };
    } else {
      return post;
    }
  }));
 
  return { props: { newPosts } };
}


export default function Home({ newPosts }) {
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
                {newPosts.map((post: { slug: any; images?: any; id?: string; content?: { markdown: string } | undefined; title?: string; date?: string | undefined; summary?: string; coverImage?: string | undefined; readingTime?: string | undefined; createdAt?: string | undefined; tags?: Tag[] }) => (
                  <PostCard
                    key={post.title}
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
  );
}
