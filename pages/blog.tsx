import { getPlaiceholder } from 'plaiceholder';

import { PageSEO } from '#/components/SEO';
import { siteMetadata } from '#/data/siteMetadata';
import ListLayout from '#/Layouts/ListLayout';
import type { BlurredPhoto, CoverImage, Post } from '#/lib/types';
import { getPostsPhotos, indexPageQuery } from '#/services';
import { graphcms } from '#/services/_graphcms';

const blurImages = async (
  photos: { id: any; coverPhoto: CoverImage }[],
): Promise<BlurredPhoto[]> => {git
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

export async function getStaticProps() {
  async function fetchPosts() {
    let offset = 0;
    let hasNextPage = true;
    const limit = 3;

    const allPosts = [];

    while (hasNextPage) {
      // eslint-disable-next-line no-await-in-loop
      const response = await graphcms.request(indexPageQuery, {
        limit,
        offset,
      });

      const {
        postsConnection: { posts, pageInfo },
      } = response;

      hasNextPage = pageInfo.hasNextPage;
      offset += limit;

      allPosts.push(...posts);
    }

    return allPosts;
  }

  const posts = await (await fetchPosts()).map(({ node }) => node);
  const responsePhotos = await getPostsPhotos();
  const photos: { id: string; coverPhoto: CoverImage }[] = responsePhotos.posts;
  const blurredPhotos = await blurImages(photos);

  return {
    props: {
      posts,
      blurredPhotos,
    },
  };
}

export default function Home({
  posts,
  blurredPhotos,
}: {
  posts: Post[];
  blurredPhotos: BlurredPhoto[];
}) {
  return (
    <>
      <PageSEO
        title={`${siteMetadata.author}'s blog`}
        description={siteMetadata.description}
      />
      <ListLayout coverImage={blurredPhotos} posts={posts} />
    </>
  );
}
