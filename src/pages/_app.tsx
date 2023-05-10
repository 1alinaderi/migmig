import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
// import { Fira_Code } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from 'react-query';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';
import 'overlayscrollbars/overlayscrollbars.css';
import { EthereumClient, w3mConnectors, w3mProvider ,  } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { Web3Button } from '@web3modal/react'
import { ToastContainer , toast  } from 'react-toastify';
import { bsc } from 'wagmi/chains'
import 'react-toastify/dist/ReactToastify.css';
// base css file
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { useState } from 'react';
import { useEffect  } from 'react';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useContext } from "react"

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// const firaCode = Fira_Code({
//   weight: ['400', '500', '700'],
//   style: ['normal'],
//   subsets: ['latin'],
//   variable: '--font-body',
// });

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);
  const projectId = "40d32fc2d453be44a687f19f10303cb9";
  const [queryClient] = useState(() => new QueryClient());
  const chains = [bsc]


  const { provider } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiClient = createClient({
    autoConnect:true ,
    connectors: w3mConnectors({ projectId, version: 1 , chains }),
    provider
  })
  const ethereumClient = new EthereumClient(wagmiClient, chains)


  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>Criptic - React Next Web3 NFT Crypto Dashboard Template</title>
      </Head>
      <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <WalletProvider>
        
            {/* <div className={`${firaCode.variable} font-body`}> */}
            {getLayout(<Component  {...pageProps} />)}
            <SettingsButton />
            <SettingsDrawer />
            <ModalsContainer />
            <DrawersContainer />
            {/* </div> */}
          </WalletProvider>
        </ThemeProvider>
        <ToastContainer position="top-center" />
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient}  />
        </WagmiConfig>
      </QueryClientProvider>
      
    </>
  );
}

export default CustomApp;
