import { PageSEO } from '#/components/SEO';
import type { BlurredPhoto } from '#/lib/types';
import { getTagPosts, getTagsPaths } from '#/services';

// const blurImage = async (photo: CoverImage) => {
//   const image = await getPlaiceholder(photo.url);

//   return image;
// };

export async function getStaticProps({ params }: { params: any }) {
  const { tag } = await getTagPosts({ params });
  //   const blurredImage = await blurImage(tag.coverPhoto);

  return {
    props: {
      tag,
      // blurredImage,
    },
  };
}

export async function getStaticPaths() {
  const { tags } = await getTagsPaths();

  return {
    paths: tags.map(({ slug }: { slug: string }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

function TagPosts({
  tag,
}: // blurredImage,
{
  tag: any;
  blurredImage?: BlurredPhoto;
}) {
  console.log(tag, 'tagsggajsbx xshjasgahsgaj');
  return (
    <>
      <PageSEO title={''} description={''} />
      <h1>weyre xxxkxkxkxxxxxxxxx</h1>
    </>
  );
}

export default TagPosts;
