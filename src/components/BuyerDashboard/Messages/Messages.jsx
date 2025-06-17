'use client';
import React, { useEffect, useState } from 'react';
import './Messages.css';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import MessageChats from './MessageChats';
import MessageProfile from './MessageProfile';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const Messages = () => {
  const [isMobile, setIsMobile] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [receiverData, setReceiverData] = useState(null);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const receiverId = searchParams.get('receiverId');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch all user conversations
  useEffect(() => {
    if (user?._id) {
      fetch(`https://backend-service-marketplace.vercel.app/api/messages/user-conversations/${user._id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setConversations(data.data);
          }
        });
    }
  }, [user, receiverId]); // re-fetch if receiverId changes (new chat started)

  // If new chat started via query param, fetch receiver details
  useEffect(() => {
    if (receiverId) {
      fetch(`https://backend-service-marketplace.vercel.app/api/users/getUserById/${receiverId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setReceiverData(data.data);
          }
        });
    }
  }, [receiverId]);

  const handleContactClick = (contactId) => {
    if (isMobile) {
      router.push('/messages/chat');
    } else {
      router.push(`/messages?receiverId=${contactId}`);
    }
  };

  if (isMobile === null) return null;

  return (
    <div className="messages-container">
      <div className="sidebar-messages">
        <h1 className="sidebar-title-messages">Messages</h1>
        <div className="searchBarWrapper-messages">
          <div className="search-bar-messages">
            <FaSearch />
            <input type="text" placeholder="Search" />
          </div>
          <FaSlidersH size={23} className="filterIcon" />
        </div>

        <div className="usersInMessagesWrapper">
          {receiverData && !conversations.some(conv => conv.participant._id === receiverId) && (
            <div className="contact-messages active-messages" onClick={() => handleContactClick(receiverId)}>
              <img
                src={receiverData.profileUrl || '/assets/users/placeholder.png'}
                alt={receiverData.firstName}
              />
              <div className="contact-info-messages">
                <h4>{receiverData.firstName} {receiverData.lastName}</h4>
                <p>Starting conversation...</p>
              </div>
              <span className="timestamp">Now</span>
            </div>
          )}

          {conversations.map((conv) => (
            <div
              key={conv.conversationId}
              className={`contact-messages ${conv.participant._id === receiverId ? 'active-messages' : ''}`}
              onClick={() => handleContactClick(conv.participant._id)}
            >
              <img src={conv.participant.profileUrl || '/assets/users/placeholder.png'} alt={conv.participant.firstName} />
              <div className="contact-info-messages">
                <h4>{conv.participant.firstName} {conv.participant.lastName}</h4>
                <p>{conv.lastMessage}</p>
              </div>
              <span className="timestamp">{new Date(conv.lastMessageCreatedAt).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>

      {!isMobile  && (
        <>
          <MessageChats senderId={user._id} receiverId={receiverId} />
          <MessageProfile />
        </>
      )}
    </div>
  );
};

export default Messages;
