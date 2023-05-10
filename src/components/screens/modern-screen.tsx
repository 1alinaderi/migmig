import { NextSeo } from 'next-seo';

//images
import AuthorImage from '@/assets/images/author.jpg';
import SwapPage from '@/pages/swap';

export default function ModernScreen() {
  return (
    <>
      <NextSeo
        title="MIGMIG"
        description="MIGMIG - React Next Web3 NFT Crypto Dashboard Template"
      />
      <SwapPage />
    </>
  );
}
