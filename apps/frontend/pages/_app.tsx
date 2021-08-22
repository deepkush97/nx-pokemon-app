import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pokemon Explorer</title>
      </Head>
      <div className="h-screen w-screen bg-gradient-to-br from-blue-800 via-purple-400 to-pink-700 animate-gradient-x">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default CustomApp;
