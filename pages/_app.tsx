import React, { useState } from 'react';
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';

function AppWrapper({ Component, pageProps }: AppProps) {
  const [ethAddress, setETHAddress] = useState('');
  const [userSigner, setUserSigner] = useState(null);
  const [cbContract, setCBContract] = useState(null);

  return <div>
    <Navbar ethAddress={ethAddress} setETHAddress={setETHAddress} setCBContract={setCBContract} setUserSigner={setUserSigner} />
    <Component {...pageProps} ethAddress={ethAddress} cbContract={cbContract} userSigner={userSigner} />
  </div>
  
}

export default AppWrapper
