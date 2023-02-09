/* eslint-disable import/no-unresolved */
import { getPlaiceholder } from 'plaiceholder';

import { PageSEO } from '#/components/SEO';
import { siteMetadata } from '#/data/siteMetadata';
import ListLayout from '#/Layouts/ListLayout';
import type { BlurredPhoto, CoverImage, Post } from '#/lib/types';
import { blogPageQuery, blogPageStaticPaths } from '#/services';

const blurImages = async (
  photos: { id: any; coverPhoto: CoverImage }[],
): Promise<BlurredPhoto[]> => {
  const images = await Promise.all(
    photos.map(async (image) => {
      const { base64, img } = await getPlaiceholder(image.coverPhoto.url);
      return {
        ...img,
        base64,
        postId: image.id,
      };
    }),
  );
  return images;
};

export async function getStaticProps({ params }: { params: any }) {
  const {
    postsConnection: { posts, pageInfo },
  } = await blogPageQuery({ params });
  const blurredPhotos = await blurImages(
    posts.map((post: { node: Post }) => post.node),
  );
  return {
    props: {
      currentPageNumber: Number(params.page),
      posts,
      ...pageInfo,
      blurredPhotos,
    },
  };
}

export async function getStaticPaths() {
  const { postsConnection } = await blogPageStaticPaths();

  function* numberOfPages({ total, limit }: { total: number; limit: number }) {
    let page = 1;
    let offset = 0;

    while (offset < total) {
      yield page;

      page += 1;
      offset += limit;
    }
  }

  const limit = 1;

  const paths = [
    ...numberOfPages({
      total: postsConnection.aggregate.count,
      limit,
    }),
  ].map((page) => ({
    params: { page: String(page) },
  }));

  return {
    paths,
    fallback: false,
  };
}

function BlogPage({
  currentPageNumber,
  hasNextPage,
  hasPreviousPage,
  posts,
  blurredPhotos,
}: {
  currentPageNumber: number;
  hasPreviousPage: boolean;
  posts: { node: Post }[];
  hasNextPage: boolean;
  blurredPhotos: BlurredPhoto[];
}) {
  const newPosts = posts.map(({ node }) => node);
  console.log(posts, hasNextPage, hasPreviousPage, currentPageNumber);
  return (
    <>
      <PageSEO
        title={`${siteMetadata.author}'s blog`}
        description={siteMetadata.description}
      />
      <ListLayout coverImage={blurredPhotos} posts={newPosts} />
    </>
  );
}

export default BlogPage;
