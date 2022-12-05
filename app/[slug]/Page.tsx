import Container from '#/components/Container';
import IconHero from '#/components/IconHero';
import MDXRender from '#/components/MDXRender';
import PostCard from '#/components/PostCard';
import { serialize } from 'next-mdx-remote/serialize'
import { Post, Slug, Tag } from '#/lib/types';
import {
  getPost,
  getPostPaths,
  getPosts,
  getPostsPhotos,
} from '#/services/Index';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';

const blurImages = async (photo: any) => {
  const { base64, img } = await getPlaiceholder(photo);
  return {
    ...img,
    base64,
  };
};

export async function generateStaticParams() {
  const slugRes = await getPostPaths();
  const posts = slugRes.posts;

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
const fetchData = async (param:{slug:string}) => {
  const { post } = await getPost(param);
  const { coverPhoto} = post;
  const content = await serialize(post.content.markdown)
  const blurredPhoto = await blurImages(coverPhoto.url);
  return { blurredPhoto, post, content };
};

export default async function Home({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { post, blurredPhoto, content } = await fetchData(params);
  return (
    <Container coverWrapper={blurredPhoto}>
      <main className="page page-has-cover page-has-icon page-has-image-icon full-page">
        <h1 className="title">{post.title}</h1>
        <div className="collection-page-properties">
          <div className="collection-row">
            <div className="collection-row-body">
              <div className="collection-row-property">
                <div className="collection-column-title">
                  <svg
                    viewBox="0 0 14 14"
                    className="collection-column-title-icon"
                  >
                    <path d="M4 3a1 1 0 011-1h7a1 1 0 110 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h7a1 1 0 110 2H5a1 1 0 01-1-1zm0 4a1 1 0 011-1h7a1 1 0 110 2H5a1 1 0 01-1-1zM2 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                  <div className="collection-column-title-body">Tags</div>
                </div>
                <div className="collection-row-value">
                  <span className="property property-multi_select">
                    {post.tags.map((tag: Tag) => {
                      return (
                        <Link href={`/tags/${tag.slug}`} key={tag.name}>
                          {' '}
                          <div
                            className={`property-multi_select-item item-${tag.colors} button`}
                          >
                            {tag.name}
                          </div>
                        </Link>
                      );
                    })}
                  </span>
                </div>
              </div>
              <div className="collection-row-property">
                <div className="collection-column-title">
                  <svg
                    viewBox="0 0 14 14"
                    className="collection-column-title-icon"
                  >
                    <path d="M10.889 5.5H3.11v1.556h7.778V5.5zm1.555-4.444h-.777V0H10.11v1.056H3.89V0H2.333v1.056h-.777c-.864 0-1.548.7-1.548 1.555L0 12.5c0 .856.692 1.5 1.556 1.5h10.888C13.3 14 14 13.356 14 12.5V2.611c0-.855-.7-1.555-1.556-1.555zm0 11.444H1.556V3.944h10.888V12.5zM8.556 8.611H3.11v1.556h5.445V8.61z"></path>
                  </svg>
                  <div className="collection-column-title-body">Published</div>
                </div>
                <div className="collection-row-value">
                  <span className="property property-date ">
                    <time dateTime={post.createdAt}>
                      {moment(post.createdAt).format('MMMM Do YYYY')}{' '}
                    </time>
                  </span>
                </div>
              </div>
              <div className="collection-row-property">
                <div className="collection-column-title">
                  <svg
                    viewBox="0 0 14 14"
                    className="collection-column-title-icon"
                  >
                    <path d="M7 4.568a.5.5 0 00-.5-.5h-6a.5.5 0 00-.5.5v1.046a.5.5 0 00.5.5h6a.5.5 0 00.5-.5V4.568zM.5 1a.5.5 0 00-.5.5v1.045a.5.5 0 00.5.5h12a.5.5 0 00.5-.5V1.5a.5.5 0 00-.5-.5H.5zM0 8.682a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V7.636a.5.5 0 00-.5-.5H.5a.5.5 0 00-.5.5v1.046zm0 3.068a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-1.045a.5.5 0 00-.5-.5h-9a.5.5 0 00-.5.5v1.045z"></path>
                  </svg>
                  <div className="collection-column-title-body">Author</div>
                </div>
                <div className="collection-row-value">
                  <span className="property property-text">
                    <b>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link capitalize"
                        href="https://twitter.com/zyk"
                      >
                        {post.author.name || 'Zykson'}
                      </a>
                    </b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-pink-500 page-content page-content-has-aside page-content-has-toc">
           {/* <MDXRender post={content}/>  */}
           <h1> Under construction</h1>
        </div>
      </main>
    </Container>
  );
}
