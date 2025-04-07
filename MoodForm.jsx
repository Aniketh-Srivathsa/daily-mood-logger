import React from 'react';
import './MoodForm.css';

const moods = [
  { label: 'Happy', emoji: '😄' },
  { label: 'Neutral', emoji: '😐' },
  { label: 'Sad', emoji: '😢' },
  { label: 'Angry', emoji: '😡' },
  { label: 'Excited', emoji: '🤩' }
];

const MoodForm = ({ selectedMood, setSelectedMood, note, setNote, handleSave }) => {
  return (
    <form>
      <label>Select your mood:</label>
      <div className="emoji-picker">
        {moods.map((mood) => (
          <button
            type="button"
            key={mood.label}
            className={`emoji-btn ${selectedMood === mood.label ? 'active' : ''}`}
            onClick={() => setSelectedMood(mood.label)}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      <label>Add a note (optional):</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        placeholder="How are you feeling today?"
      ></textarea>

      <button type="button" className="save-btn" onClick={handleSave}>
        Save Mood
      </button>
    </form>
  );
};

export default MoodForm;
