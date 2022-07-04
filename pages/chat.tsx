import React, { useState }  from 'react';
import type { AppProps } from 'next/app';
import { Client } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

function Chat({ pageProps }: AppProps) {
  const [xmtpMethod, setxmtpMethod] = useState(null);
  const [conversationMethod, setconversationMethod] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [toAddress, setToAddress] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const connect = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);

    const signer = provider.getSigner();

    // Create the client with your wallet. This will connect to the XMTP development network by default
    const xmtp = await Client.create(signer);
    console.log(xmtp);
    setxmtpMethod(xmtp);
  }

  const chatWith = async () => {
    const conversation = await xmtpMethod.conversations.newConversation(toAddress);
    setconversationMethod(conversation);

    const messages = await conversation.messages();
    console.log(messages);
    setMessagesList(messages);
  }

  const sendMessage = async () => {
    // Send a message
    await conversationMethod.send(newMessage);

    // Listen for new messages in the conversation
    for await (const message of await conversationMethod.streamMessages()) {
      console.log(`[${message.senderAddress}]: ${message.text}`)
    }
  }

  return (
    <div className='container'>
      {!xmtpMethod
        ? <button className='btn btn-primary' onClick={connect}>Connect</button>
        : <div className="card card-body m-auto w-50 mt-3">
            <h2>Chat</h2>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address to Chat With</label>
              <input className="form-control" id="address" onChange={(e) => setToAddress(e.target.value)}/>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary btn-lg mb-3" onClick={chatWith}>
                Chat
              </button>
            </div>
          </div>
      }
      {conversationMethod && <div className="card card-body m-auto w-50 mt-3">
        <h2>Messages to {toAddress}</h2>
        {messagesList.map(m => (
          <p key={m.id}>{m.content}</p>
        ))}
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <input className="form-control" id="message" onChange={(e) => setNewMessage(e.target.value)}/>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary btn-lg mb-3" onClick={sendMessage}>
            Send Message
          </button>
        </div>
      </div>}
    </div>
  )
}

export default Chat;
