'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './Card.css';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { baseUrl } from '@/const';
export default function CardCarousel() {
  const carouselRef = useRef(null);
  const router = useRouter();

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const goToProfile = (userId) => {
    router.push(`/profile?id=${userId}`);
  };

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch(`${baseUrl}/users/seller-homepage-profile`);
        const data = await res.json();
        if (data.success) {
          setSellers(data.sellers);
        }
      } catch (error) {
        console.error('Failed to fetch sellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="carousel-container">
      <button className="arrowleft" onClick={scrollLeft}>
        <IoChevronBack />
      </button>

      <div className="carousel" ref={carouselRef}>
        {loading ? (
          <p>Loading sellers...</p>
        ) : sellers.length === 0 ? (
          <p>No sellers found.</p>
        ) : (
          sellers.map((person, idx) => (
            <div
              key={idx}
              className="card"
              onClick={() => goToProfile(person._id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="image-container">
                <Image
                  src={person.profileUrl || '/default-profile.png'}
                  alt={person.firstName}
                  width={150}
                  height={150}
                  className="profile-image"
                />
              </div>
              <div className="details">
                <h3>{person.firstName} {person.lastName}</h3>
                <p className="role">
                  <span className="verified">✔ Verified Expert</span> in {person.speciality || 'N/A'}
                </p>
                <p className="title">{person.level}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="arrowright" onClick={scrollRight}>
        <IoChevronForward />
      </button>
    </div>
  );
}
