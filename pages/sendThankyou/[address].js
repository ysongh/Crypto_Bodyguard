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
    <div className="card card-body m-auto w-50 mt-3">
      <h2>Send Thank You Card</h2>
      <p>* Free Minting on Polygon</p>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input className="form-control" id="name" onChange={(e) => setName(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="detail" className="form-label">Detail</label>
        <input className="form-control" id="detail" onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="form-label">URL of the Card</label>
        <input className="form-control" id="url" onChange={(e) => setCardURL(e.target.value)}/>
      </div>
      <div className="mb-3">
        {!loading
          ? <button className="btn btn-primary btn-lg mb-3" onClick={sendCard}>
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
  )
}

export default SendThankyou