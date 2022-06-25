import React  from 'react';
import Link from 'next/link';
import Web3 from 'web3';

import { CB_ABI, CB_Address } from '../config';

function Navbar({ ethAddress, setETHAddress, setCBContract }) {
  
  const openWithMetaMask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      await window.ethereum.enable();
      loadBlockchain();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      loadBlockchain();
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  const loadBlockchain = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setETHAddress(accounts[0]);

    const contract = new web3.eth.Contract(CB_ABI,CB_Address);
    setCBContract(contract);
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/">Crypto Bodyguard</Link>
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
          </ul>
          <button className="btn btn-outline-success" onClick={openWithMetaMask}>
            {ethAddress ? ethAddress.substring(0,8) + "..." + ethAddress.substring(34,42) : "Connect to Wallet"}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar