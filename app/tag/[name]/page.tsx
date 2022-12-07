import Aside from "#/components/Aside";
import Container from "#/components/Container";
import PostCard from "#/components/PostCard";
import { getTagPosts, getTagsPaths } from "#/services/Index";
import Me from '#/public/static/images/me.jpg';
import { getPlaiceholder } from "plaiceholder";

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


const fetchData = async (params:{name:string}) => {
    const { tag } = await getTagPosts(params);
    const { posts} = tag
    const blurredPhotos = await blurImages(posts);
    return { blurredPhotos, posts ,tag};
  };

export async function generateStaticParams() {
    const slugRes = await getTagsPaths();
    const tags = slugRes.tags;
  
    return tags.map((tag) => ({
      name: tag.name,
    }));
  }

export default async function Home({params}:{params:{name:string}}) {
    const { blurredPhotos, tag, posts } = await fetchData(params);
    return (
      <Container coverWrapper={Me} tag={tag.name}>
        <div className="page-content page-content-has-aside">
          <article className="page-content-inner">
            <div className="collection block">
              <div className="gallery">
                <div className="gallery-view">
                  <div className="gallery-grid gallery-grid-size-medium">
                    {posts.map((post) => (
                      <PostCard
                        key={post.slug}
                        post={post}
                        coverImages={blurredPhotos}
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