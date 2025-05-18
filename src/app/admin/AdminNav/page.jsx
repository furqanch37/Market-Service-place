import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaBars, FaTimes, FaGlobe, FaShoppingCart, FaDollarSign,
  FaMicrochip, FaHeartbeat, FaMusic, FaAngleRight, FaCalendarAlt,
  FaThLarge, FaPowerOff
} from 'react-icons/fa';
import './adminNav.css';

const AdminNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <img src="/logo.png" alt="Logo" className="mobile-logo" />
      </div>

      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <img src="/logo.png" alt="Modernize Logo" className="logo" />
          <span className="brand-name">doTask</span>
        </div>

        <nav className="nav-sections">
          <div className="nav-group">
            <p className="nav-title">HOME</p>
            <ul>
              <li><Link href="#"><FaGlobe className="icon" /><span>Modern</span></Link></li>
              <li><Link href="#"><FaShoppingCart className="icon" /><span>eCommerce</span></Link></li>
              <li><Link href="#"><FaDollarSign className="icon" /><span>NFT</span></Link></li>
              <li><Link href="#"><FaMicrochip className="icon" /><span>Crypto</span></Link></li>
              <li><Link href="#"><FaHeartbeat className="icon" /><span>General</span></Link></li>
              <li><Link href="#"><FaMusic className="icon" /><span>Music</span></Link></li>
              <li><Link href="#"><FaAngleRight className="icon" /><span>Frontend page</span></Link></li>
            </ul>
          </div>

          <div className="nav-group">
            <p className="nav-title">APPS</p>
            <ul>
              <li><Link href="#"><FaCalendarAlt className="icon" /><span>Calendar</span></Link></li>
              <li><Link href="#"><FaThLarge className="icon" /><span>Kanban</span></Link></li>
            </ul>
          </div>
        </nav>

        <div className="user-box">
          <img src="/assets/myimg.jpg" alt="User" className="user-img" />
          <div>
            <p className="username">Mathew</p>
            <p className="usertag">Designer</p>
          </div>
          <FaPowerOff className="logout-icon" />
        </div>
      </aside>
    </>
  );
};

export default AdminNav;
