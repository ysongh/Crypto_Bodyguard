import React, { useState }  from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import {
  CB_ABI,
  RINKEBY_CB_Address,
  CB_Address,
  OP_K_CB_Address,
  POLYGON_ADDRESS
} from '../../config';

function Navbar({ ethAddress, setETHAddress, setCBContract, setUserSigner, navbarMode }) {
  const router = useRouter();

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
      setChainName("Rinkeby");
    }
    else if(chainId === 69){
      const contract = new ethers.Contract(OP_K_CB_Address, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Optimistic Kovan")
    }
    else if(chainId === 31949730){
      const contract = new ethers.Contract(CB_Address, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Skale");
    }
    else if(chainId === 80001){
      const contract = new ethers.Contract(POLYGON_ADDRESS, CB_ABI, signer);
      setCBContract(contract);
      setChainName("Polygon Testnet");
    }
    else{
      alert("No contract for this network");
    }

  }

  return (
    <nav className="relative container mx-auto p-2">
      <div className="flex items-center justify-between">
        <div className="pt-2">
          <Link className="navbar-brand" href="/">
            <img className="h-12 cursor-pointer" src="/logo.png" alt="Logo" />
          </Link>
        </div>

        {navbarMode === ""
          && <div className="hidden md:flex space-x-5">
          <Link href="/" className="hover:text-blue">Home</Link>
        </div>}
        {navbarMode === "user"
          && <div className="hidden md:flex space-x-5">
          <Link href="/" className="hover:text-blue">Home</Link>
          <Link href="/listofbodyguard">List Of Bodyguard</Link>
          <Link href="/map">Map</Link>
        </div>}
        {navbarMode === "bodyguard"
          && <div className="hidden md:flex space-x-5">
          <Link href="/" className="hover:text-blue">Home</Link>
          <Link href="/signup">Profile</Link>
          <Link href="/map">Map</Link>
        </div>}
        
        {navbarMode === ""
          ?  <button className="py-2 px-4 text-white bg-blue-600 rounded-full baseline hover:bg-blue-400" onClick={() => router.push(`/main`)}>
            Launch App
          </button>
          : <div className="flex">
              {chainName && <span className="py-2 px-4 font-semibold italic mr-1">{chainName}</span>}
              <button className="py-2 px-4 text-white bg-blue-600 rounded-full baseline hover:bg-blue-400" onClick={openWithMetaMask}>
                {ethAddress ? ethAddress.substring(0,8) + "..." + ethAddress.substring(34,42) : "Connect to Wallet"}
              </button>
            </div>
        }
      </div>
    </nav>
  )
}

export default Navbar