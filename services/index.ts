import { gql } from 'graphql-request';

import { graphcms } from './_graphcms';

export const indexPageQuery = gql`
  query indexPageQuery($limit: Int!, $offset: Int!) {
    postsConnection(first: $limit, skip: $offset, orderBy: publishedAt_DESC) {
      posts: edges {
        node {
          id
          author {
            id
            name
            avatar {
              url
            }
            slug
          }
          title
          tags {
            name
            colors
            slug
          }
          slug
          createdAt
          summary
          content {
            markdown
          }
          coverPhoto {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export const blogPageQuery = async ({ params }: { params: any }) => {
  const limit = 1;
  return graphcms.request(
    `
    query blogPageQuery($limit: Int!, $offset: Int!) {
      postsConnection(first: $limit, skip: $offset, orderBy: publishedAt_DESC) {
        posts: edges {
          node {
            id
            author {
              id
              name
              avatar {
                url
              }
              slug
            }
            title
            tags {
              name
              colors
              slug
            }
            slug
            createdAt
            summary
            content {
              markdown
            }
            coverPhoto {
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `,
    {
      limit,
      offset: Number(params.page - 1) * limit,
    },
  );
};

export const blogPageStaticPaths = async () => {
  return graphcms.request(`{
  postsConnection{
    aggregate{
      count
    }
  }
}`);
};

export const getPostsPhotos = async () => {
  return graphcms.request(
    ` query Posts {
          posts {
            id
            coverPhoto{
              id
              url
              width
              height
            }
          }
          }
          
        `,
  );
};

export const getPost = async ({ params }: { params: any }) => {
  return graphcms.request(
    `
        query PostPageQuery($slug:String){
        post(where: { slug: $slug }) {
            id
            author {
              id
              name
              avatar {
                url
              }
              slug
            }
            title
            tags{
              colors
              name
              slug
            }
            slug
            createdAt
            content{
              markdown
              text
            }
            coverPhoto{
              url
            }
          }
          }`,
    {
      slug: params.slug,
    },
  );
};

export const getPostPaths = async () => {
  return graphcms.request(`
    {posts{
        slug
        title
    }}
    `);
};

export const getTagPosts = async ({ params }: { params: any }) => {
  return graphcms.request(
    `
  query getTagPosts($name:String){
    tag(where:{slug:$name}){
      name
      slug
      colors
        posts{
          id
          title
          summary
          slug
          coverPhoto{
            url
          }
          tags{
            name
            slug
            colors
          }
        
      }
    }
  }
  `,
    {
      name: params.name,
    },
  );
};

export const getTagsPaths = async () => {
  return graphcms.request(`
  {
    tags{
      name
      slug
      colors
    }
  }
  
  `);
};

export const getOwnersDetails = async () => {
  return graphcms.request(
    `
  
  query OwnersQuery($name:String) {
    authors(where:{name:$name}){
     bio
     name
     stacks
   }
   }`,
    {
      name: 'zyk',
    },
  );
};
