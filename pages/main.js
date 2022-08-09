import React from 'react';
import { useRouter } from 'next/router';

import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import {
  CB_ABI,
  RINKEBY_CB_Address,
  CB_Address,
  OP_K_CB_Address,
  POLYGON_ADDRESS
} from '../config';

function main({ setNavbarMode, setETHAddress, setCBContract, setUserSigner, setChainName }) {
  const router = useRouter();

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

  const selectUser = () => {
    openWithMetaMask();
    setNavbarMode("user");
    router.push(`/listofbodyguard`)
  }

  const selectBodyguard = () => {
    openWithMetaMask();
    setNavbarMode("bodyguard");
    router.push(`/signup`);
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-20 mx-32 mt-10">
        <div className='col-6'>
          <div className="bg-white rounded shadow">
            <div className="p-3">
              <h2 className="text-4xl mb-2">
                For User
              </h2>
              <p className="text-gray-500 mb-3">
                Find a bodyguard who can protect you
              </p>
              <button className="py-2 px-4 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full"  onClick={selectUser}>
                Find 
              </button>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className="bg-white rounded shadow">
            <div className="p-3">
            <h2 className="text-4xl mb-2">
                For BodyGuard
              </h2>
              <p className="text-gray-500 mb-3">
                Sign up to be a bodyguard and protect someone
              </p>
              <button className="py-2 px-4 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full"  onClick={selectBodyguard}>
                Sign Up 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default main