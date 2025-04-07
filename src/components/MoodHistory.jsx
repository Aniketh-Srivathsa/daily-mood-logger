import React from 'react';
import './MoodHistory.css';

function MoodHistory({ logs }) {
  return (
    <div className="history">
      <h2>Mood History</h2>
      {logs.length === 0 ? (
        <p>No moods logged yet.</p>
      ) : (
        <div>
          {logs.map((log, index) => (
            <div key={index} className="mood-log">
              <strong>{log.date} – {log.mood}</strong>
              <p>{log.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MoodHistory;
