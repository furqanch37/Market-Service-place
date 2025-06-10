'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGigs } from '@/redux/features/gigsSlice';
import Filters from './Filters';
import GigCard from './GigCard';

const Gigs = () => {
  const dispatch = useDispatch();
  const { gigs, status, error } = useSelector((state) => state.gigs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGigs());
    }
  }, [status, dispatch]);

  return (
    <div>
      <Filters />
      <div className='gigs-cards-in-services'>
        {status === 'loading' && <p>Loading gigs...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && gigs.length === 0 && <p>No gigs found.</p>}

        {status === 'succeeded' &&
          gigs.map((gig) => (
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
                offersVideo: true,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Gigs;
