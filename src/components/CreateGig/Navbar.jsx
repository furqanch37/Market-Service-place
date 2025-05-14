"use client";

import React, { useState } from 'react';
import './navbar.css';
import GigForm from '../../components/CreateGig/GigForm/GigForm';
import ScopePricing from '../../components/CreateGig/ScopePricing/ScopePricing';
import DescriptionEditor from '../../components/CreateGig/DescriptionEditor/DescriptionEditor';
import GigGallery from '../../components/CreateGig/GigGallery/GigGallery';
import PublishGig from '../../components/CreateGig/PublishGig/PublishGig';

const steps = [
  'Overview',
  'Pricing',
  'Description',
  'Gallery',
  'Publish',
];

const stepComponents = [
  <GigForm />,
  <ScopePricing />,
  <DescriptionEditor />,
  <GigGallery />,
  <PublishGig />,
];

const Navbar = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-steps">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`step ${index === activeStep ? 'active' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-name">{step}</span>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-container">
        {stepComponents[activeStep]}
      </main>
    </>
  );
};

export default Navbar;
