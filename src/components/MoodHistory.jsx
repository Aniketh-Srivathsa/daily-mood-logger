import React from 'react';
import './MoodHistory.css';

// Mapping of moods to emojis
const moodEmojis = {
  'Happy': '😄',
  'Neutral': '😐',
  'Sad': '😢',
  'Angry': '😡',
  'Excited': '🤩'
};

function MoodHistory({ logs }) {
  return (
    <div className="history">
      <h2>Mood History</h2>
      
      {logs.length === 0 ? (
        <div className="empty-state">
          <p>No moods logged yet. Start tracking how you feel!</p>
        </div>
      ) : (
        <div className="mood-logs-container">
          {logs.map((log, index) => (
            <div 
              key={index} 
              className="mood-log"
              data-mood={log.mood}
            >
              <div className="date">{log.date}</div>
              <div className="mood">
                <span className="mood-text">{log.mood}</span>
                <span className="emoji">{moodEmojis[log.mood] || ''}</span>
              </div>
              {log.note && <div className="note">{log.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoodHistory;