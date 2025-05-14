'use client'; // This remains since you're using stateful logic or may later enhance

import React from 'react';
import './PublishGig.css';

const PublishGig = () => {
  const handlePublish = () => {
    console.log('Gig Published!');
    // Navigation removed — you can trigger a modal, toast, or other feedback here
  };

  const handleBack = () => {
    console.log('Back clicked');
    // Optionally trigger state rollback or UI step switch
  };

  return (
    <div className="publish-container">
      <div className="publish-content">
        <h2>Almost there...</h2>
        <p>Let's publish your Gig and get some buyers rolling in.</p>
        <div className="btn-div">
          <button className="publish-btn" onClick={handlePublish}>
            Publish Gig
          </button>
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishGig;
