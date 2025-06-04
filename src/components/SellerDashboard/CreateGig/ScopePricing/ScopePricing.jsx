'use client';

import { useState } from 'react';
import './scopepricing.css';

const ScopePricing = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    packages: {
      basic: {
        name: '', description: '', deliveryTime: '', price: '',
        revisions: 0,
        pages: 1, afterProjectSupport: false,
      },
      standard: {
        name: '', description: '', deliveryTime: '', price: '',
        revisions: 0,
        pages: 1, afterProjectSupport: false,
      },
      premium: {
        name: '', description: '', deliveryTime: '', price: '',
        revisions: 0,
        pages: 1, afterProjectSupport: false,
      },
    },
   
  });

  const [charCount, setCharCount] = useState({ basic: 0, standard: 0, premium: 0 });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, pkg, key] = name.split('.');

    if (section === 'packages') {
      setFormData((prevState) => ({
        ...prevState,
        packages: {
          ...prevState.packages,
          [pkg]: {
            ...prevState.packages[pkg],
            [key]: type === 'checkbox' ? checked : value,
          },
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [pkg]: type === 'checkbox' ? checked : value,
        },
      }));
    }
  };

  const handleDescriptionChange = (pkg, e) => {
    const newDescription = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      packages: {
        ...prevState.packages,
        [pkg]: {
          ...prevState.packages[pkg],
          description: newDescription,
        },
      },
    }));
    setCharCount((prev) => ({ ...prev, [pkg]: newDescription.length }));
  };

  return (
    <div className="scope-container">
      <h2>Scope & Pricing</h2>
      <div className="packages-table">
        <table>
          <thead>
            <tr>
              <th>Packages</th>
              <th>Basic</th>
              <th>Standard</th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Package Name</td>
              {['basic', 'standard', 'premium'].map((pkg) => (
                <td key={`name-${pkg}`}>
                  <input
                    type="text"
                    maxLength={50}
                    name={`packages.${pkg}.name`}
                    value={formData.packages[pkg].name}
                    onChange={handleChange}
                    placeholder="Name your package"
                  />
                </td>
              ))}
            </tr>

            <tr>
              <td>Description</td>
              {['basic', 'standard', 'premium'].map((pkg) => (
                <td key={`desc-${pkg}`}>
                  <textarea
                    className="descBox"
                    name={`packages.${pkg}.description`}
                    value={formData.packages[pkg].description}
                    onChange={(e) => handleDescriptionChange(pkg, e)}
                    maxLength={1200}
                    placeholder="Describe your offering"
                  />
                  <div className="char-count">{charCount[pkg]}/1200</div>
                </td>
              ))}
            </tr>

            {["price", "deliveryTime", "revisions", "pages"].map((field) => (
              <tr key={field}>
                <td>
                  {field === 'price' ? 'Price ($)' :
                   field === 'deliveryTime' ? 'Delivery Time (days)' :
                   field === 'revisions' ? 'Revisions' : 'Number of Pages'}
                </td>
                {['basic', 'standard', 'premium'].map((pkg) => (
                  <td key={`${field}-${pkg}`}>
                    <input
                      type="number"
                      name={`packages.${pkg}.${field}`}
                      value={formData.packages[pkg][field]}
                      onChange={handleChange}
                      min="0"
                    />
                  </td>
                ))}
              </tr>
            ))}

            {["afterProjectSupport"].map((field) => (
              <tr key={field}>
                <td>{field.replace(/([A-Z])/g, ' $1')}</td>
                {['basic', 'standard', 'premium'].map((pkg) => (
                  <td key={`${field}-${pkg}`}>
                    <input
                      type="checkbox"
                      name={`packages.${pkg}.${field}`}
                      checked={formData.packages[pkg][field]}
                      onChange={handleChange}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      

      <div className="submit-container">
        <button className="back-btn" onClick={onBack}>Back</button>
        <button className="submit-btn" onClick={onNext}>Save & Continue</button>
      </div>
    </div>
  );
};

export default ScopePricing;