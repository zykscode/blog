import React from 'react'
import Image from 'next/image'

function BlogImage({ src, alt }) {
    return (
        <Image
            alt={alt}
            width={src.width}
            height={src.height}
            src={src.src}
            placeholder="blur"
            blurDataURL={src.base64}
        />
    )
}

export default BlogImage