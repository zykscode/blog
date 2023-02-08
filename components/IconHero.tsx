import Image from 'next/image';
import React from 'react';

import Me from '#/public/static/images/me.jpg';

const IconHero = () => {
  return (
    <div className="page-icon-hero page-icon-image">
      <Image className="page-icon" alt="zyk" src={Me} />
    </div>
  );
};

export default IconHero;
