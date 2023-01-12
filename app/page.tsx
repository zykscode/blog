import Aside from '#/components/Aside';
import PostCard from '#/components/PostCard';
import Me from '#/public/static/images/me.jpg';
import Container from '#/components/Container';
import { Post, Tag } from '#/lib/types';
import { getPosts, getPostsPhotos } from '#/services/Index';
// import { getAllFilesFrontMatter } from '#/lib/mdx';


const fetchData = async () => {
  // const { posts } = await getPosts();
  // const responsePhotos = await getPostsPhotos();
  // const photos = responsePhotos.posts;
  // const blurredPhotos = await blurImages(photos);
  // return { blurredPhotos, posts };
 // const posts = await getAllFilesFrontMatter('blog')
  return{hello:'hey'}
};

export default async function Home() {
  //const {posts} = await fetchData()
  
  return (
    <Container coverWrapper={Me}>
      <div className="page-content page-content-has-aside">
        <article className="page-content-inner">
          <div className="collection block">
            <div className="collection-header">
              <div className="collection-header-title">Blog Posts</div>
            </div>
            <div className="gallery">
              <div className="gallery-view">
                <div className="gallery-grid gallery-grid-size-medium">
                  {posts.map((post: { slug: any; images?: any; id?: string; content?: { markdown: string; } | undefined; title?: string; date?: string | undefined; summary?: string; coverImage?: string | undefined; readingTime?: string | undefined; createdAt?: string | undefined; tags?: Tag[]; }) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      coverImages={post.images[0]}
                    />
                  ))} 
                </div>
              </div>
            </div>
          </div>
        </article>
        <Aside />
      </div>
    </Container>
  );
}
