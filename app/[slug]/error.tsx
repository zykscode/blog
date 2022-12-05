'use client';

import { Boundary } from '#/components/Boundary';
import Button from '#/components/Button';
import React from 'react';

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.log('logging error:', error);
  }, [error]);

  return (
    <Boundary labels={['Home page Error UI']} color="pink">
      <div className="space-y-4">
        <div className="text-sm text-vercel-pink">
          <h1>Under construction </h1>
        </div>
        <div>
          <Button onClick={() => reset()}>Try Again</Button>
        </div>
      </div>
    </Boundary>
  );
}
