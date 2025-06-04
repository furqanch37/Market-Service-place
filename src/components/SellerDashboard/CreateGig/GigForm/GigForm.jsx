"use client";

import React from "react";
import "./gigform.css";

const GigForm = ({ onNext, gigData, setGigData }) => {
  // Update handler for inputs
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "positiveKeywords" || id === "searchTag") {
      // Save as array splitting by comma
      const keywords = value.split(",").map((k) => k.trim()).filter(Boolean);
      if (id === "positiveKeywords")
        setGigData((prev) => ({ ...prev, positiveKeywords: keywords }));
      else setGigData((prev) => ({ ...prev, searchTag: value }));
    } else {
      setGigData((prev) => ({ ...prev, [id]: value }));
    }
  };

  return (
    <div className="gig-form-container">
      <h2 className="section-title">Gig Overview</h2>

      <div className="form-section">
        <label htmlFor="gigTitle" className="form-label">
          Gig title
        </label>
        <input
          type="text"
          id="gigTitle"
          maxLength="80"
          className="form-input"
          placeholder="I will do something I'm really good at"
          value={gigData.gigTitle}
          onChange={handleChange}
        />
      </div>

      <div className="form-section two-columns">
        <div>
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-input"
            value={gigData.category}
            onChange={handleChange}
          >
            <option value="">Select a Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
            {/* Add your actual categories here */}
          </select>
        </div>
        <div>
          <label htmlFor="subcategory" className="form-label">
            Subcategory
          </label>
          <select
            id="subcategory"
            className="form-input"
            value={gigData.subcategory}
            onChange={handleChange}
          >
            <option value="">Select a Subcategory</option>
            <option value="Fullstack">Fullstack</option>
            <option value="Frontend">Frontend</option>
            {/* Add your actual subcategories here */}
          </select>
        </div>
      </div>

      <div className="form-section two-columns">
        <div>
          <label htmlFor="searchTag" className="form-label">
            Search tags
          </label>
          <input
            type="text"
            id="searchTag"
            className="form-input"
            placeholder="e.g., logo design, brand"
            value={gigData.searchTag}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="positiveKeywords" className="form-label">
            Positive keywords (comma separated)
          </label>
          <input
            type="text"
            id="positiveKeywords"
            className="form-input"
            placeholder="e.g., professional, clean"
            value={gigData.positiveKeywords.join(", ")}
            onChange={handleChange}
          />
        </div>
      </div>

      <p className="note-text">
        ⚠️ Please note: Some categories require that sellers verify their
        skills.
      </p>

      <div className="submit-container-1">
        <button className="submit-btn-1" onClick={onNext}>
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default GigForm;
