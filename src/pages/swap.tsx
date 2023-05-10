import { useState, useEffect } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Trade from '@/components/ui/trade';
import RootLayout from '@/layouts/_root-layout';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Web3 from 'web3';
import { AbiRouterContract, AbiToken } from '../abi/abi';
import { ToastContainer, toast } from 'react-toastify';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useContext } from 'react';

const SwapPage: NextPageWithLayout = () => {
  const { address } = useContext(WalletContext);
  const [isapproved, setisapproved] = useState(false);
  const [price, setPrice] = useState();
  const [priceaipepe, setPriceeipepe] = useState();
  const [BNBinput, setBNBinput] = useState();
  const [aipepeinput, setaipepeinput] = useState();
  const [BNBTOAIPEPE, setBNBTOAIPEPE] = useState(true);
  let [toggleCoin, setToggleCoin] = useState(true);
  const web3 = new Web3(Web3.givenProvider);

  const aipepeAddress = '0xd6Fe5b323E4997d34B3e32592136506eb1150228';
  const RouterAddress = '0x10ed43c718714eb63d5aa57b78b54704e256024e';
  const WBNBAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';

  const Aipepecontract = new web3.eth.Contract(AbiToken, aipepeAddress);
  const Routercontract = new web3.eth.Contract(
    AbiRouterContract,
    RouterAddress
  );

  useEffect(() => {
    const sellAmount = 10 ** 18; // 100 DAI = 10^20 wei
    const sellAmountaipepe = 10 ** 9; // 100 DAI = 10^20 wei
    async function giveInformation() {
      const response = await fetch(
        `https://bsc.api.0x.org/swap/v1/quote?buyToken=${aipepeAddress}&sellToken=${WBNBAddress}&sellAmount=${sellAmount}&excludedSources=LiquidityProvider`
      );
      const quote = await response.json();
      setPrice(quote.price);
    }
    async function giveInformationaipepe() {
      const response = await fetch(
        `https://bsc.api.0x.org/swap/v1/quote?buyToken=${WBNBAddress}&sellToken=${aipepeAddress}&sellAmount=${sellAmountaipepe}&excludedSources=LiquidityProvider`
      );
      const quote = await response.json();
      setPriceeipepe(quote.price);
    }
    giveInformation();
    giveInformationaipepe();
  }, []);
  async function _BNBtoAipepe() {
    // Perform the swap.
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await Routercontract?.methods
      ?.swapExactETHForTokens(
        0,
        [WBNBAddress, aipepeAddress],
        address,
        Math.floor(Date.now() / 1000) + 60 * 5
      )
      .estimateGas({
        from: address,
        value: BNBinput * 1000000000000000000,
      })
      .then((e) => {
        toast.success(e.message);
      })
      .catch((e) => {
        toast.error(e.message);
      });
    await Routercontract?.methods
      ?.swapExactETHForTokens(
        0,
        [WBNBAddress, aipepeAddress],
        address,
        Math.floor(Date.now() / 1000) + 60 * 5
      )
      .send({
        from: address,
        gas: gas,
        value: BNBinput * 1000000000000000000,
        gasPrice: gasPrice,
        chainId: 56,
      })
      .then((e) => {
        toast.success(e.message);
      })
      .catch((e) => {
        toast.error(e.message);
        return;
      });
  }

  async function _AipepeToBNB() {
    // Perform the swap.
    const currentAllowance = await Aipepecontract.methods
      .allowance(address, RouterAddress)
      .call();
    if (currentAllowance < aipepeinput * 1000000000) {
      const newAllowance = new web3.utils.BN('2')
        .pow(new web3.utils.BN('256'))
        .sub(new web3.utils.BN('1'));
      const gasAprrroved = await Aipepecontract.methods
        .approve(RouterAddress, newAllowance)
        .estimateGas({ from: address });
      await Aipepecontract.methods
        .approve(RouterAddress, newAllowance)
        .send({ from: address, gas: gasAprrroved })
        .then((e) => {
          setisapproved(true);
          toast.success('Approved success');
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
    const gasPrice = await web3.eth.getGasPrice();
    const gas = await Routercontract?.methods
      ?.swapExactTokensForETH(
        aipepeinput * 1000000000,
        0,
        [aipepeAddress, WBNBAddress],
        address,
        Math.floor(Date.now() / 1000) + 60 * 5
      )
      .estimateGas({
        from: address,
      });
    if (isapproved) {
      await Routercontract?.methods
        ?.swapExactTokensForETH(
          aipepeinput * 1000000000,
          0,
          [aipepeAddress, WBNBAddress],
          address,
          Math.floor(Date.now() / 1000) + 60 * 5
        )
        .send({
          from: address,
          gas: gas,
          gasPrice: gasPrice,
          chainId: 56,
        })
        .then((e) => {
          toast.success(e.message);
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
  }
  return (
    <>
      <NextSeo
        title="Swap"
        description="MIGMIG - React Next Web3 NFT Crypto Dashboard Template"
      />
      <Trade>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div className={cn('relative flex flex-col gap-3')}>
            {toggleCoin ? (
              <div
                className={cn(
                  'group flex min-h-[60px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600'
                )}
              >
                <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
                  <button className="flex items-center font-medium outline-none dark:text-gray-100">
                    <img style={{ maxWidth: '28px' }} src="/BNB.png" />
                    <span className="ltr:ml-2 rtl:mr-2">BNB </span>
                  </button>
                </div>
                <div className="flex flex-1 flex-col text-right">
                  <input
                    value={BNBinput}
                    onChange={(e) => setBNBinput(e.target.value)}
                    type="text"
                    placeholder="0.0"
                    className="input_token w-full rounded-br-lg rounded-tr-lg border-0 pb-0 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
                  />
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  'group flex min-h-[60px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600'
                )}
              >
                <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
                  <button className="flex items-center font-medium outline-none dark:text-gray-100">
                    <img style={{ maxWidth: '28px' }} src="/logo.png" />
                    <span className="ltr:ml-2 rtl:mr-2">
                      MIG
                      <br />
                      MIG
                    </span>
                  </button>
                </div>
                <div className="flex flex-1 flex-col text-right">
                  <input
                    value={aipepeinput}
                    onChange={(e) => setaipepeinput(e.target.value)}
                    type="text"
                    placeholder="0.0"
                    className="input_token w-full rounded-br-lg rounded-tr-lg border-0 pb-0 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
                  />
                </div>
              </div>
            )}
            <div className="absolute left-1/2 top-1/2 z-[1] -ml-4 -mt-4 rounded-full bg-white shadow-large dark:bg-gray-600">
              <Button
                size="mini"
                color="gray"
                shape="circle"
                variant="transparent"
                onClick={() => setToggleCoin(!toggleCoin)}
              >
                <SwapIcon className="h-auto w-3" />
              </Button>
            </div>
            {toggleCoin ? (
              <div
                className={cn(
                  'group flex min-h-[60px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600'
                )}
              >
                <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
                  <button className="flex items-center font-medium outline-none dark:text-gray-100">
                    <img style={{ maxWidth: '28px' }} src="/logo.png" />
                    <span className="ltr:ml-2 rtl:mr-2">
                      MIG
                      <br />
                      MIG{' '}
                    </span>
                  </button>
                </div>
                <div className="flex flex-1 flex-col text-right">
                  <input
                    value={BNBinput ? (BNBinput * price).toFixed(9) : ''}
                    disabled
                    type="text"
                    placeholder="0.0"
                    className="input_token w-full rounded-br-lg rounded-tr-lg border-0 pb-0 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
                  />
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  'group flex min-h-[60px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600'
                )}
              >
                <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
                  <button className="flex items-center font-medium outline-none dark:text-gray-100">
                    <img style={{ maxWidth: '28px' }} src="/BNB.png" />
                    <span className="ltr:ml-2 rtl:mr-2">BNB</span>
                  </button>
                </div>
                <div className="flex flex-1 flex-col text-right">
                  <input
                    value={
                      aipepeinput ? (aipepeinput * priceaipepe).toFixed(18) : ''
                    }
                    disabled
                    type="text"
                    placeholder="0.0"
                    className="input_token w-full rounded-br-lg rounded-tr-lg border-0 pb-0 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex flex-col gap-4 xs:gap-[18px]">
          <TransactionInfo label={'Min. Received'} />
          <TransactionInfo label={'Rate'} />
          <TransactionInfo label={'Offered by'} />
          <TransactionInfo label={'Price Slippage'} value={'1%'} />
          <TransactionInfo label={'Network Fee'} />
          <TransactionInfo label={'Criptic Fee'} />
        </div> */}
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          {toggleCoin ? (
            <button
              style={{ width: '100%', height: '100%' }}
              onClick={(e) => {
                _BNBtoAipepe();
              }}
            >
              SWAP
            </button>
          ) : (
            <button
              style={{ width: '100%', height: '100%' }}
              onClick={(e) => {
                _AipepeToBNB();
              }}
            >
              {isapproved ? 'SWAP' : 'APPROVE'}
            </button>
          )}
        </Button>
      </Trade>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default SwapPage;
