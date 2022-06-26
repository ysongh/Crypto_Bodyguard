import React, { useEffect, useState } from 'react';

function signup({ ethAddress, cbContract}) {
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
    const total = await cbContract.methods.bodyGuardCount().call()

    for(let i = 1; i <= total; i++){
      const data = await cbContract.methods.bodyGuardList(i).call()
      console.log(data);
      if(data.from === ethAddress){
        setGuardData(data);
      }
    }
   
  }

  async function createBodyGuard() {
    try{
      setLoading(true);
      const tx = await cbContract.methods
        .newBodyGuard(city)
        .send({ from: ethAddress })
      console.log(tx);
      setTransactionUrl(tx.blockHash);
      setLoading(false);
    } catch(error) {
       console.error(error)
       setLoading(false);
    }  
  }

  async function updateBodyGuard() {
    try{
      setLoading(true);
      const tx = await cbContract.methods
        .setIsAvailable(guardData.id, lng, lat)
        .send({ from: ethAddress })
      console.log(tx);
      setTransactionUrl(tx.blockHash);
      setLoading(false);
    } catch(error) {
       console.error(error)
       setLoading(false);
    }  
  }

  return (
    <div>
      {guardData.from
        ?  <div className="card card-body m-auto w-50 mt-3">
            <h2>Set Available</h2>
            <div className="mb-3">
              <label for="longitude" className="form-label">Longitude</label>
              <input className="form-control" id="longitude" onChange={(e) => setLng(e.target.value)}/>
            </div>
            <div className="mb-3">
              <label for="latitude" className="form-label">Latitude</label>
              <input className="form-control" id="latitude" onChange={(e) => setLat(e.target.value)}/>
            </div>
            <div className="mb-3">
              {!loading
                ? <button className="btn btn-primary btn-lg mb-3" onClick={updateBodyGuard}>
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
        : <div className="card card-body m-auto w-50 mt-3">
            <h2>Sign up to be BodyGuard</h2>
            <div className="mb-3">
              <label for="city" className="form-label">City</label>
              <input className="form-control" id="city" onChange={(e) => setCity(e.target.value)}/>
            </div>
            <div className="mb-3">
              {!loading
                ? <button className="btn btn-primary btn-lg mb-3" onClick={createBodyGuard}>
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

export default signup