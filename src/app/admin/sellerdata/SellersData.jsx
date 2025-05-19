import React from "react";
import "./sellerdata.css";
import { FaEye, FaTrash } from "react-icons/fa";

const teamMembers = [
  {
    name: "Emma Adams",
    role: "Web Developer",
    email: "adams@mail.com",
    location: "Boston, USA",
    phone: "+91(070)123–4567",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Olivia Allen",
    role: "Web Designer",
    email: "allen@mail.com",
    location: "Sydney, Australia",
    phone: "+91(125)450–1500",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Isabella Anderson",
    role: "UX/UI Designer",
    email: "anderson@mail.com",
    location: "Miami, USA",
    phone: "+91(100)154–1254",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Amelia Armstrong",
    role: "Ethical Hacker",
    email: "armstrong@mail.com",
    location: "Tokyo, Japan",
    phone: "+91(154)199–1540",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Emily Atkinson",
    role: "Web Developer",
    email: "atkinson@mail.com",
    location: "Edinburgh, UK",
    phone: "+91(900)150–1500",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Sofia Bailey",
    role: "UX/UI Designer",
    email: "bailey@mail.com",
    location: "New York, USA",
    phone: "+91(001)160–1845",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Victoria Sharma",
    role: "Project Manager",
    email: "sharma@mail.com",
    location: "Miami, USA",
    phone: "+91(110)180–1600",
    image: "/assets/myimg.jpg",
  },
  {
    name: "Penelope Baker",
    role: "Web Developer",
    email: "baker@mail.com",
    location: "Edinburgh, UK",
    phone: "+91(405)483–4512",
    image: "/assets/myimg.jpg",
  },
];

const SellerData = () => {
  return (
    <div className="table-wrapper">
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={index}>
              <td className="name-cell">
                <img src={member.image} alt={member.name} className="avatar" />
                <div>
                  <p className="name">{member.name}</p>
                  <p className="role">{member.role}</p>
                </div>
              </td>
              <td>{member.email}</td>
              <td>{member.location}</td>
              <td>{member.phone}</td>
              <td className="actions">
                <FaEye className="icon" />
                <FaTrash className="icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerData;
