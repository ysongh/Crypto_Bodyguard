import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';

function AppWrapper({ Component, pageProps }: AppProps) {
  return <div>
    <Navbar />
    <Component {...pageProps} />
  </div>
  
}

export default AppWrapper
