'use client';
import React, { useState, useEffect } from 'react';
import './Services.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';

const Services = ({ userId }) => {
  const router = useRouter();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [gigData, setGigData] = useState([]);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch(`${baseUrl}/gigs/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Uncomment if using token-based auth
          },
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch gigs');
        const data = await res.json();
        setGigData(data?.gigs || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) fetchGigs();
  }, [userId]);

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Services</h1>
        <div className="custom-orders-toggle">
          <span>Accepting Custom Orders</span>
          <div className="toggle-switch active"></div>
        </div>
        <Link href="/seller/create-gig">
          <button className="create-gig-btn">CREATE A NEW GIG</button>
        </Link>
      </div>

      <div className="tabs">
        <span className="tab active">
          ACTIVE <span className="badge">{gigData.length}</span>
        </span>
        <span className="tab">PENDING APPROVAL</span>
        <span className="tab">REQUIRES MODIFICATION</span>
        <span className="tab">DRAFT</span>
        <span className="tab">DENIED</span>
        <span className="tab">PAUSED</span>
      </div>

      <div className="gigs-panel">
        <div className="panel-header">
          <span>ACTIVE GIGS</span>
          <select className="date-filter">
            <option>LAST 30 DAYS</option>
          </select>
        </div>

        <div className="gigs-table">
          <div className="gigs-table-header">
            <input type="checkbox" />
            <span className="col-gig">GIG</span>
            <span className="col">IMPRESSIONS</span>
            <span className="col">CLICKS</span>
            <span className="col">ORDERS</span>
            <span className="col">CANCELLATIONS</span>
            <span className="col">PLANS</span>
          </div>

          {gigData.map((gig, index) => (
            <div className="gigs-row" key={gig._id || index} style={{ cursor: 'pointer' }}>
              <input type="checkbox" />
              <div className="col-gig" onClick={() => router.push(`/services-details/${gig._id}`)}>
                <Image
                  src={gig.coverImage || '/assets/gigs/dummy.png'}
                  width={40}
                  height={35}
                  alt="Gig"
                  style={{ objectFit: 'contain' }}
                />
                <div>
                  <p className="gig-title">{gig.title}</p>
                </div>
              </div>
              <span className="col">{gig.impressions ?? 0}</span>
              <span className="col">{gig.clicks ?? 0}</span>
              <span className="col">{gig.orders ?? 0}</span>
              <span className="col">{gig.cancellations ?? '0%'}</span>
              <span className="col plan-action">+ Add Subscription</span>
              <div className="dropdown-wrapper">
                <button
                  className="dropdown-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(index);
                  }}
                >
                  ▼
                </button>
                {openDropdownIndex === index && (
                  <div className="dropdown-menu">
                    <button>Update</button>
                    <button>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
