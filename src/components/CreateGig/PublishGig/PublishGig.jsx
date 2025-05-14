'use client'; // Ensure this is a Client Component

import React from 'react';
import { useRouter } from 'next/navigation'; // ✅ Correct router import
import './PublishGig.css';

const PublishGig = () => {
  const router = useRouter();

  const handlePublish = () => {
    console.log('Gig Published!');
    router.push('/gig-success'); // Navigate to success page or confirmation page
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
        <button className="back-btn" onClick={() => router.back()}>
          Back
        </button>
        </div>
      </div>
    </div>
  );
};

export default PublishGig;
