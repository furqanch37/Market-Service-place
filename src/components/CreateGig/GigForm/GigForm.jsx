'use client'; // Required when using hooks like useRouter in App Router

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ Correct for App Router
import './gigform.css';

const GigForm = () => {
  const router = useRouter();

  const handleSaveAndContinue = () => {
    router.push('/scope-pricing'); // Navigates to ScopePricing page
  };

  return (
    <div className="gig-form-container">
      <h2 className="section-title">Gig Overview</h2>

      <div className="form-section">
        <label htmlFor="gig-title" className="form-label">Gig title</label>
        <input
          type="text"
          id="gig-title"
          maxLength="80"
          className="form-input"
          placeholder="I will do something I'm really good at"
        />
      </div>

      <div className="form-section two-columns">
        <div>
          <label className="form-label">Category</label>
          <select className="form-input">
            <option>SELECT A CATEGORY</option>
          </select>
        </div>
        <div>
          <label className="form-label">Subcategory</label>
          <select className="form-input">
            <option>SELECT A SUBCATEGORY</option>
          </select>
        </div>
      </div>

      <div className="form-section two-columns">
        <div>
          <label className="form-label">Search tags</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., logo design, brand"
          />
        </div>
        <div>
          <label className="form-label">Positive keywords</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g., professional, clean"
          />
        </div>
      </div>

      <p className="note-text">⚠️ Please note: Some categories require that sellers verify their skills.</p>

      <button className="save-btn" onClick={handleSaveAndContinue}>
        Save & Continue
      </button>
    </div>
  );
};

export default GigForm;
