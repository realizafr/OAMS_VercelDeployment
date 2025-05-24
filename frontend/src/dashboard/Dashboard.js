import React from "react";
import Sidebar from "../components/Sidebar"; // Adjust the path if needed
import "./Dashboard.css"; // Ensure this CSS file is linked

function Dashboard() {
  // Helper function for navigation (or replace with React Router's useNavigate)
  const navigateTo = (path) => {
    console.log('Navigating to ${path}...');
    window.location.href = path; // Simple page reload for demonstration
    // In a real React app with react-router-dom, you'd use:
    // const navigate = useNavigate();
    // navigate(path);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      {/* Main content area for the dashboard */}
      <div className="dashboard-main-content">
        {/* Top Header Section */}
        <header className="dashboard-header">
          <div className="header-overlay">
            {/* Adding text to the header overlay, assuming it's meant to have text */}
          </div>
          {/* Background image is handled by CSS */}
        </header>

        {/* Info Cards Section - Make these NOT clickable/highlightable */}
        <section className="info-cards-section">
          {/* Removed clickable-card class and onClick */}
          <div className="info-card">
            <img
              src="https://img.freepik.com/free-vector/calendar-icon-white-background_1308-84634.jpg"
              className="info-card-icon"
              alt="Calendar icon"
            />
            <p className="info-card-text">
              <span className="info-card-highlight">30+ Years</span> of Academic Excellence
            </p>
          </div>
          {/* Removed clickable-card class and onClick */}
          <div className="info-card">
            <img
              src="https://media.istockphoto.com/id/1205507976/vector/graduate-cap-logo-university-mortarboard.jpg?s=612x612&w=0&k=20&c=X_WSdETOyZPl9KeYSdYCYCltoS7cYwUtQHM6hbj_QqQ="
              className="info-card-icon"
              alt="Graduation cap icon"
            />
            <p className="info-card-text">
              <span className="info-card-highlight">5,000+</span> Enrolled Students
            </p>
          </div>
          {/* Removed clickable-card class and onClick */}
          <div className="info-card">
            <img
              src="https://chedcar.com/wp-content/uploads/2020/09/Commission_on_Higher_Education_CHEd.svg_.png"
              className="info-card-icon"
              alt="CHED logo"
            />
            <p className="info-card-text">
              <span className="info-card-highlight">CHED Recognized</span> Quality Education
            </p>
          </div>
        </section>

        {/* This is the new container for the two-column layout */}
        <div className="dashboard-columns-container">
          {/* Latest Announcements Section - Keep these clickable/highlightable */}
          <section className="announcements-section">
            <h2 className="section-title">Latest Announcements</h2>
            <ul className="announcement-list">
              {/* Keep clickable-list-item class and onClick */}
              <li className="announcement-item clickable-list-item" onClick={() => navigateTo('/announcements/early-bird-details')}>
                <h3 className="announcement-heading">Early Bird Enrollment Discount</h3>
                <p className="announcement-detail">
                  Get 10%-off on tuition fees when you enroll before July 15, 2025.
                </p>
                <span className="announcement-date">Posted: June 1, 2025</span>
              </li>
              {/* Keep clickable-list-item class and onClick */}
              <li className="announcement-item clickable-list-item" onClick={() => navigateTo('/announcements/scholarship-details')}>
                <h3 className="announcement-heading">Scholarship Applications Open</h3>
                <p className="announcement-detail">
                  Academic and athletic scholarship applications for AY 2025-2026 are now open.
                </p>
                <span className="announcement-date">Posted: June 18, 2025</span>
              </li>
              {/* Keep clickable-list-item class and onClick */}
              <li className="announcement-item clickable-list-item" onClick={() => navigateTo('/announcements/new-courses-details')}>
                <h3 className="announcement-heading">New Course Offerings</h3>
                <p className="announcement-detail">
                  BS in Data Science and BS in Artificial Intelligence now available.
                </p>
                <span className="announcement-date">Posted: June 18, 2025</span>
              </li>
            </ul>
          </section>

          {/* Important Information Section - Make these NOT clickable/highlightable */}
          <section className="info-section">
            <h2 className="section-title">Important Information</h2>
            <ul className="info-list">
              {/* Removed clickable-list-item class and onClick */}
              <li className="info-item">
                <h3 className="info-heading">Enrollment Period</h3>
                <p className="info-detail">July 1 - August 15, 2025</p>
              </li>
              {/* Removed clickable-list-item class and onClick */}
              <li className="info-item">
                <h3 className="info-heading">Start of Classes</h3>
                <p className="info-detail">August 29, 2025</p>
              </li>
              {/* Removed clickable-list-item class and onClick */}
              <li className="info-item">
                <h3 className="info-heading">Requirements Deadline</h3>
                <p className="info-detail">August 1, 2025</p>
              </li>
            </ul>
          </section>
        </div> {/* End dashboard-columns-container */}

        {/* Academic Programs Section - Make these NOT clickable/highlightable */}
        <section className="academic-programs-section">
          <h2 className="section-title">Academic Programs</h2>
          <div className="academic-programs-grid">
            {/* Removed clickable-card class and onClick */}
            <div className="program-card">
              <h3 className="program-heading">College of Engineering</h3>
              <ul className="program-list">
                <li>BS in Civil Engineering</li>
                <li>BS in Electrical Engineering</li>
                <li>BS in Computer Engineering</li>
              </ul>
            </div>
            {/* Removed clickable-card class and onClick */}
            <div className="program-card">
              <h3 className="program-heading">College of Information Technology</h3>
              <ul className="program-list">
                <li>BS in Information Technology</li>
                <li>BS in Computer Science</li>
                <li>BS in Information Systems</li>
              </ul>
            </div>
            {/* Removed clickable-card class and onClick */}
            <div className="program-card">
              <h3 className="program-heading">College of Business</h3>
              <ul className="program-list">
                <li>BS in Business Administration</li>
                <li>BS in Accountancy</li>
                <li>BS in Tourism Management</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information Section - Make these NOT clickable/highlightable */}
        <section className="contact-info-section">
          <h2 className="section-title">Contact Information</h2>
          <div className="contact-details-grid">
            {/* Removed clickable-card class and onClick */}
            <div className="contact-address">
              <h3 className="contact-heading">Main Campus Address:</h3>
              <p>123 College Road, Pateros, Metro Manila</p>
            </div>
            {/* Removed clickable-card class and onClick */}
            <div className="contact-numbers">
              <h3 className="contact-heading">Contact Numbers:</h3>
              <p>+63 (2) 8123-4567</p>
              <p>+63 917-123-4567</p>
            </div>
            {/* Removed clickable-card class and onClick */}
            <div className="contact-email">
              <h3 className="contact-heading">Email:</h3>
              <p>admissions@ptc.edu.ph</p>
            </div>
            {/* Removed clickable-card class and onClick */}
            <div className="contact-hours">
              <h3 className="contact-heading">Office Hours:</h3>
              <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </section>
      </div> {/* End dashboard-main-content */}
    </div>
  );
}

export default Dashboard;