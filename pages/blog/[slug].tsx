import { getPlaiceholder } from 'plaiceholder';

import { PageSEO } from '#/components/SEO';
import type { BlurredPhoto, CoverImage, Post } from '#/lib/types';
import { getPost, getPostPaths } from '#/services';

const blurImage = async (photo: CoverImage) => {
  const image = await getPlaiceholder(photo.url);

  return image;
};

export async function getStaticProps({ params }: { params: any }) {
  const { post } = await getPost({ params });
  const blurredImage = await blurImage(post.coverPhoto);

  return {
    props: {
      post,
      blurredImage,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await getPostPaths();

  return {
    paths: posts.map(({ slug }: { slug: string }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

function BlogPost({
  post,
  blurredImage,
}: {
  post: Post;
  blurredImage: BlurredPhoto;
}) {
  console.log(post, blurredImage);
  return (
    <>
      <PageSEO title={''} description={''} />
    </>
  );
}

export default BlogPost;
