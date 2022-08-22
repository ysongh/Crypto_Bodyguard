import React, { useState }  from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar({ ethAddress, navbarMode, chainName, setNavbarMode }) {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);

  const signOut = () => {
    router.push("/");
    setNavbarMode("");
    setShowMenu(false);
  }

  return (
    <nav className="relative p-2 bg-white">
      <div className="container mx-auto">
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
            <Link href="/profile">Profile</Link>
            <Link href="/map">Map</Link>
          </div>}
          
          {navbarMode === ""
            ?  <button className="py-2 px-4 text-white bg-blue-600 rounded-full baseline hover:bg-blue-400" onClick={() => router.push(`/main`)}>
              Launch App
            </button>
            : <div className="flex">
                {chainName && <span className="py-2 px-4 font-semibold italic mr-1">{chainName}</span>}
                {ethAddress
                  ? <div className="ml-3 relative">
                      <button className="py-2 px-4 text-white bg-blue-600 rounded-full baseline hover:bg-blue-400"  onClick={() => setShowMenu(!showMenu)}>
                        {ethAddress.substring(0,8) + "..." + ethAddress.substring(34,42)}
                      </button>
                      
                      {showMenu && <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                        <button className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1" onClick={signOut}>
                          Sign Out
                        </button>
                      </div>}
                    </div>
                  : <button className="py-2 px-4 text-white bg-blue-600 rounded-full baseline hover:bg-blue-400">
                      Connect to Wallet
                    </button>
                }
              </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar