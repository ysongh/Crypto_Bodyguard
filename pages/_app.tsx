import React, { useState } from 'react';
import '../styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app'

import Head from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';

function AppWrapper({ Component, pageProps }: AppProps) {
  const [ethAddress, setETHAddress] = useState('');
  const [userSigner, setUserSigner] = useState(null);
  const [cbContract, setCBContract] = useState(null);
  const [navbarMode, setNavbarMode] = useState("");
  const [chainName, setChainName] = useState('');
  const [sfMethods, setsfMethods] = useState(null);
  const [domainData, setDomainData] = useState(null);

  return <div>
    <Head title="Crypto Bodyguard" />
    <Navbar
      ethAddress={ethAddress}
      navbarMode={navbarMode}
      chainName={chainName}
      setNavbarMode={setNavbarMode} />
    <Component
      {...pageProps}
      ethAddress={ethAddress}
      cbContract={cbContract}
      userSigner={userSigner}
      setNavbarMode={setNavbarMode}
      setETHAddress={setETHAddress}
      setCBContract={setCBContract}
      setUserSigner={setUserSigner}
      setChainName={setChainName}
      sfMethods={sfMethods}
      setsfMethods={setsfMethods}
      domainData={domainData}
      setDomainData={setDomainData} />
  </div>
  
}

export default AppWrapper
