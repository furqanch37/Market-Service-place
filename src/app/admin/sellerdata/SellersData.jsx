"use client";
import React, { useEffect, useState } from "react";
import "./sellerdata.css";
import Cookies from "js-cookie";

const SellersData = () => {
  const [members, setMembers] = useState([]);
console.log("All cookies:", document.cookie);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const token = Cookies.get("token");
        console.log("Token from cookie:", token); // ✅ Log token

        const response = await fetch(
          "https://backend-service-marketplace.vercel.app/api/users/sellers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error("Failed to fetch sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleToggleBlock = async (id, isBlocked) => {
    try {
      const token = Cookies.get("token");
      console.log("Token for block/unblock:", token); // ✅ Log token

      const url = `https://backend-service-marketplace.vercel.app/api/users/${id}/${isBlocked ? "unblock" : "block"}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to update block status");

      setMembers((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, isBlocked: !isBlocked } : m
        )
      );
    } catch (error) {
      console.error("Block/Unblock error:", error);
    }
  };

  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((m) => m._id !== id));
  };

  return (
    <div className="table-wrapper">
      <table className="team-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Country</th><th>Action</th><th>Block</th></tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}><td className="name-cell">
              <img
                src={member.image || "/assets/myimg.jpg"}
                alt={member.name}
                className="avatar"
              />
              <div>
                <p className="name">{member.name}</p>
                <p className="role">{member.role || "Seller"}</p>
              </div>
            </td><td>{member.email}</td><td>{member.location || "N/A"}</td><td>
              <button className="delete-btn" onClick={() => handleDelete(member._id)}>
                Delete
              </button>
            </td><td>
              <button
                className={`block-btn ${member.isBlocked ? "unblock" : "block"}`}
                onClick={() => handleToggleBlock(member._id, member.isBlocked)}
              >
                {member.isBlocked ? "Unblock" : "Block"}
              </button>
            </td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellersData;
