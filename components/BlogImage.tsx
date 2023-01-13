import React from 'react';
import Image from 'next/image';
import { BlurredImages } from '#/lib/types';
import { blurPhotos } from '#/lib/utils/blurImages';



function BlogImage({ img,alt }: {img:BlurredImages, alt:string}) {
const {width,base64,height,src} =img
  return (
    <>
  
      <Image src={src} width={width} height={width} alt={alt} placeholder='blur' blurDataURL={base64}/>
    </>
  );
}

export default BlogImage;
