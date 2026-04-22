'use client';

import Script from 'next/script';

type AdSenseTypes = {
  pubId: string;
};

export default function AdSense(pubId: AdSenseTypes) {
  return (
    <Script
      async
      src={`https://pagead2.google.syncdication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pubId}`}
      crossOrigin='anonymous'
    />
  );
}
