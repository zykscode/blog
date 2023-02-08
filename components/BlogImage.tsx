import Image from 'next/image';
import React from 'react';

import type { BlurredPhoto } from '#/lib/types';

function BlogImage({ imgSrc, alt }: { imgSrc: BlurredPhoto; alt: string }) {
  const { width, base64, src } = imgSrc;
  return (
    <>
      <Image
        src={src}
        width={width}
        height={width}
        alt={alt}
        placeholder="blur"
        blurDataURL={base64}
      />
    </>
  );
}

export default BlogImage;
