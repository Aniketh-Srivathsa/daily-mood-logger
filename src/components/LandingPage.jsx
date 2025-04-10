import React, { useEffect } from 'react';
import './LandingPage.css';

function LandingPage({ onSelect }) {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.body.style.setProperty('--x', `${x}%`);
      document.body.style.setProperty('--y', `${y}%`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="landing">
      <h1>Welcome to Daily Mood Logger</h1>
      <p>Track how you're feeling. Every day matters. 🌙</p>
      <div className="landing-buttons">
        <button onClick={() => onSelect('log')}>Log Mood</button>
        <button onClick={() => onSelect('history')}>View Mood History</button>
      </div>
    </div>
  );
}

export default LandingPage;
