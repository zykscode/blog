import { getPlaiceholder } from 'plaiceholder';

import { PageSEO } from '#/components/SEO';
import PostLayout from '#/Layouts/PostLayout';
import type { BlurredPhoto, CoverImage, Post } from '#/lib/types';
import { getPost, getPostPaths } from '#/services';

const blurImage = async (photo: CoverImage) => {
  const image = await getPlaiceholder(photo.url);

  return image;
};

export async function getStaticProps({ params }: { params: any }) {
  const { post } = await getPost({ params });
  const blurredImage = await blurImage(post.coverPhoto);
  const authorImage = await blurImage(post.author.avatar);

  return {
    props: {
      post,
      blurredImage,
      authorImage,
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
  authorImage,
}: {
  post: Post;
  blurredImage: BlurredPhoto;
  authorImage: BlurredPhoto;
}) {
  return (
    <>
      <PageSEO title={''} description={''} />
      <PostLayout
        post={post}
        authorImg={authorImage}
        coverImage={blurredImage}
      />
    </>
  );
}

export default BlogPost;
