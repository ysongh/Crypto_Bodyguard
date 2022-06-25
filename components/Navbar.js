import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
          </ul>
          <button className="btn btn-outline-success" type="submit">Connect to Wallet</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar