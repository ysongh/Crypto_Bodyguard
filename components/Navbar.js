import React, { useState }  from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import {
  CB_ABI,
  RINKEBY_CB_Address,
  CB_Address,
  OP_K_CB_Address
} from '../config';

function Navbar({ ethAddress, setETHAddress, setCBContract, setUserSigner }) {
  const [chainName, setChainName] = useState('');

  const openWithMetaMask = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);
    const { chainId } = await provider.getNetwork();

    const signer = provider.getSigner();
    setUserSigner(signer);
    const address = await signer.getAddress();
    setETHAddress(address);

    if(chainId === 4){
      const contract = new ethers.Contract(RINKEBY_CB_Address, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Rinkeby")
    }
    else if(chainId === 69){
      const contract = new ethers.Contract(OP_K_CB_Address, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Optimistic Kovan")
    }
    else if(chainId === 31949730){
      const contract = new ethers.Contract(CB_Address, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Skale")
    }
    else{
      alert("No contract for this network");
    }

  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/"><img className="h-12 w-auto" src="/logo.png" alt="Logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page">
                <Link href="/">Home</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page">
                <Link href="/chat">Chat</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page">
                <Link href="/signup">Signup</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page">
                <Link href="/map">Map</Link>
              </a>
            </li>
          </ul>
          {chainName &&  <h5><span className="badge bg-primary mt-2 me-3">{chainName}</span></h5>}
          <button className="btn btn-outline-success" onClick={openWithMetaMask}>
            {ethAddress ? ethAddress.substring(0,8) + "..." + ethAddress.substring(34,42) : "Connect to Wallet"}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar