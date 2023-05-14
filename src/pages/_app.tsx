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
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { ToastContainer, toast } from 'react-toastify';
import { bsc } from 'wagmi/chains';
import 'react-toastify/dist/ReactToastify.css';
// base css file
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useContext } from 'react';

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
  const [queryClient] = useState(() => new QueryClient());
  const projectId = '2394c0eb2a66dd5e1eb4990b22d6502a';
  const chains = [bsc];

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ version: 1, chains, projectId }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>MigMig</title>
        <link rel="icon" href={'/logo.png'} />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <WagmiConfig config={wagmiConfig}>
            {/* <div className={`${firaCode.variable} font-body`}> */}
            {getLayout(
              <Component ethereumClient={ethereumClient} {...pageProps} />
            )}
            <SettingsButton />
            <SettingsDrawer />
            <ModalsContainer />
            <DrawersContainer />
            {/* </div> */}
          </WagmiConfig>
        </ThemeProvider>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        <ToastContainer position="top-center" />
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
