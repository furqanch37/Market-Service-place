import React from 'react';
import './Dashboard.css';

const WeeklyStats = () => {
  return (
    <div className="ws-card">
      <h3>Weekly Stats</h3>
      <p className="ws-subtitle">Average sales</p>

      <div className="ws-chart"></div>

      <div className="ws-stats-list">
        <div className="ws-stat-box">
          <div className="ws-icon purple" />
          <div>
            <p className="ws-title">Top Sales</p>
            <p>Johnathan Doe</p>
          </div>
          <span className="ws-value blue">+68</span>
        </div>

        <div className="ws-stat-box">
          <div className="ws-icon green" />
          <div>
            <p className="ws-title">Best Seller</p>
            <p>MaterialPro Admin</p>
          </div>
          <span className="ws-value green">+68</span>
        </div>

        <div className="ws-stat-box">
          <div className="ws-icon red" />
          <div>
            <p className="ws-title">Most Commented</p>
            <p>Ample Admin</p>
          </div>
          <span className="ws-value red">+68</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStats;
