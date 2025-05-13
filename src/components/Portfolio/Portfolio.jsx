import Image from "next/image";
import Head from "next/head";
import "./Portfolio.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Portfolio() {
  const cards = [
    {
      title: "Our clients experiences",
      author: "Bilgin Studio",
      image: "/assets/Port4.png",
      likes: "18k",
    },
    {
      title: "Neocoin Investment",
      author: "Al Mamun",
      image: "/assets/Port1.png",
      likes: "3.4k",
    },
    {
      title: "Wesy Branding",
      author: "Prime7",
      image: "/assets/Port2.png",
      likes: "506",
    },
    {
      title: "Money form request",
      author: "Dipa Inhouse",
      image: "/assets/Port3.png",
      likes: "7.7k",
    },
  ];

  return (
    <>
      <Head>
        <title>Top Designers</title>
      </Head>
      <main className="container">
        <h1 className="main-title">Discover My Portfolio's</h1>
        <p className="subtitle">
          Explore work from the most talented and accomplished designers ready to take on your next project
        </p>

        <div className="filter-bar">
          <button className="popular-btn">Popular</button>

          <button className="active">Discover</button>
          <button>Animation</button>
          <button>Branding</button>
          <button>Illustration</button>
          <button>Mobile</button>
          <button>Print</button>
          <button>Product Design</button>
          <button>Typography</button>
          <button>Web Design</button>
          <button className="popular-btn">
  <FontAwesomeIcon icon={faFilter} style={{ width: '12px', height: '12px', marginRight: '8px' }} />

  Filter
</button>
        </div>

        <div className="card-row">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <Image
                src={card.image}
                alt={card.title}
                width={300}
                height={200}
                className="card-img"
              />
              <div className="card-details">
                <span>{card.author}</span>
                <span>{card.likes} likes</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
