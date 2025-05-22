"use client";
import React, { useState } from "react";
import "./sellerdata.css";

const initialTeamMembers = [
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

const SellersData = () => {
  const [members, setMembers] = useState(
    initialTeamMembers.map((member) => ({ ...member, isBlocked: false }))
  );

  const toggleBlock = (index) => {
    const updatedMembers = [...members];
    updatedMembers[index].isBlocked = !updatedMembers[index].isBlocked;
    setMembers(updatedMembers);
  };

  const handleDelete = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  return (
    <div className="table-wrapper">
      <table className="team-table" role="table" aria-label="Team members table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Location</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
            <th scope="col">Block</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="name-cell" data-label="Name">
                <img src={member.image} alt={`${member.name}'s avatar`} className="avatar" />
                <div>
                  <p className="name">{member.name}</p>
                  <p className="role">{member.role}</p>
                </div>
              </td>
              <td data-label="Email">{member.email}</td>
              <td data-label="Location">{member.location}</td>
              <td data-label="Phone">{member.phone}</td>
              <td data-label="Action">
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </td>
              <td data-label="Block">
                <button
                  className={`block-btn ${member.isBlocked ? "unblock" : "block"}`}
                  onClick={() => toggleBlock(index)}
                >
                  {member.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellersData;
