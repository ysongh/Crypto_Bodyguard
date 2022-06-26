import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

function index({ cbContract }) {
  const router = useRouter();

  const [bodyGuards, setbodyGuards] = useState([]);

  useEffect(() => {
    if(cbContract) fetchBodyguard();
  }, [cbContract])
  
  const fetchBodyguard = async () => {
    const total = await cbContract.methods.bodyGuardCount().call()
    console.log(total)
    let temp = [];
    for(let i = 1; i <= total; i++){
      const data = await cbContract.methods.bodyGuardList(i).call()
      console.log(data);
      temp.push(data);
    }
    setbodyGuards(temp);
  }

  return (
    <div className='container'>
      <h1>List of BodyGuard</h1>
      <div className='row'>
        {bodyGuards.map(b => (
           <div className='col-6' key={b.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{b.from}</h5>
                <p className="card-text">{b.city}</p>
                <button className="btn btn-primary"  onClick={() => router.push(`/sendThankyou/${b.from}`)}>
                  Send Thank You NFT
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default index