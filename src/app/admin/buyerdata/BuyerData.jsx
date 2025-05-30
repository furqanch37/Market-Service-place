"use client";
import React, { useEffect, useState } from "react";
import "./buyerdata.css";

// Helper function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const API_BASE = "https://backend-service-marketplace.vercel.app/api/users";

const BuyerData = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const token = getCookie("token");

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const res = await fetch(`${API_BASE}/buyers`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch buyers");
        const data = await res.json();
        setMembers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, [token]);

  const toggleBlock = async (userId, currentlyBlocked) => {
    setUpdatingUserId(userId);
    try {
      const url = `${API_BASE}/${userId}/${currentlyBlocked ? "unblock" : "block"}`;

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to update block status");

      setMembers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, blocked: !currentlyBlocked } : user
        )
      );
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUpdatingUserId(null);
    }
  };

  if (loading) return <p>Loading buyers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-wrapper">
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Verified</th>
            <th>Block</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.firstName} {member.lastName}</td>
              <td>{member.email}</td>
              <td>{member.country}</td>
              <td>{member.verified ? "Yes" : "No"}</td>
              <td>
                <button
                  className={`block-btn ${member.blocked ? "unblock" : "block"}`}
                  onClick={() => toggleBlock(member._id, member.blocked)}
                  disabled={updatingUserId === member._id}
                >
                  {updatingUserId === member._id
                    ? member.blocked
                      ? "Unblocking..."
                      : "Blocking..."
                    : member.blocked
                      ? "Unblock"
                      : "Block"
                  }
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerData;
