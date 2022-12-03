import { GraphQLClient } from 'graphql-request';

export const getProjects = async () => {
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

export const getProject = async (slug:string) => {
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
        slug:slug
      }
    ))
}



export const getPosts = async () => {
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

export const getPostsPhotos = async () => {
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

export const getPost = async (slug:string) => {
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
        slug:slug
      }
    ))
}



export const getPostPaths  = async () => {
    const graphcms = new GraphQLClient('https://api-eu-central-1.hygraph.com/v2/cl6zaoh5c087901uhd1zdga18/master')
    return (await graphcms.request(`
    {posts{
        slug
        title
    }}
    `))
}






export const getTagPosts  = async (params: { name: any; }) => {
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
  `,{
    name:params.name
  }))
}

export const getTagsPaths  = async () => {
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



export const getOwnersDetails = async (params: any) => {
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
      name:"zyk"
    }
  ))
}

