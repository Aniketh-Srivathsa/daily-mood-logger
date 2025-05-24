import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';

// Components
import Sidebar from './components/Sidebar'; // Import our new sidebar
import MoodForm from './components/MoodForm';
import MoodHistory from './components/MoodHistory';
import LandingPage from './components/LandingPage';

function App() {
  // State management
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState([]);
  const [currentTab, setCurrentTab] = useState('log');
  const [showLanding, setShowLanding] = useState(true);

  // Load saved mood logs on component mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('moodLogs');
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  // Visual effects: Spotlight and cursor trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate spotlight position
      const x = e.clientX;
      const y = e.clientY;
      const xPercent = (x / window.innerWidth) * 100;
      const yPercent = (y / window.innerHeight) * 100;
      
      // Update CSS variables for spotlight
      document.body.style.setProperty('--x', `${xPercent}%`);
      document.body.style.setProperty('--y', `${yPercent}%`);

      // Create trailing dot
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      document.body.appendChild(dot);

      // Remove dot after animation completes
      setTimeout(() => dot.remove(), 600);
    };

    // Add and clean up event listener
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Save mood log handler
  const handleSave = () => {
    if (!selectedMood) {
      toast.error('Please select a mood!');
      return;
    }

    // Create new log entry
    const today = new Date().toLocaleDateString();
    const newLog = { date: today, mood: selectedMood, note };

    // Update state and localStorage
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('moodLogs', JSON.stringify(updatedLogs));

    // Reset form
    setSelectedMood('');
    setNote('');
    toast.success('Mood saved successfully!');
  };

  // Navigation handler
  const handleNavigation = (tab) => {
    setCurrentTab(tab);
    setShowLanding(false);
  };

  // Render landing page if needed
  if (showLanding) {
    return (
      <div className="app">
        <LandingPage onSelect={handleNavigation} />
      </div>
    );
  }

  // Main application view
  return (
    <div className="app">
      {/* Use our new Sidebar component */}
      <Sidebar 
        onNavigate={handleNavigation} 
        currentTab={currentTab} 
        onHomePage={() => setShowLanding(true)} 
      />

      {/* Main Content Area */}
      <div className="content">
        {currentTab === 'log' ? (
          <MoodForm
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
            note={note}
            setNote={setNote}
            handleSave={handleSave}
          />
        ) : (
          <MoodHistory logs={logs} />
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;