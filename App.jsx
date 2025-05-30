import React, { useState, useEffect } from 'react';
import MoodForm from './components/MoodForm';
import MoodHistory from './components/MoodHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState([]);
  const [currentTab, setCurrentTab] = useState('log');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('moodLogs');
    if (saved) setLogs(JSON.parse(saved));
  }, []);

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

  const handleSave = () => {
    if (!selectedMood) {
      toast.error('Please select a mood!');
      return;
    }

    const today = new Date().toLocaleDateString();
    const newLog = { date: today, mood: selectedMood, note };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('moodLogs', JSON.stringify(updatedLogs));

    setSelectedMood('');
    setNote('');

    toast.success('Mood saved successfully!');
  };

  // Toggle theme class on <body>
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="sidebar">
        <h2>Mood Logger</h2>
        <button
          onClick={() => setCurrentTab('log')}
          className={currentTab === 'log' ? 'active' : ''}
        >
          Log Mood
        </button>
        <button
          onClick={() => setCurrentTab('history')}
          className={currentTab === 'history' ? 'active' : ''}
        >
          Mood History
        </button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

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

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
