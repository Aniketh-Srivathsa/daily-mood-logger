// Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css'; // We'll create this file next

const Sidebar = ({ onNavigate, currentTab, onHomePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (tab) => {
    onNavigate(tab);
    // Optional: close the sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Button */}
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <h2 className="logo" onClick={onHomePage}>
            Mood Logger
          </h2>
          <nav className="sidebar-nav">
            <button
              onClick={() => handleNavClick('log')}
              className={currentTab === 'log' ? 'active' : ''}
            >
              Log Mood
            </button>
            <button
              onClick={() => handleNavClick('history')}
              className={currentTab === 'history' ? 'active' : ''}
            >
              Mood History
            </button>
          </nav>
        </div>
        
        {/* Overlay for mobile to close sidebar when clicking outside */}
        {isOpen && (
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        )}
      </div>
    </>
  );
};

export default Sidebar;