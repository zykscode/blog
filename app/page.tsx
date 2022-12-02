import PostCard from '#/components/PostCard';
import { getPosts, getPostsPhotos } from '#/services/Index';
import { getPlaiceholder } from 'plaiceholder';
import { Key } from 'react';

const blurImages = async (photos: any[]) => {
  const images = await Promise.all(
    photos.map(
      async (image: { coverPhoto: { url: string | Buffer }; id: any }) => {
        const { base64, img } = await getPlaiceholder(image.coverPhoto.url);
        return {
          ...img,
          base64,
          postId: image.id,
        };
      },
    ),
  );
  return images;
};

const fetchData = async () =>{
  const { posts } = await getPosts();
  const responsePhotos = await getPostsPhotos();
  const photos = responsePhotos.posts;
  const blurredPhotos = await blurImages(photos);
  return ({blurredPhotos,posts})
}

export default async function Home() {
  const {blurredPhotos,posts} = await fetchData()
  return (
    <article className="page-content-inner">
      <div className="collection block">
        <div className="collection-header">
          <div className="collection-header-title">Blog Posts</div>
        </div>
        <div className="gallery">
          <div className="gallery-view">
            <div className="gallery-grid gallery-grid-size-medium">
              {posts.map((post: { slug: Key | null | undefined }) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  coverImage={blurredPhotos}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
