'use client';
import { useRouter } from "next/navigation";

import './scopepricing.css';

const ScopePricing = () => {
  const router = useRouter();

  const handleContinue = () => {
    // Navigate to the desired page
    router.push("/description"); // 🔁 Replace with your route
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
              <td><input placeholder="Name your package" /></td>
              <td><input placeholder="Name your package" /></td>
              <td><input placeholder="Name your package" /></td>
            </tr>
            <tr>
              <td>Description</td>
              <td><textarea placeholder="Describe your offering" /></td>
              <td><textarea placeholder="Describe your offering" /></td>
              <td><textarea placeholder="Describe your offering" /></td>
            </tr>
            <tr>
              <td>Delivery Time</td>
              {[...Array(3)].map((_, i) => (
                <td key={i}>
                  <select>
                    {[...Array(10)].map((_, j) => (
                      <option key={j + 1}>{j + 1} day{j + 1 > 1 ? 's' : ''}</option>
                    ))}
                    <option>Unlimited</option>
                  </select>
                </td>
              ))}
            </tr>
            <tr>
              <td>Responsive Design</td>
              {[...Array(3)].map((_, i) => (
                <td key={i}><input type="checkbox" /></td>
              ))}
            </tr>
            <tr>
              <td>Include Source Code</td>
              {[...Array(3)].map((_, i) => (
                <td key={i}><input type="checkbox" /></td>
              ))}
            </tr>
            <tr>
              <td>Price ($)</td>
              {[...Array(3)].map((_, i) => (
                <td key={i}><input type="number" /></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="extras">
        <h3>Add Extra Services</h3>
        <label><input type="checkbox" /> Extra Fast Delivery</label>
        <label><input type="checkbox" /> Additional Page</label>
        <label><input type="checkbox" /> Include Source Code</label>
        <label><input type="checkbox" /> Design Customization</label>
      </div>

      <button className="submit-btn" onClick={handleContinue}>
        Save & Continue
      </button>
    </div>
  );
};

export default ScopePricing;
