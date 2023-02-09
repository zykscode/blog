import Image from 'next/image';
import React from 'react';

import type { BlurredPhoto } from '#/lib/types';

type Props = {
  img: BlurredPhoto;
};

const CoverWrapper = ({ img }: Props) => {
  return (
    <div className="page-cover-wrapper">
      <Image
        priority={true}
        className="page-cover"
        src={img}
        alt="page cover wrapper"
        height={img.height}
        width={img.width}
        placeholder="blur"
        blurDataURL={img.base64}
      />
    </div>
  );
};

export default CoverWrapper;
