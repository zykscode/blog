import Image, { StaticImageData } from 'next/image'
import React from 'react'

type Props = {
    img:StaticImageData
}

const CoverWrapper = ({img}: Props) => {
  return (
    <div className='page-cover-wrapper'>
        <Image className='page-cover' src={img} alt='page cover wrapper' height={img.height} width={img.width} placeholder='blur'/>
    </div>
  )
}

export default CoverWrapper