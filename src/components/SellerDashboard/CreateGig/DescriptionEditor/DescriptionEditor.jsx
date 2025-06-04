"use client";

import React, { useState, useEffect, useRef } from "react";
import "./DescriptionEditor.css";

const DescriptionEditor = ({ onNext, onBack, gigData, setGigData }) => {
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize content editable div from gigData.gigDescription on mount
    if (editorRef.current) {
      editorRef.current.innerText = gigData.gigDescription || "";
      setCharCount((gigData.gigDescription || "").length);
    }
  }, [gigData.gigDescription]);

  const handleContentChange = (e) => {
    const text = e.currentTarget.innerText;
    setCharCount(text.length);
    setGigData((prev) => ({ ...prev, gigDescription: text }));
  };

  const handleHourlyRateChange = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setGigData((prev) => ({ ...prev, hourlyRate: numericValue }));
    } else {
      // If invalid input, set zero or ignore
      setGigData((prev) => ({ ...prev, hourlyRate: 0 }));
    }
  };

  return (
    <div className="main-div">
      <div className="desc-container">
        <h3>Description</h3>
        <hr />
        <label htmlFor="gig-desc" className="desc-label">
          Briefly Describe Your Gig
        </label>

        <div className="editor-toolbar">
          <button type="button" title="Bold" onClick={() => document.execCommand("bold")}>
            <b>B</b>
          </button>
          <button type="button" title="Italic" onClick={() => document.execCommand("italic")}>
            <i>I</i>
          </button>
          <button type="button" title="Underline" onClick={() => document.execCommand("underline")}>
            <u>U</u>
          </button>
          <button type="button" title="Bullet List" onClick={() => document.execCommand("insertUnorderedList")}>
            •
          </button>
          <button type="button" title="Number List" onClick={() => document.execCommand("insertOrderedList")}>
            1.
          </button>
        </div>

        <div
          className="editor-box"
          contentEditable
          id="gig-desc"
          placeholder="Type your gig description here..."
          onInput={handleContentChange}
          ref={editorRef}
          suppressContentEditableWarning={true}
          style={{ minHeight: "150px", border: "1px solid #ccc", padding: "8px" }}
        ></div>

        <div className="char-count">{charCount}/1200 Characters</div>

        <div className="hourlyRateTaker">
          <label className="desc-label">Hourly Rate?</label>
          <input
            type="number"
            placeholder="$20"
            value={gigData.hourlyRate}
            onChange={handleHourlyRateChange}
            min={0}
          />
          <span>$ / hr</span>
        </div>
      </div>

      <div className="submit-container">
        <button className="back-btn" onClick={onBack}>
          Back
        </button>
        <button className="submit-btn" onClick={onNext}>
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default DescriptionEditor;
