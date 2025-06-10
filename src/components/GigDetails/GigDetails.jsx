'use client';
import Image from "next/image";
import styles from "./GigDetails.module.css";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { baseUrl } from "@/const";

const GigDetails = () => {
  const searchParams = useSearchParams();
  const gigId = searchParams.get("gigId");
  const seller = searchParams.get("seller");
const [selectedPackage, setSelectedPackage] = useState('basic');
  const [gig, setGig] = useState(null);
 const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (gigId) {
      fetch(`${baseUrl}/gigs/getGigById/${gigId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setGig(data.gig);
          setUser(data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching gig:", err);
          setLoading(false);
        });
    }
  }, [gigId]);

  if (loading) return <p>Loading gig details...</p>;
  if (!gig) return <p>No gig found</p>;
const pkg = gig?.packages?.[selectedPackage];
 
  return (
    <div className={styles.containerGigDetails}>
      <nav className={styles.breadcrumb}>
        <span>🏠 / {gig.category}</span> / <span>{gig.subcategory}</span>
      </nav>

      <h1 className={styles.title}>
        {gig.gigTitle}
      </h1>

      <div className={styles.sellerInfo}>
        <Image src={user.profileUrl} alt="Hossain Rabbi" width={50} height={50} className={styles.profileImage} />
        <div>
          <strong>{user.firstName} {user.lastName}</strong> <span className={styles.level}>New seller</span>
          <div className={styles.rating}>★★★★★ <span>(No reviews)</span></div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <div className={styles.imageSlider}>
            <Image src={gig.images?.[0]?.url} alt="Gig Image" width={800} height={500} className={styles.gigheaderImage} />
          </div>

          <section className={styles.aboutSection}>
            <h2>About this gig</h2>
            <h3>{gig.gigTitle} | No Projects Completed</h3>
            <p>
           {gig.gigDescription}
            </p>
         <h5 style={{margin:'15px 0', fontSize:'17px'}}>About Seller</h5>
            <p>
              Hi, I'm Hossain, a <strong>skilled web developer</strong> with <strong>7+ years of experience</strong> and <strong>100+ successful projects</strong> delivered. I specialize in creating <strong>SEO-optimized, W3-validated, and fully responsive</strong> digital platforms.
            </p>
          </section>

          <section className={styles.techStack}>
            <div>
              <h4>Search Tag</h4>
              <p>#{gig.searchTag}</p>
            </div>
           <div>
  <h4>Positive Keywords</h4>
  <p>{gig.positiveKeywords?.join(", ")}</p>
</div>
            </section>

          <section className={styles.packageComparison}>
  <h2>Compare packages</h2>
  <div className={styles.packageTable}>
    {/* Header Row */}
    <div className={`${styles.row} ${styles.headerRow}`}>
      <div className={styles.cellSpecial}>Package</div>
      {['basic', 'standard', 'premium'].map((type) => (
        <div key={type} className={styles.cell}>
          <span className="pricingTitleInPackage">PKR {gig.packages[type].price}</span><br />
          <span className={styles.packageTitle}>{gig.packages[type].packageName}</span><br />
          <span className={styles.packageDesc}>{gig.packages[type].description}</span>
        </div>
      ))}
    </div>

    {/* Dynamic Feature Rows */}
    {Object.keys(gig.packages.basic).map((key) => {
      if (['price', 'packageName', 'description'].includes(key)) return null; // skip these already used

      return (
        <div key={key} className={styles.row}>
          <div className={styles.cell}>
            {key
              .replace(/([A-Z])/g, ' $1')           // camelCase to spaced
              .replace(/^./, str => str.toUpperCase())} {/* Capitalize first letter */}
          </div>
          {['basic', 'standard', 'premium'].map((type) => (
            <div key={type} className={styles.cell}>
              {typeof gig.packages[type][key] === 'boolean'
                ? gig.packages[type][key] ? '✔' : ''
                : gig.packages[type][key]}
            </div>
          ))}
        </div>
      );
    })}
  </div>
</section>

<section className={styles.reviewsSection}>
  <h2>Reviews</h2>

  <div className={styles.reviewSummary}>
    <div className={styles.leftStats}>
      <p><strong>37 reviews for this Gig</strong></p>
      <div className={styles.ratingRow}><span>5 Stars</span><div className={styles.bar}><div className={styles.filled} style={{width: '97%'}}></div></div><span>(36)</span></div>
      <div className={styles.ratingRow}><span>4 Stars</span><div className={styles.bar}><div className={styles.filled} style={{width: '3%'}}></div></div><span>(1)</span></div>
      <div className={styles.ratingRow}><span>3 Stars</span><div className={styles.bar}></div><span>(0)</span></div>
      <div className={styles.ratingRow}><span>2 Stars</span><div className={styles.bar}></div><span>(0)</span></div>
      <div className={styles.ratingRow}><span>1 Star</span><div className={styles.bar}></div><span>(0)</span></div>
    </div>

    <div className={styles.rightStats}>
      <div className={styles.totalStars}>
        <span>★★★★★</span> <strong>5.0</strong>
      </div>
      <div className={styles.breakdown}>
  <div className={styles.breakdownRow}>
    <span>Seller communication level</span>
    <span>★ 5</span>
  </div>
  <div className={styles.breakdownRow}>
    <span>Quality of delivery</span>
    <span>★ 4.9</span>
  </div>
  <div className={styles.breakdownRow}>
    <span>Value of delivery</span>
    <span>★ 4.9</span>
  </div>
</div>

    </div>
  </div>

  <div className={styles.reviewFilters}>
    <input type="text" placeholder="Search reviews" />
    <button>🔍</button>
    <select>
      <option>Most relevant</option>
    </select>
   </div>

  <div className={styles.reviewCard}>
    <div className={styles.userInfo}>
      <img src="/assets/gigs/avatar.png" alt="avatar" />
      <div>
        <strong>omega_web_inv</strong>
        <div className={styles.location}>🇺🇸 United States</div>
      </div>
    </div>
    <div className={styles.stars}>★★★★★ <span>5</span> • 2 weeks ago</div>
    <p>
      This was for a personal portfolio and I love the way it came out. He explained everything he was going to do and went above and beyond. I highly recommend this freelancer.
    </p>
  </div>

  <div className={styles.messageOverlay}>
    <img src="/assets/gigs/avatar.png" alt="Profile" />
    <div>
      <strong>Message Hossain Rabbi</strong><br />
      <span>Away • Avg. response time: 1 Hour</span>
    </div>
  </div>
</section>

        </div>

 <div className={styles.packageCard}>
      <div className={styles.tabs}>
        {['basic', 'standard', 'premium'].map((pkgName) => (
          <span
            key={pkgName}
            className={selectedPackage === pkgName ? styles.active : ''}
            onClick={() => setSelectedPackage(pkgName)}
          >
            {pkgName.charAt(0).toUpperCase() + pkgName.slice(1)}
          </span>
        ))}
      </div>

      <div className={styles.packageCardPadded}>
        <div className={styles.price}>${pkg.price}</div>

        <p className={styles.subscription}>
          Save up to 20% with <span className={styles.subscribeLink}>Subscribe to Save</span>
        </p>

        <p className={styles.desc}>
          <strong>{pkg.packageName}</strong> — {pkg.description}
        </p>

        <div className={styles.meta}>
          <span>⏱ {pkg.deliveryTime} Day{pkg.deliveryTime > 1 ? 's' : ''} Delivery</span>
          <span>⟳ {pkg.revisions === -1 ? 'Unlimited' : `${pkg.revisions} Revisions`}</span>
        </div>

        <div className={styles.included}>
          <span>What's Included</span>
          <span>▾</span>
        </div>

        <button className={styles.continueBtn}>Continue →</button>

        <p className={styles.compare}>Compare Packages</p>

        <button className={styles.contactBtn}>Contact Seller</button>
      </div>
    </div>
  
   
      
      </div>
    </div>
  );
};

export default GigDetails;
