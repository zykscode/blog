import React from 'react'
import Image from 'next/image'
import { BlurredImages } from '#/lib/types';

type BlogImageProps = {
    src:BlurredImages|undefined;
    alt:string
}

function BlogImage({ src, alt}:BlogImageProps) {
    return (
        <Image
            alt={alt}
            width={src!.width}
            height={src!.height}
            src={src!.src}
            placeholder="blur"
            blurDataURL={src!.base64}
        />
    )
}

export default BlogImage