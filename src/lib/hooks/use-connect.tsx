/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, ReactNode } from 'react';
import { ethers } from 'ethers';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { Web3Button } from '@web3modal/react';
import { bsc } from 'wagmi/chains';
import { useWeb3Modal } from '@web3modal/react';

const web3modalStorageKey = 'WEB3_CONNECT_CACHED_PROVIDER';

export const WalletContext = createContext<any>({});

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { setDefaultChain } = useWeb3Modal();

  const chains = [bsc];
  const projectId = '2394c0eb2a66dd5e1eb4990b22d6502a';

  const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
  });
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  /* This effect will fetch wallet address if user has already connected his/her wallet */
  useEffect(() => {
    setAddress(ethereumClient.getAccount().address);
    setDefaultChain(bsc);
    console.log(address);
  }, [ethereumClient]);

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        loading,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
