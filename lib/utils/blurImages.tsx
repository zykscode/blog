import { getPlaiceholder } from "plaiceholder";

export const blurPhotos = async (photos:string[]) =>{
    const images = await Promise.all(
        photos.map(
            async (image) => {
              const { base64, img } = await getPlaiceholder(image);
              return {
                ...img,
                base64,
              };
            },
          ),
    )
    return images
}

