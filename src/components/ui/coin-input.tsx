import type { CoinTypes } from '@/types';
import { useState, useRef } from 'react';
import cn from 'classnames';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { coinList } from '@/data/static/coin-list';
// dynamic import

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  exchangeRate?: number;
  defaultCoinIndex?: number;
  className?: string;
  getCoinValue: (param: { coin: string; value: string }) => void;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function CoinInput({
  label,
  getCoinValue,
  defaultCoinIndex = 0,
  exchangeRate,
  className,
  ...rest
}: CoinInputTypes) {
  let [value, setValue] = useState('');
  let [selectedCoin, setSelectedCoin] = useState(coinList[defaultCoinIndex]);
  let [visibleCoinList, setVisibleCoinList] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });
  useLockBodyScroll(visibleCoinList);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(decimalPattern)) {
      setValue(event.target.value);
      let param = { coin: selectedCoin.code, value: event.target.value };
      getCoinValue && getCoinValue(param);
    }
  };
  function handleSelectedCoin(coin: CoinTypes) {
    setSelectedCoin(coin);
    setVisibleCoinList(false);
  }
  return (
    <>
      <div
        className={cn(
          'group flex min-h-[60px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600',
          className
        )}
      >
        <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
          <button className="flex items-center font-medium outline-none dark:text-gray-100">
            <img
              style={{ maxWidth: '28px' }}
              src={label === 'MIGMIG' ? '/logo.png' : '/BNB.png'}
            />
            <span className="ltr:ml-2 rtl:mr-2">
              {label === 'MIGMIG' ? (
                <>
                  MIG
                  <br />
                  MIG
                </>
              ) : (
                label
              )}{' '}
            </span>
          </button>
        </div>
        <div className="flex flex-1 flex-col text-right">
          <input
            type="text"
            placeholder="0.0"
            className="w-full rounded-br-lg rounded-tr-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
          />
          <span className="font-xs px-3 text-gray-400"></span>
        </div>
      </div>
    </>
  );
}

CoinInput.displayName = 'CoinInput';
