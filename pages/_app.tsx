import React, { useState } from 'react';
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app'
import Navbar from '../components/layout/Navbar';

function AppWrapper({ Component, pageProps }: AppProps) {
  const [ethAddress, setETHAddress] = useState('');
  const [userSigner, setUserSigner] = useState(null);
  const [cbContract, setCBContract] = useState(null);
  const [navbarMode, setNavbarMode] = useState("");

  return <div>
    <Navbar
      ethAddress={ethAddress}
      setETHAddress={setETHAddress}
      setCBContract={setCBContract}
      setUserSigner={setUserSigner}
      navbarMode={navbarMode} />
    <Component {...pageProps} ethAddress={ethAddress} cbContract={cbContract} userSigner={userSigner} setNavbarMode={setNavbarMode}/>
  </div>
  
}

export default AppWrapper
