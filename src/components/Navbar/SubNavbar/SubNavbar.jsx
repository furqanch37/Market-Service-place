'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/redux/features/categorySlice';
import './SubNavbar.css';

const SubNavbar = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredCategory(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 1500);
  };

  if (status === 'loading') return <div className="sub-navbar">Loading categories...</div>;
  if (status === 'failed') return <div className="sub-navbar">Error: {error}</div>;

  return (
    <div className="sub-navbar">
      {categories.map((category, index) => (
        <div
          key={category._id}
          className="category-item"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {category.name}
          {hoveredCategory === index && (
            <div
              className="popup"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <ul>
                {category.subcategories?.map((sub, i) => (
                  <li key={i}>{sub}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubNavbar;
