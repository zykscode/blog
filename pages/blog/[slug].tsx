import { blogPageQuery, blogPageStaticPaths } from '#/services';

export async function getStaticPaths({ params }) {
  const {
    postsConnection: { posts, pageInfo },
  } = await blogPageQuery(params);
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

  function* numberOfPages({ total, limit }) {
    let page = 1;
    let offset = 0;

    while (offset < total) {
      yield page;

      page += 1;
      offset += limit;
    }
  }

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

function BlogPage({ currentPageNumber, hasNextPage, hasPreviousPage, posts }) {
  return (
    <>
      <h1>blog paeg</h1>
    </>
  );
}
