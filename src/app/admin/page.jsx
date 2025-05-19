import React from 'react';
import './admin.css';
import AdminHomeCards from './AdminHome/AdminHomeCards/AdminHomeCards';
import RevenueUpdates from './AdminHome/RevenueUpdates/RevenueUpdates';
import EarningsCards from './AdminHome/EarningsCards/EarningsCards';

const Page = () => {
  return (
<>

  <AdminHomeCards />
  <div className="chartsdiv">
  <RevenueUpdates />
  <EarningsCards />
  </div> 
</>   
   );
};

export default Page;
