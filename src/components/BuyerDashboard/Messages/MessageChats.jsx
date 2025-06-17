import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { FaPaperclip, FaRegSmile, FaSun, FaBold, FaPaperPlane, FaVideo } from 'react-icons/fa';
import './Messages.css';

const MessageChats = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const convRes = await fetch(`https://backend-service-marketplace.vercel.app/api/messages/user-conversations/${senderId}`);
        const convData = await convRes.json();
        const existingConv = convData.data.find(conv => conv.participant._id === receiverId);
        const convId = existingConv?.conversationId;

        const idToUse = convId || `${senderId}${receiverId}`;
        setConversationId(idToUse);

        const res = await fetch(`https://backend-service-marketplace.vercel.app/api/messages/conversation/${idToUse}`);
        const data = await res.json();
        if (data.success) setMessages(data.data);
      } catch (err) {
        console.error('Error loading messages:', err);
      }
    };

    if (senderId && receiverId) {
      fetchConversation();
    }
  }, [senderId, receiverId]);

  // 🔴 Real-time Pusher subscription
  useEffect(() => {
    if (!conversationId) return;

    const pusher = new Pusher('810871192b5e575039f8', {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('marketplace');
    channel.bind('new-message', (data) => {
      setMessages(prev => [...prev, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [conversationId]);

  const handleSend = async () => {
    if (!message.trim()) return;
    console.log({ senderId, receiverId, message });

    try {
      const res = await fetch('https://backend-service-marketplace.vercel.app/api/messages/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId, receiverId, message })
      });

      const data = await res.json();
      if (data.success) {
        setMessage('');
        // Do NOT push manually here; Pusher will handle it
        // setMessages(prev => [...prev, data.data]);
      }
    } catch (err) {
      console.error('Send failed:', err);
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-title">
          <h3>Chat</h3>
        </div>
        <div className="chat-actions">
          <FaVideo className="video-icon" />
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg._id} className={`message ${msg.senderId._id === senderId ? 'outgoing' : 'incoming'}`}>
            <img src={msg.senderId.profileUrl || '/assets/users/placeholder.png'} alt={msg.senderId.firstName} />
            <div>
              <div><span className="sender">{msg.senderId.firstName}</span> <span className="time">{new Date(msg.createdAt).toLocaleTimeString()}</span></div>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <div className="input-actions">
          <button className="send-btn" onClick={handleSend}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageChats;
