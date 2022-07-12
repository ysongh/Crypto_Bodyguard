import React from 'react';

function index() {
  return (
    <div className="h-full">
      <div className="bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url(/hero-img.png)", height: "677px"}}>
        <div style={{ background: "rgba(0,0,0,0.3)", height: "inherit"}}>
          <h1 className="text-center text-6xl pt-56 text-white">
            Your safety is very important
          </h1>
          <p className="text-center text-2xl mt-5 mb-6 text-white">
            Hire a bodyguard and pay them with Crypto
          </p>
          <center>
            <button className="py-4 px-6 text-white bg-teal-600 rounded baseline hover:bg-blue-400">
              Get Started
            </button>
          </center>
        </div>
      </div>
    </div>
  )
}

export default index;