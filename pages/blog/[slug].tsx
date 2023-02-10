/* eslint-disable unused-imports/no-unused-imports */
import { getPlaiceholder } from 'plaiceholder';

import { MDXLayoutRenderer } from '#/components/MDXRender';
import { PageSEO } from '#/components/SEO';
import PostLayout from '#/Layouts/PostLayout';
import { mdxToHtml } from '#/lib/mdx';
import type { BlurredPhoto, CoverPhoto, Post } from '#/lib/types';
import { getPost, getPostPaths } from '#/services';

const blurImage = async (photo: CoverPhoto) => {
  const image = await getPlaiceholder(photo.url);

  return image;
};

export async function getStaticProps({ params }: { params: any }) {
  const { post } = await getPost({ params });
  const blurredImage = await blurImage(post.coverPhoto);
  const authorImage = await blurImage(post.author.avatar);
  const { html, readingTime, code } = await mdxToHtml(post.content.markdown);

  return {
    props: {
      post: {
        ...post,
        content: html,
        coverPhoto: blurredImage,
      },
      readingTime,
      authorImage,
      code,
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
  authorImage,
  _readingTime,
  code,
}: {
  post: Post;
  authorImage: BlurredPhoto;
  _readingTime: string;
  code: string;
}) {
  console.log(post.content);
  return (
    <>
      <PageSEO title={''} description={''} />
      <PostLayout
        post={post}
        code={code}
        authorImg={authorImage}
        coverImage={post.coverPhoto}
      >
        <MDXLayoutRenderer
          layout={'PostLayout'}
          mdxSource={code}
          rest={undefined}
        />
      </PostLayout>
    </>
  );
}

export default BlogPost;
