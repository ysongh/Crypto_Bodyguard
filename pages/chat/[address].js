import React, { useState }  from 'react';
import { Client } from '@xmtp/xmtp-js';
import { useRouter } from 'next/router';

function Chat({ userSigner, ethAddress }) {
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
    <div className="container mx-auto">
      {!xmtpMethod
        ? <div className="bg-white p-3 rounded shadow w-4/12 mx-auto">
            <button className="py-2 px-4 mt-1 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full" onClick={connect}>
              Connect Wallet to Chat
            </button>
            <p className="mt-1">With XMTP</p>
          </div>
        : <div className="bg-white p-3 rounded shadow w-4/12 mx-auto">
            <h2>Chat</h2>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address to Chat With</label>
              <input
                className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm"
                id="address" 
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}/>
            </div>
            <div className="mb-3">
              <button className="py-2 px-4 mt-1 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full" onClick={chatWith}>
                Chat
              </button>
            </div>
          </div>
      }
      {conversationMethod && <div className="bg-white p-3 rounded shadow">
        <h2>Messages to {toAddress}</h2>
        {messagesList.map(m => (
          <p className={m.senderAddress === ethAddress ? "text-right" : ""} key={m.id}>
            {m.content}
          </p>
        ))}
        <div className="mb-3">
          <input className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm" id="message" onChange={(e) => setNewMessage(e.target.value)} placeholder="Message..." />
        </div>
        <div className="mb-3">
          <button className="py-2 px-4 mt-1 text-white bg-blue-600 rounded baseline hover:bg-blue-400" onClick={sendMessage}>
            Send Message
          </button>
        </div>
      </div>}
    </div>
  )
}

export default Chat;