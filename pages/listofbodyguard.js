import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

function ListOfBodyguard({ cbContract }) {
  const router = useRouter();

  const [bodyGuards, setbodyGuards] = useState([]);

  useEffect(() => {
    if(cbContract) fetchBodyguard();
  }, [cbContract])
  
  const fetchBodyguard = async () => {
    const total = await cbContract.bodyGuardCount();
    console.log(total)
    let temp = [];
    for(let i = 1; i <= total; i++){
      const data = await cbContract.bodyGuardList(i);
      console.log(data);
      temp.push(data);
    }
    setbodyGuards(temp);
  }

  return (
    <div className='container mx-auto'>
      <h1 className="text-3xl mt-3 mb-2">List of BodyGuard</h1>
      <div className="grid grid-cols-2 gap-5">
        {bodyGuards.map(b => (
           <div className='col-6' key={b.id}>
            <div className="bg-white rounded shadow">
              <div className="p-3">
                <h5 className="card-title">{b.from}</h5>
                <p className="card-text">{b.city}</p>
                <button className="py-2 px-4 text-white bg-blue-600 rounded baseline hover:bg-blue-400 mr-2"  onClick={() => router.push(`/chat/${b.from}`)}>
                  Chat 
                </button>
                <button className="py-2 px-4 text-white bg-teal-600 rounded baseline hover:bg-blue-400"  onClick={() => router.push(`/sendThankyou/${b.from}`)}>
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

export default ListOfBodyguard;