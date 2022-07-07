import React, { useEffect, useState } from 'react';

function Signup({ ethAddress, cbContract}) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionUrl, setTransactionUrl] = useState('');
  const [guardData, setGuardData] = useState({});

  const [lng, setLng] = useState();
  const [lat, setLat] = useState();

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

  async function createBodyGuard() {
    try{
      setLoading(true);
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
      const transaction = await cbContract.setIsAvailable(guardData.id, lng, lat);
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
      {guardData.from
        ?  <div className="bg-white p-3 rounded shadow w-5/12 mx-auto">
            <h2 className="text-2xl mt-3 mb-2">Set Available</h2>
            <div className="mb-3">
              <label htmlFor="longitude" className="block font-medium text-gray-700">Longitude</label>
              <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="longitude" onChange={(e) => setLng(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="latitude" className="block font-medium text-gray-700">Latitude</label>
              <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="latitude" onChange={(e) => setLat(e.target.value)}/>
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
              <label htmlFor="city" className="block font-medium text-gray-700">City</label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm"
                id="city"
                onChange={(e) => setCity(e.target.value)}/>
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