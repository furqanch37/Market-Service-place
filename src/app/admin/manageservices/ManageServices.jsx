import React from 'react';
import { FaCalendarAlt, FaUsers, FaTrash, FaEdit } from 'react-icons/fa';
import './manageJobs.css';

const JobCard = ({ title, postedDate, expiryDate, status, candidates }) => {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{title}</h3>
        <span className={`status ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
      </div>
      <div className="job-meta">
        <p><FaCalendarAlt className="icon" /> Posted on {postedDate}</p>

      </div>
      <div className="job-actions">
        <button className="btn-primary">
          <FaUsers className="icon" /> Manage Candidates ({candidates})
        </button>
        <button className="btn-icon">
          <FaTrash className="icon" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
