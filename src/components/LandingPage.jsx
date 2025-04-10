import React from 'react';
import './LandingPage.css';

function LandingPage({ onSelect }) {
  return (
    <div className="landing">
      <h1>Welcome to Daily Mood Logger</h1>
      <p>Track how you're feeling. Every day matters. 🌈</p>
      <div className="landing-buttons">
        <button onClick={() => onSelect('log')}>Log Mood</button>
        <button onClick={() => onSelect('history')}>View Mood History</button>
      </div>
    </div>
  );
}

export default LandingPage;
