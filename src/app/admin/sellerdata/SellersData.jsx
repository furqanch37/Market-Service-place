"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./sellerdata.css";

const SellersData = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sellers on mount
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = Cookies.get("token");
        const res = await fetch(
          "https://backend-service-marketplace.vercel.app/api/users/sellers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch sellers");

        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          setMembers(data.users);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  // Block or unblock user
  const toggleBlock = async (id, currentlyBlocked) => {
    try {
      const token = Cookies.get("token");
      const url = `https://backend-service-marketplace.vercel.app/api/users/${id}/${currentlyBlocked ? "unblock" : "block"}`;

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
          credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update block status");

      // Update local state
      setMembers((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, blocked: !currentlyBlocked } : m
        )
      );
    } catch (err) {
      alert("Error toggling block status: " + err.message);
    }
  };

  // Delete user locally (optional: you can also call API if available)
  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((m) => m._id !== id));
  };

  if (loading) return <p>Loading sellers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-wrapper">
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Action</th>
            <th>Block</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan={5}>No sellers found.</td>
            </tr>
          ) : (
            members.map((member) => (
              <tr key={member._id}>
                <td className="name-cell">
                  <img
                    src={member.image || "/assets/myimg.jpg"}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="avatar"
                  />
                  <div>
                    <p className="name">{member.firstName} {member.lastName}</p>
                    <p className="role">{(member.role || []).join(", ")}</p>
                  </div>
                </td>
                <td>{member.email}</td>
                <td>{member.country || "N/A"}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className={`block-btn ${member.blocked ? "unblock" : "block"}`}
                    onClick={() => toggleBlock(member._id, member.blocked)}
                  >
                    {member.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellersData;
