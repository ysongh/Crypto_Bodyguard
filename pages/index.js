import React from 'react';

function index() {
  return (
    <div className="h-full">
      <div className="block bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url(/hero-img.png)", height: "677px"}}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-brightness-50 py-8 px-4 rounded-lg" style={{maxWidth: "650px"}}>
          <h1 className="text-center text-5xl text-white uppercase">
            Your safety is very important
          </h1>
          <p className="text-center text-2xl mt-5 mb-6 text-white ">
            Hire a bodyguard and pay them with Crypto
          </p>
          <center>
            <button className="py-4 px-6 text-white bg-blue-600 rounded baseline hover:bg-blue-400">
              Get Started
            </button>
          </center>
        </div>
      </div>
    </div>
  )
}

export default index;