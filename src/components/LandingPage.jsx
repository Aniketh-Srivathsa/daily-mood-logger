import React from 'react';
import './LandingPage.css';

function LandingPage({ onSelect }) {
  return (
    <div className="landing">
      {/* Star particles */}
      <div className="stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className="content-wrapper">
        <h1>Welcome to MoodLogger</h1>
        <p>Track how you're feeling. Every day matters. 
          <span className="moon-container">
            <span className="moon">🌙</span>
          </span>
        </p>
        <div className="landing-buttons">
          <button onClick={() => onSelect('log')}>Log Mood</button>
          <button onClick={() => onSelect('history')}>View Mood History</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;