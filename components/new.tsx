import React, { useState } from 'react';

import { IoMail } from '@react-icons/all-files/io5/IoMail';
import { HiOutlineCloudUpload} from '@react-icons/all-files/hi/HiOutlineCloudUpload';
import { MdOutlineWbCloudy } from 'react-icons/md';
import { IoCloudSharp } from 'react-icons/io5';


type Props = {}

const New = (props: Props) => {
  return (
    <div>
      <HiOutlineCloudUpload/>
      <MdOutlineWbCloudy/>
      <IoCloudSharp/>
    </div>
  )
}

export default New
