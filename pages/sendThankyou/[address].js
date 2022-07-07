import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';

function SendThankyou() {
  const router = useRouter();
  const { address } = router.query;

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [cardURL, setCardURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [transactionUrl, setTransactionUrl] = useState('');

  async function sendCard({  }) {
    try{
      setLoading(true);
      const options = {
        method: 'POST',
        url: 'https://api.nftport.xyz/v0/mints/easy/urls',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.NEXT_PUBLIC_NFTPORT_API
        },
        data: {
          chain: 'polygon',
          name: name,
          description: text,
          file_url: cardURL,
          mint_to_address: address
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
        setTransactionUrl(response.data.transaction_external_url);
        setLoading(false);
      }).catch(function (error) {
        console.error(error);
        setLoading(false);
      });
      
    } catch(error) {
       console.error(error)
       setLoading(false);
    }  
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white p-3 rounded shadow w-5/12 mx-auto">
        <h2 className="text-2xl mt-3">Send Thank You Card</h2>
        <p className="text-sm text-gray-500 mb-2">* Free Minting on Polygon</p>
        <div className="mb-3">
          <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
          <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="name" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="detail" className="block font-medium text-gray-700">Detail</label>
          <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="detail" onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="block font-medium text-gray-700">URL of the Card</label>
          <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="url" onChange={(e) => setCardURL(e.target.value)}/>
        </div>
        <div className="mb-3">
          {!loading
            ? <button className="py-2 px-4 mt-1 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full" onClick={sendCard}>
                Send
              </button>
            : <p>Loading...</p>
          }
        </div>
        {transactionUrl &&
          <p className="text-success" style={{ fontSize: '1.4rem'}}>
            Success, see transaction {" "}
            <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
                {transactionUrl}
            </a>
          </p>
        }
      </div>
    </div>
  )
}

export default SendThankyou