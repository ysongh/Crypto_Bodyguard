import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

function ListOfBodyguard({ ethAddress, cbContract, sfMethods, userSigner }) {
  const router = useRouter();

  const [bodyGuards, setbodyGuards] = useState([]);

  useEffect(() => {
    if(cbContract) fetchBodyguard();
  }, [cbContract])

  const getFlowInfo = async (receiver) => {
    try {
      const DAIxContract = await sfMethods.loadSuperToken("fDAIx");
      const DAIx = DAIxContract.address;
      console.log(DAIx);

      const result = await sfMethods.cfaV1.getFlow({
        superToken: DAIx,
        sender: ethAddress,
        receiver: receiver,
        providerOrSigner: userSigner
      });
      
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return "";
    }
  } 
  
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
      newData.sf = await getFlowInfo(data.from);
      console.log(newData);
      temp.push(newData);
    }
    setbodyGuards(temp);
  }

  const sendDai = async (recipient) => {
    try {
      const DAIxContract = await sfMethods.loadSuperToken("fDAIx");
      const DAIx = DAIxContract.address;
      console.log(DAIx);

      const createFlowOperation = await sfMethods.cfaV1.createFlow({
        receiver: recipient,
        flowRate: "1",
        superToken: DAIx,
      });
  
      console.log("Creating your stream...");
  
      const result = await createFlowOperation.exec(userSigner);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
                <button className="py-2 px-4 text-white bg-teal-600 rounded baseline hover:bg-blue-400 mb-2"  onClick={() => router.push(`/sendThankyou/${b.data.from}`)}>
                  Send Thank You NFT
                </button>
                <br />
                {b.sf.flowRate > 0 
                  ? <>
                      <p>Deposit: {b.sf.deposit}</p>
                      <p>FlowRate: {b.sf.flowRate}</p>
                      <a className="text-blue-600 visited:text-purple-600" href={`https://app.superfluid.finance/`} target="_blank" rel="noopener noreferrer">
                        View Dashboard
                      </a>
                    </>
                  : <button className="py-2 px-4 text-white bg-teal-600 rounded baseline hover:bg-blue-400"  onClick={() => sendDai(b.data.from)}>
                    Send Dai
                  </button> }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListOfBodyguard;