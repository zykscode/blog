import { BlurredImages } from '#/lib/types'
import Image from 'next/image'
import React from 'react'

type Props = {
    img:BlurredImages
}

const CoverWrapper = ({img}: Props) => {
  return (
    <div className='page-cover-wrapper'>
        <Image className='page-cover' src={img} alt='page cover wrapper' height={img.height} width={img.width} placeholder='blur' blurDataURL={img.base64}/>
    </div>
  )
}

export default CoverWrapper