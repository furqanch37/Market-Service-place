import Link from 'next/link';
import './addadmin.css';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

export default function AddAdmin() {
  return (
    <div className="login-wrapper">
      <div className="login-header">
        <h1 className="login-heading">Add Admin</h1>
        <Link href='/admin/SeeAllAdmin'>
          <button className="admin-button">See All Admin</button>
        </Link>
      </div>

      <div className="login-card">
        <h2 className='heading-form'>Enter Admin Details</h2>

        <form className="login-form">
          {/* First Name */}
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">First Name</label>
            <div className="input-wrapper">
              <FiUser className="icon" />
              <input id="firstName" type="text" placeholder="Enter first name" required />
            </div>
          </div>

          {/* Last Name */}
          <div className="input-group">
            <label htmlFor="lastName" className="input-label">Last Name</label>
            <div className="input-wrapper">
              <FiUser className="icon" />
              <input id="lastName" type="text" placeholder="Enter last name" required />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <div className="input-wrapper">
              <FiMail className="icon" />
              <input id="email" type="email" placeholder="Enter email" required />
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-wrapper">
              <FiLock className="icon" />
              <input id="password" type="password" placeholder="Enter password" required />
            </div>
          </div>

          <button type="submit" className="login-button">Add Admin</button>
        </form>
      </div>
    </div>
  );
}
