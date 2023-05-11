import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { Plus } from '@/components/icons/plus';
import ActiveLink from '@/components/ui/links/active-link';
import Trade from '@/components/ui/trade';
import RootLayout from '@/layouts/_root-layout';

const LiquidityPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Liquidity"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <Trade>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div className="relative flex flex-col gap-3">
            <CoinInput
              label={'BNB'}
              exchangeRate={0.0}
              defaultCoinIndex={0}
              getCoinValue={(data) => console.log('From coin value:', data)}
            />
            <div className="absolute left-1/2 top-1/2 z-[1] -ml-4 -mt-4 rounded-full bg-white shadow-large dark:bg-gray-600">
              <Button
                size="mini"
                color="gray"
                shape="circle"
                variant="transparent"
              >
                <Plus className="h-auto w-3" />
              </Button>
            </div>
            <CoinInput
              label={'MIGMIG'}
              exchangeRate={0.0}
              defaultCoinIndex={1}
              getCoinValue={(data) => console.log('To coin value:', data)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 xs:gap-[18px]">
          <TransactionInfo label={'0 MIGMIG per BNB'} value={'0%'} />
          <TransactionInfo label={'0 BNB per MIGMIG'} value={'Share of Pool'} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 xs:mt-8">
          <ActiveLink href="/liquidity-position">
            <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              className="uppercase"
            >
              Approve MIGMIG
            </Button>
          </ActiveLink>
          <ActiveLink href="/liquidity-position">
            <Button
              size="large"
              shape="rounded"
              fullWidth={true}
              className="uppercase"
            >
              Approve BNB
            </Button>
          </ActiveLink>
        </div>
      </Trade>
    </>
  );
};

LiquidityPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default LiquidityPage;
