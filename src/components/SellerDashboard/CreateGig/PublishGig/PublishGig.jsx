"use client";

import { baseUrl } from "@/const";
import React, { useState } from "react";
import "./PublishGig.css";

const PublishGig = ({ onBack, gigData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData();

      // Basic text fields
      formData.append("userId", gigData.userId);
      formData.append("gigTitle", gigData.gigTitle);
      formData.append("category", gigData.category);
      formData.append("subcategory", gigData.subcategory);
      formData.append("searchTag", gigData.searchTag);
      formData.append("gigDescription", gigData.gigDescription);
      formData.append("hourlyRate", gigData.hourlyRate.toString());

      // JSON fields
      formData.append("positiveKeywords", JSON.stringify(gigData.positiveKeywords));
      formData.append("videoIframes", JSON.stringify(gigData.videoIframes));

      // Packages (as a single JSON string)
      const formattedPackages = {
        basic: {
          packageName: gigData.packages.basic.name,
          description: gigData.packages.basic.description,
          price: gigData.packages.basic.price,
          deliveryTime: gigData.packages.basic.deliveryTime,
          revisions: gigData.packages.basic.revisions,
          numberOfPages: gigData.packages.basic.pages,
          afterProjectSupport: gigData.packages.basic.afterProjectSupport,
        },
        standard: {
          packageName: gigData.packages.standard.name,
          description: gigData.packages.standard.description,
          price: gigData.packages.standard.price,
          deliveryTime: gigData.packages.standard.deliveryTime,
          revisions: gigData.packages.standard.revisions,
          numberOfPages: gigData.packages.standard.pages,
          afterProjectSupport: gigData.packages.standard.afterProjectSupport,
        },
        premium: {
          packageName: gigData.packages.premium.name,
          description: gigData.packages.premium.description,
          price: gigData.packages.premium.price,
          deliveryTime: gigData.packages.premium.deliveryTime,
          revisions: gigData.packages.premium.revisions,
          numberOfPages: gigData.packages.premium.pages,
          afterProjectSupport: gigData.packages.premium.afterProjectSupport,
        },
      };

      formData.append("packages", JSON.stringify(formattedPackages));

      // Images
      gigData.images.forEach((file) => {
        formData.append("gigImages", file);
      });

      // PDF
      if (gigData.pdf) {
        formData.append("pdf", gigData.pdf);
      }

      // Debug FormData
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] ${value.name}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await fetch(`${baseUrl}/gigs/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create gig");
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
