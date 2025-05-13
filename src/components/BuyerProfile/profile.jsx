"use client";

import React, { useState } from "react";
import SidebarProfile from "../../components/BuyerProfile/SidebarProfile";
import ProfileChecklist from "../../components/BuyerProfile/Check";
import ReviewsSection from "../../components/BuyerProfile/ReviewsSection";
import ProfileDrawer from "../../components/BuyerProfile/ProfileDrawer";
import "./profile.css";

const BuyerProfile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="profile-container">
      <div className="main-content">
        <SidebarProfile onOpen={() => setIsDrawerOpen(true)} />
        <div className="right-section">
          <ProfileChecklist />
          <ReviewsSection />
        </div>
      </div>

      <ProfileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default BuyerProfile;
