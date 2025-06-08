'use client';
import React, { useEffect, useState } from 'react';
import './Services.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const'; // your API base URL

const Services = ({ userId }) => {
  const router = useRouter();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [apiGigs, setApiGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Your static gig data (unchanged)
  const gigData = [
    {
      impressions: 291,
      clicks: 0,
      orders: 0,
      cancellations: '0%',
      title: 'build a portfolio website, business website with animations', // for fallback
    },
    {
      impressions: 58,
      clicks: 0,
      orders: 0,
      cancellations: '0%',
      title: 'be your node js developer, react js or next js developer', // for fallback
    },
  ];

  useEffect(() => {
    if (!userId) return;

    const fetchGigs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${baseUrl}/gigs/all/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error('Failed to fetch gigs');

        const data = await res.json();
        if (data.success) {
          setApiGigs(data.gigs);
        } else {
          setError('Failed to load gigs');
        }
      } catch (err) {
        setError(err.message || 'Error fetching gigs');
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [userId]);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prev) => (prev === index ? null : index));
  };

  if (!userId) return <div>Please provide a valid user ID.</div>;
  if (loading) return <div className="services-container">Loading gigs...</div>;
  if (error) return <div className="services-container">Error: {error}</div>;

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
          ACTIVE <span className="badge">{apiGigs.length || gigData.length}</span>
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

          {apiGigs.length > 0 ? apiGigs.map((gig, index) => {
            const title = gig.gigTitle;
            const imageUrl = gig.images?.[0]?.url || '/assets/gigs/dummy.png';
            const staticInfo = gigData[index] || { impressions: 0, clicks: 0, orders: 0, cancellations: '0%' };

            return (
              <div className="gigs-row" key={gig._id || index} style={{ cursor: 'pointer' }}>
                <input type="checkbox" />
                <div className="col-gig" onClick={() => router.push('/services-details')}>
                  <Image
                    src={imageUrl}
                    width={40}
                    height={35}
                    alt={title}
                    style={{ objectFit: 'contain' }}
                  />
                  <div>
                    <p className="gig-title">{title}</p>
                  </div>
                </div>
                <span className="col">{staticInfo.impressions}</span>
                <span className="col">{staticInfo.clicks}</span>
                <span className="col">{staticInfo.orders}</span>
                <span className="col">{staticInfo.cancellations}</span>
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
            );
          }) : (
            gigData.map((gig, index) => (
              <div className="gigs-row" key={index} style={{ cursor: 'pointer' }}>
                <input type="checkbox" />
                <div className="col-gig" onClick={() => router.push('/services-details')}>
                  <Image
                    src="/assets/gigs/dummy.png"
                    width={40}
                    height={35}
                    alt={gig.title || 'No Title'}
                    style={{ objectFit: 'contain' }}
                  />
                  <div>
                    <p className="gig-title">{gig.title || 'No Title'}</p>
                  </div>
                </div>
                <span className="col">{gig.impressions}</span>
                <span className="col">{gig.clicks}</span>
                <span className="col">{gig.orders}</span>
                <span className="col">{gig.cancellations}</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
