import React from 'react';
import './admin.css';
import AdminHomeCards from './AdminHome/AdminHomeCards/AdminHomeCards';
import RevenueUpdates from './AdminHome/RevenueUpdates/RevenueUpdates';

const Page = () => {
  return (
<>

  <AdminHomeCards />
  <div className="chartsdiv">
  <RevenueUpdates />
  </div> 
</>   
   );
};

export default Page;
