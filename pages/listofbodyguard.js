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
      let newData = {};
      const data = await cbContract.bodyGuardList(i);
      const nftData = await fetch(data.dataCid + "/bodyguardData.json");
      nftData = await nftData.json();
      newData.id = data.id;
      newData.data = data;
      newData.nftData = nftData;
      console.log(newData);
      temp.push(newData);
    }
    setbodyGuards(temp);
  }

  return (
    <div className='container mx-auto'>
      <h1 className="text-3xl mt-4 mb-5">List of BodyGuard</h1>
      <div className="grid grid-cols-2 gap-5">
        {bodyGuards.map(b => (
           <div className='col-6' key={b.id}>
            <div className="bg-white rounded shadow">
              <div className="p-3">
                <div className="flex items-center mb-3">
                  <img className="h-16 w-16 object-cover rounded-full mr-2" src={b.data.dataCid + "/" + b.nftData.imageName} alt="Profile Photo" />
                  <div>
                    <h5 className="card-title">{b.nftData.name}</h5>
                    <p className="card-text mb-2">{b.nftData.city}</p>
                  </div>
                </div>
                
                <button className="py-2 px-4 text-white bg-blue-600 rounded baseline hover:bg-blue-400 mr-2"  onClick={() => router.push(`/chat/${b.data.from}`)}>
                  Chat 
                </button>
                <button className="py-2 px-4 text-white bg-teal-600 rounded baseline hover:bg-blue-400"  onClick={() => router.push(`/sendThankyou/${b.data.from}`)}>
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