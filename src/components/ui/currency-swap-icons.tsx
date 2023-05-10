import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';

export type CoinList = 'BNB';

interface CurrencySwapIconsProps {
  from: String;
  to: String;
  showImage : Number
}

export default function CurrencySwapIcons({
  from,
  to,
  showImage
}: CurrencySwapIconsProps) {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="relative">
        {showImage === 1 ? <Bnb/> : "" || showImage === 2 ? <img src="/Busd.png" alt="Criptic"  width={28} /> : ""}
     
        </div>
        <div className="ltr:-ml-1.5 rtl:-mr-1.5">
        {showImage && <img src="/logo.png" alt="Criptic"  width={28} />}
        </div>
      </div>
      <div className="whitespace-nowrap text-sm font-medium uppercase text-black ltr:ml-3 rtl:mr-3 dark:text-white">
        {from}-{to}
      </div>
    </div>
  );
}
