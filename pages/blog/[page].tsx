/* eslint-disable import/no-unresolved */
import type { Post } from '#/lib/types';
import { blogPageQuery, blogPageStaticPaths } from '#/services';

export async function getStaticProps({ params }: { params: any }) {
  const {
    postsConnection: { posts, pageInfo },
  } = await blogPageQuery({ params });
  return {
    props: {
      currentPageNumber: Number(params.page),
      posts,
      ...pageInfo,
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
  _posts,
}: {
  currentPageNumber: number;
  hasPreviousPage: boolean;
  _posts: Post[];
  hasNextPage: boolean;
}) {
  console.log(hasNextPage, hasPreviousPage, currentPageNumber);
  return (
    <>
      <h1>blog paeg</h1>
    </>
  );
}

export default BlogPage;
