// NoteList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from the backend when the component mounts
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h2>Note List</h2>
      <ul>
        {notes.map((note: any) => (
          <li key={note.id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;

