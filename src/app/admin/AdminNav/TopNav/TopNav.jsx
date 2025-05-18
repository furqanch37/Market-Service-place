import React, { useState, useRef, useEffect } from 'react';
import './TopNav.css';
import { FaSearch } from 'react-icons/fa';
import { FiBell, FiMoreVertical } from "react-icons/fi";
import { MdArrowDropDown } from 'react-icons/md';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <header className="topnav">
        <div className="topnav-more" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FiMoreVertical  className="topNavIcon" />
        </div>

      <div className="topnav-left">
        <FaSearch className="icon" />
        <div className="topnav-link">Apps <MdArrowDropDown /></div>
        <div className="topnav-link">Chat</div>
        <div className="topnav-link">Calendar</div>
        <div className="topnav-link">Email</div>
      </div>

      <div className="topnav-right">
      
        {/* Desktop icons */}
        <div className="topnav-icons">
          <img src="/assets/admin/icon-flag-en.svg" alt="Flag" className="icon-img" />

          <div className="icon-with-badge">
            <HiOutlineChatBubbleLeftRight className="icon" />
            <span className="badge">2</span>
          </div>

          <div className="icon-with-dot">
            <FiBell className="icon" />
            <span className="dot"></span>
          </div>

          <img src="/assets/myimg.jpg" alt="User" className="avatar" />
        </div>

      
      </div>

        {mobileMenuOpen && (
          <div className="mobile-topnav-dropdown" ref={dropdownRef}>
            <img src="/assets/admin/icon-flag-en.svg" alt="Flag" className="icon-img" />
            <div className="icon-with-badge">
              <HiOutlineChatBubbleLeftRight className="icon" />
              <span className="badge">2</span>
            </div>
            <div className="icon-with-dot">
              <FiBell className="icon" />
              <span className="dot"></span>
            </div>
            <img src="/assets/myimg.jpg" alt="User" className="avatar" />
          </div>
        )}
    </header>
  );
};

export default TopNav;
