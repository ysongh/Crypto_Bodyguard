import React, { useState } from 'react';

function signup({ ethAddress, cbContract}) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionUrl, setTransactionUrl] = useState('');

  async function createBodyGuard({  }) {
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

  return (
    <div className="card card-body m-auto w-50 mt-3">
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
  )
}

export default signup