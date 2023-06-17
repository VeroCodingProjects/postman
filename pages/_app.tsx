import '../public/styles/global.css';
import type { AppProps } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return <Component {...pageProps} />;
}
