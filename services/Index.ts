import { GraphQLClient } from 'graphql-request';
export const getProjects = async (): Promise<{
  name: string,
  tags: string[],
  slug: string,
  createdAt: string,
  description: string,
  demo: string,
  sourceCode: string,
  image: {
    url: string
  }[]
}> => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(`

    query MyQuery{
    projects {
      name
      tags
      slug
      createdAt
      description
      demo
      sourceCode
      image {
        url
      }
    }
  }`
  ))
}


export const getProject = async (params: { slug: string }): Promise<{
  name: string,
  tags: string[],
  slug: string,
  createdAt: string,
  description: string,
  demo: string,
  sourceCode: string,
  image: {
    url: string
  }
}> => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(`

    query ProjectPageQuery($slug:string){
    project(where: { slug: $slug }) {
      name
      tags
      slug
      createdAt
      description
      demo
      sourceCode
      image {
        url
      }
    }
  }`,
    {
      slug: params.slug
    }
  ))
}

export const getPosts = async (): Promise<{
  posts: {
    id: string,
    author: {
      id: string,
      name: string,
      avatar: {
        url: string
      },
      slug: string
    },
    title: string,
    tags: {
      name: string,
      colors: string,
      slug: string
    }[],
    slug: string,
    createdAt: string,
    summary: string,
    content: {
      markdown: string
    },
    coverPhoto: {
      url: string
    }
  }[]
}> => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(
    ` query Posts {
      posts {
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
          name
          colors
          slug
        }
        slug
        createdAt
        summary
        content{
          markdown
        }
        coverPhoto{
          url
        }
      }
      }

    `
  ))
}

export const getPostsPhotos = async (): Promise<{
  posts: {
    id: string,
    coverPhoto: {
      id: string,
      url: string,
      width: number,
      height: number
    }
  }[]
}> => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(
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

    `
  ))
}


export const getPost = async (params: { slug: string }): Promise<{
  post: {
    id: string,
    author: {
      id: string,
      name: string,
      avatar: {
        url: string
      },
      slug: string
    },
    title: string,
    tags: {
      colors: string,
      name: string,
      slug: string
    }[],
    slug: string,
    createdAt: string,
    content: {
      markdown: string
    },
    coverPhoto: {
      url: string
    }
  }
}> => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(`

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
        }
        coverPhoto{
          url
        }
      }
      }`,
    {
      slug: params.slug
    }
  ))
}



export const getPostPaths = async (): Promise<{
  posts: {
    slug: string,
    title: string
  }[]
}> => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(`
  {posts{
      slug
      title
  }}
  `))
}




export const getTagPosts = async (params: { name: string }): Promise<{
  tag: {
    name: string,
    slug: string,
    colors: string,
    posts: {
      id: string,
      title: string,
      summary: string,
      slug: string,
      coverPhoto: {
        url: string
      },
      tags: {
        name: string,
        slug: string,
        colors: string
      }[]
    }[]
  }
}> => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(`
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
  `, {
    name: params.name
  }))
}

export const getTagsPaths = async (): Promise<{
  tags: {
    name: string,
    slug: string,
    colors: string
  }[]
}> => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(`
  {
    tags{
      name
      slug
      colors
    }
  }

  `))
}


export const getOwnersDetails = async (params: { name: string }) => {
  const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
  return (await graphcms.request(`
  
  query OwnersQuery($name:String) {
    authors(where:{name:$name}){
     bio
     name
     stacks
   }
   }`,
    {
      name: "zyk"
    }
  ))
}
