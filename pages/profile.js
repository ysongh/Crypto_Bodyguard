import React, { useEffect, useState } from 'react';

function profile({ ethAddress, cbContract }) {
  const [location, setLocation] = useState();
  const [guardData, setGuardData] = useState({});
  const [loading, setLoading] = useState(false);
  const [transactionUrl, setTransactionUrl] = useState('');
  
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
      <div className="bg-white p-3 rounded shadow w-5/12 mx-auto">
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
            <a href={`https://mumbai.polygonscan.com/tx/${transactionUrl}`} target="_blank" rel="noopener noreferrer">
                {transactionUrl}
            </a>
          </p>
        }
      </div>
    </div>
  )
}

export default profile;