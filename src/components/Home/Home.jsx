'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGigs } from '@/redux/features/gigsSlice'; 

import "./Home.css";
import Brands from './Brands';
import UpworkPromo from './UpworkPromo';
import TalentPromo from './TalentPromo';
import GigCard from '../Gigs/GigCard';
import HeroSection from './HeroSection';
import PopularServices from './PopularServices/PopularServices';
import CardCarousel from './CardCarousel/CardCarousel';
import FindTalent from './Talent/FindTalent';
import EnterpriseSuite from './Enterprise/EnterpriseSuite';

const MainHome = () => {
  const dispatch = useDispatch();
  const { gigs, status } = useSelector((state) => state.gigs);
console.log("gig data", gigs);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGigs());
    }
  }, [status, dispatch]);

  return (
    <div>
      <HeroSection />
      <Brands />
      <CardCarousel />
      <UpworkPromo />
      <PopularServices />
      <div className='home-services-cards'>
        <h1 className="popular-title">Popular Services</h1>
        <div className='popular-services-homeoage-wrap'>
          {gigs.map((gig) => (
            <GigCard
              key={gig._id}
              data={{
                gigId: gig._id,
                image: gig.images?.[0]?.url || '/assets/gigs/dummytwo.png',
                avatar: gig.userId?.profileUrl || '/assets/gigs/avatar.png',
                sellerName: `${gig.userId?.firstName || ''} ${gig.userId?.lastName || ''}`,
                badge: 'New Seller',
                title: gig.gigTitle,
                rating: 5,
                reviews: 0,
                price: `$${gig.packages?.basic?.price || 'N/A'}`,
                offersVideo: gig.videoIframes?.length > 0,
              }}
            />
          ))}
        </div>
      </div>
      <TalentPromo />
      <FindTalent />
      <EnterpriseSuite />
    </div>
  );
};

export default MainHome;
