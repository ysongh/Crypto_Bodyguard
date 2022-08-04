import React, { useState }  from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar({ ethAddress, navbarMode, chainName }) {
  const router = useRouter();

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
              <button className="py-2 px-4 text-white bg-blue-600 rounded-full baseline hover:bg-blue-400">
                {ethAddress ? ethAddress.substring(0,8) + "..." + ethAddress.substring(34,42) : "Connect to Wallet"}
              </button>
            </div>
        }
      </div>
    </nav>
  )
}

export default Navbar