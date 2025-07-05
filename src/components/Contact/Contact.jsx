'use client'
import React, { useState } from "react";
import "./style.css";
import { baseUrl } from "@/const";

// e.g., http://localhost:5000 or https://yourdomain.com

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/users/send-data-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ success: true, message: "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ success: false, message: data.message || "Something went wrong." });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ success: false, message: "Failed to send message. Try again later." });
    }
  };

  return (
    <div className="contact-page">
      {/* Section 1: Get in Touch */}
      <section className="contact-hero">
        <h1>Get in touch</h1>
        <p>
          Fill out the form below and a DoTask representative will contact you
          as soon as possible. <br />
          For immediate assistance, please call our sales line or email our customer support.
        </p>
      </section>

      {/* Section 3: Contact Form */}
      <section className="contact-form-section">
        <img
          src="/assets/contact/map.png"
          alt="Map Background"
          className="map-background"
        />

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="I would like to know about... *"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="btn-primary">Submit</button>

          {/* Feedback */}
          {status.message && (
            <p className={status.success ? "success-text" : "error-text"}>
              {status.message}
            </p>
          )}
        </form>
      </section>

      {/* Section 2: Join dotask */}
      <section className="contact-join">
        <img
          src="/assets/contact/map.png"
          alt="Graphic"
          className="contact-join-image"
        />
        <h2>DoTask Connects the Top 3% of Freelance Talent All Over The World.</h2>
      </section>

      <section className="contact-cta">
        <p className="join-text">Join the DoTask community.</p>
        <div className="join-buttons">
          <button className="btn-primary">Hire Top Talent</button>
          <span>or</span>
          <button className="btn-outline">Apply as a Freelancer</button>
        </div>
      </section>
    </div>
  );
};

export default Contact;
