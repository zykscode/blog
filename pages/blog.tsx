
import { getAllFilesFrontMatter } from '#/lib/mdx';
import { getPlaiceholder, IGetPlaiceholderReturn } from 'plaiceholder';
import { PageSEO } from '#/components/SEO';
import { siteMetadata } from '#/data/siteMetadata';
import ListLayout from '#/layouts/ListLayout';


const MAX_DISPLAY = 5;

const blurImages = async (photo: any) => {
  const { base64, img } = await getPlaiceholder(photo);
  return {
    ...img,
    base64,
  };
};

export async function getStaticProps() {
  let posts = await getAllFilesFrontMatter('blog');
  const newPosts = await Promise.all(posts.map(async (post) => {
    if (post.images) {
      const blurredImages = await Promise.all(post.images.map(async (image: string | Buffer) => {
        return await blurImages(image);
      }));
      return { ...post, images: blurredImages };
    } else {
      return post;
    }
  }));
 
  return { props: { newPosts } };
}


export default function Home({ newPosts }) {
  return (
    <>
    <PageSEO title={`${siteMetadata.author}'s blog`} description={siteMetadata.description}/>
   <ListLayout posts={newPosts}/>
    </>
  );
}
