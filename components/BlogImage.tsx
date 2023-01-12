import React from 'react'
import Image from 'next/image'
import { BlurredImages } from '#/lib/types';

type BlogImageProps = {
    src:string;
    alt:string
}

function BlogImage({ src, alt}:BlogImageProps) {
    console.log(src)
    return (
        <Image
            alt={alt}
            src={src[0]}
        />
    )
}

export default BlogImage