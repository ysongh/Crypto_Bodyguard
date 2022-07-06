import React, { useState }  from 'react';
import { Client } from '@xmtp/xmtp-js';
import { useRouter } from 'next/router';

function Chat({ userSigner }) {
  const router = useRouter();
  const { address } = router.query;

  const [xmtpMethod, setxmtpMethod] = useState(null);
  const [conversationMethod, setconversationMethod] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [toAddress, setToAddress] = useState(address);
  const [newMessage, setNewMessage] = useState("");

  const connect = async () => {
    // Create the client with your wallet. This will connect to the XMTP development network by default
    const xmtp = await Client.create(userSigner);
    console.log(xmtp);
    setxmtpMethod(xmtp);
  }

  const chatWith = async () => {
    const conversation = await xmtpMethod.conversations.newConversation(toAddress);
    setconversationMethod(conversation);

    const messages = await conversation.messages();
    console.log(messages);
    setMessagesList(messages);

    // Listen for new messages in the conversation
    for await (const message of await conversation.streamMessages()) {
      console.log(`[${message.senderAddress}]: ${message.content}`)
      setMessagesList([...messages, message]);
    }
  }

  const sendMessage = async () => {
    // Send a message
    await conversationMethod.send(newMessage);
  }

  return (
    <div className='container'>
      {!xmtpMethod
        ? <button className='btn btn-primary' onClick={connect}>Connect</button>
        : <div className="card card-body m-auto w-50 mt-3">
            <h2>Chat</h2>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address to Chat With</label>
              <input className="form-control" id="address" value={toAddress} onChange={(e) => setToAddress(e.target.value)}/>
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