"use client";

import React, { useState } from "react";
import "./navbar.css";

import GigForm from "./GigForm/GigForm";
import ScopePricing from "./ScopePricing/ScopePricing";
import DescriptionEditor from "./DescriptionEditor/DescriptionEditor";
import GigGallery from "./GigGallery/GigGallery";
import PublishGig from "./PublishGig/PublishGig";
import { useSelector } from "react-redux";

const steps = ["Overview", "Pricing", "Description", "Gallery", "Publish"];

  
const Navbar = () => {
  const [activeStep, setActiveStep] = useState(0);
 const user = useSelector((state) => state.user);
  // Central gig data state
 const [gigData, setGigData] = useState({
  userId: user._id || " ",
  gigTitle: "",
  category: "",
  subcategory: "",
  searchTag: "",
  positiveKeywords: [],
  packages: {
    basic: {
      name: "",                    // ✅ was packageName
      description: "",
      price: 0,
      deliveryTime: 0,
      revisions: 0,
      pages: 1,                    // ✅ was numberOfPages
      afterProjectSupport: false,
    },
    standard: {
      name: "",
      description: "",
      price: 0,
      deliveryTime: 0,
      revisions: 0,
      pages: 1,
      afterProjectSupport: false,
    },
    premium: {
      name: "",
      description: "",
      price: 0,
      deliveryTime: 0,
      revisions: 0,
      pages: 1,
      afterProjectSupport: false,
    },
  },
  gigDescription: "",
  hourlyRate: 0,
  images: [],
  videoIframes: [],
  pdf: "",
});


  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => {
        const nextStep = prev + 1;
        window.scrollTo({ top: 0, behavior: "smooth" });
        return nextStep;
      });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => {
        const previousStep = prev - 1;
        window.scrollTo({ top: 0, behavior: "smooth" });
        return previousStep;
      });
    }
  };

  const stepComponents = [
    <GigForm
      key="gigform"
      onNext={handleNext}
      gigData={gigData}
      setGigData={setGigData}
    />,
    <ScopePricing
      key="scopepricing"
      onNext={handleNext}
      onBack={handleBack}
      gigData={gigData}
      setGigData={setGigData}
    />,
    <DescriptionEditor
      key="descriptioneditor"
      onNext={handleNext}
      onBack={handleBack}
      gigData={gigData}
      setGigData={setGigData}
    />,
    <GigGallery
      key="giggallery"
      onNext={handleNext}
      onBack={handleBack}
      gigData={gigData}
      setGigData={setGigData}
    />,
    <PublishGig key="publishgig" onBack={handleBack} gigData={gigData} />,
  ];

  return (
    <div className="creation-gig-wrapper">
      <nav className="create-gig-navbar">
        <ul className="create-gig-navbar-steps">
          {steps.map((step, index) => {
            let className = "create-gig-step";
            if (index < activeStep) className += " done";
            else if (index === activeStep) className += " active";

            return (
              <li
                key={index}
                className={className}
                onClick={() => setActiveStep(index)}
              >
                <span className="create-gig-step-number">{index + 1}</span>
                <span className="create-gig-step-name">{step}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="create-gig-main-container">{stepComponents[activeStep]}</main>
    </div>
  );
};

export default Navbar;
