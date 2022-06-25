import React, { useState } from 'react';
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';

function AppWrapper({ Component, pageProps }: AppProps) {
  const [ethAddress, setETHAddress] = useState('');
  const [cbContract, setCBContract] = useState(null);

  return <div>
    <Navbar ethAddress={ethAddress} setETHAddress={setETHAddress} setCBContract={setCBContract}/>
    <Component {...pageProps} />
  </div>
  
}

export default AppWrapper
