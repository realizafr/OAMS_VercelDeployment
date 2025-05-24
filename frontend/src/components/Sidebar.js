import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

// Fixed green sidebar component using PNG icons and ptclogo
function FixedGreenSidebar({ onHover, onLeave }) {
  const icons = [
    { label: "Dashboard", path: "/dashboard", icon: "/dash.png" },
    { label: "Application Form", path: "/application-form", icon: "/form.png" },
    { label: "Application Status", path: "/application-status", icon: "/status.png" },
    { label: "Payment Information", path: "/payment-information", icon: "/payment.png" },
    { label: "Documents Upload", path: "/document-upload", icon: "/docs.png" },
    { label: "Messages", path: "/messages", icon: "/message.png" },
    { label: "Profile", path: "/profile", icon: "/profile.png" },
  ];
  return (
    <div
      className="fixed-green-sidebar"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <img src="/ptclogo.png" alt="PTC Logo" className="sidebar-logo-fixed" />
      <nav className="sidebar-nav-fixed">
        {icons.map((item) => (
          <a key={item.label} href={item.path} title={item.label}>
            <img
              src={item.icon}
              alt={item.label}
              className="sidebar-fixed-icon"
            />
          </a>
        ))}
      </nav>
    </div>
  );
}

const buttons = [
  { label: "Homepage", path: "/dashboard" },
  { label: "Application Form", path: "/application-form" },
  { label: "Application Status", path: "/application-status" },
  { label: "Payment Information", path: "/payment-information" },
  { label: "Documents Upload", path: "/document-upload" },
  { label: "Messages", path: "/messages" },
  { label: "Profile", path: "/profile" }
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => setCollapsed(false);
  const handleMouseLeave = () => setCollapsed(true);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <FixedGreenSidebar
        onHover={handleMouseEnter}
        onLeave={handleMouseLeave}
      />
      <div
        className={`messages-sidebar ${collapsed ? "collapsed" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ left: 68 }}
      >
        <div className="sidebar-content-wrapper">
          <div className="ptc-oams-text">
            <span style={{ fontWeight: "bold", fontSize: 22, color: "#2c781d", letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", height: 38 }}>PTC OAMS</span>
          </div>
          <div className="sidebar-btns-aligner">
            {buttons.map((btn) => (
              <div className="sidebar-btn-row" key={btn.label}>
                <button
                  onClick={() => navigate(btn.path)}
                  onMouseEnter={() => setHoveredButton(btn.label)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onFocus={() => setHoveredButton(btn.label)}
                  onBlur={() => setHoveredButton(null)}
                  className={hoveredButton === btn.label ? "hovered" : ""}
                >
                  <span>{btn.label}</span>
                </button>
              </div>
            ))}
          </div>
          <div className="sidebar-btn-row sign-out-row">
            <button
              onClick={handleSignOut}
              onMouseEnter={() => setHoveredButton('Sign Out')}
              onMouseLeave={() => setHoveredButton(null)}
              onFocus={() => setHoveredButton('Sign Out')}
              onBlur={() => setHoveredButton(null)}
              className={`sign-out-button ${hoveredButton === 'Sign Out' ? 'hovered' : ''}`}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;