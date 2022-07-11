import React, { useEffect, useState } from 'react';
import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3STORAGE_APIKEY });

function Signup({ ethAddress, cbContract}) {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionUrl, setTransactionUrl] = useState('');
  const [guardData, setGuardData] = useState({});
  
  const [location, setLocation] = useState();

  useEffect(() => {
    if(cbContract) getBodyGuard();
  }, [cbContract])
  
  async function getBodyGuard() {
    const total = await cbContract.bodyGuardCount();

    for(let i = 1; i <= total; i++){
      const data = await cbContract.bodyGuardList(i);
      console.log(data);
      if(data.from === ethAddress){
        setGuardData(data);
      }
    }
  }

  async function handleUpload(event) {
    const image = event.target.files[0];
    console.log(image);
    setImageFile(image);
  }

  async function createBodyGuard() {
    try{
      setLoading(true);

      const bodyguardData = JSON.stringify({ name: name, city: city });
      const blob = new Blob([bodyguardData], {type: "text/plain"});
      const bodyguardDataFile = new File([ blob ], 'bodyguardData.json');

      const cid = await client.put([bodyguardDataFile, imageFile], {
        onRootCidReady: localCid => {
          console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
          console.log('> 📡 sending files to web3.storage ')
        },
        onStoredChunk: bytes => console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
      })

      console.log(`https://dweb.link/ipfs/${cid}`);

      const transaction = await cbContract.newBodyGuard(city);
      const tx = await transaction.wait();
      console.log(tx);
      setTransactionUrl(tx.transactionHash);
      setLoading(false);
    } catch(error) {
       console.error(error)
       setLoading(false);
    }  
  }

  async function updateBodyGuard() {
    try{
      setLoading(true);
      const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&types=place&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API}`);
      const geodata = await res.json();
      console.log(geodata, geodata.features[0].center[0], geodata.features[0].center[1]);

      const transaction = await cbContract.setIsAvailable(guardData.id, geodata.features[0].center[0].toString(), geodata.features[0].center[1].toString());
      const tx = await transaction.wait();
      console.log(tx);
      setTransactionUrl(tx.transactionHash);
      setLoading(false);
    } catch(error) {
       console.error(error)
       setLoading(false);
    }  
  }

  return (
    <div className="container mx-auto">
      {!guardData.from
        ?  <div className="bg-white p-3 rounded shadow w-5/12 mx-auto">
            <h2 className="text-2xl mt-3 mb-2">Set Available</h2>
            <div className="mb-3">
              <label htmlFor="location" className="block font-medium text-gray-700">Enter Where you At</label>
              <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="location" onChange={(e) => setLocation(e.target.value)}/>
            </div>
            <div className="mb-3">
              {!loading
                ? <button className="py-2 px-4 mt-1 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full" onClick={updateBodyGuard}>
                    Update
                  </button>
                : <p>Loading...</p>
              }
            </div>
            {transactionUrl &&
              <p className="text-success" style={{ fontSize: '1.4rem'}}>
                Success, see transaction {" "}
                <a href={`https://expedition.dev/block/${transactionUrl}?rpcUrl=https://hackathon.skalenodes.com/v1/hoarse-well-made-theemim`} target="_blank" rel="noopener noreferrer">
                    {transactionUrl}
                </a>
              </p>
            }
          </div>
        : <div className="bg-white p-3 rounded shadow w-5/12 mx-auto">
            <h2 className="text-2xl mt-3 mb-2">Sign up to be BodyGuard</h2>
            <div className="mb-3">
              <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
              <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="name" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="block font-medium text-gray-700">City</label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm"
                id="city"
                onChange={(e) => setCity(e.target.value)}/>
            </div>
            <label htmlFor="userPhoto" className="block font-medium text-gray-700 mb-2">Upload your photo</label>
            <div className="flex items-center space-x-6 mb-2">
              <div className="shrink-0">
                <img className="h-16 w-16 object-cover rounded-full" src={imageFile && URL.createObjectURL(imageFile)} alt="Current profile photo" />
              </div>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input type="file" id="userPhoto" onChange={handleUpload} className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                "/>
              </label>
            </div>
            <div className="mb-3">
              {!loading
                ? <button className="py-2 px-4 mt-1 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full" onClick={createBodyGuard}>
                    Create
                  </button>
                : <p>Loading...</p>
              }
            </div>
            {transactionUrl &&
              <p className="text-success" style={{ fontSize: '1.4rem'}}>
                Success, see transaction {" "}
                <a href={`https://expedition.dev/block/${transactionUrl}?rpcUrl=https://hackathon.skalenodes.com/v1/hoarse-well-made-theemim`} target="_blank" rel="noopener noreferrer">
                    {transactionUrl}
                </a>
              </p>
            }
          </div>
      }
    </div>
  )
}

export default Signup