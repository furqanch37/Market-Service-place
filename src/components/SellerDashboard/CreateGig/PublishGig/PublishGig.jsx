"use client";

import { baseUrl } from "@/const";
import React, { useState } from "react";
import './PublishGig.css'


const PublishGig = ({ onBack, gigData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${baseUrl}/gigs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gigData),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to create gig");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publish-container">
      <div className="publish-content">
        <h2>Almost there...</h2>
        <p>Let's publish your Gig and get some buyers rolling in.</p>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {success && <p style={{ color: "green" }}>Gig published successfully!</p>}

        <div className="btn-div">
          <button
            className="publish-btn"
            onClick={handlePublish}
            disabled={loading || success}
          >
            {loading ? "Publishing..." : "Publish Gig"}
          </button>
          <button className="back-btn" onClick={onBack} disabled={loading}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishGig;
