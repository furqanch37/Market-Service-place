import React from 'react';
import './navbar.css';
import GigForm from '../../components/CreateGig/GigForm/GigForm';

const steps = [
  'Overview',
  'Pricing',
  'Description & FAQ',
  'Requirements',
  'Gallery',
  'Publish',
];

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-steps">
          {steps.map((step, index) => (
            <li key={index} className={`step ${index === 0 ? 'active' : ''}`}>
              <span className="step-number">{index + 1}</span>
              <span className="step-name">{step}</span>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-container">
        <GigForm />
      </main>
    </>
  );
};

export default Navbar;
