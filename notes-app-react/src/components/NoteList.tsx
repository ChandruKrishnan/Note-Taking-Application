import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Note {
  id: number;
  title: string;
  content: string;
}

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNotes, setSelectedNotes] = useState<number[]>([]);

  useEffect(() => {
    // Fetch notes and update the state
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []); // Include any dependencies as needed

  const toggleSelectNote = (noteId: number) => {
    setSelectedNotes((prevSelectedNotes) => {
      if (prevSelectedNotes.includes(noteId)) {
        return prevSelectedNotes.filter((id) => id !== noteId);
      } else {
        return [...prevSelectedNotes, noteId];
      }
    });
  };

  const deleteSelectedNotes = async () => {
    try {
      // Make a DELETE request for each selected note
      await Promise.all(selectedNotes.map((noteId) => axios.delete(`http://localhost:5000/api/notes${noteId}`)));

      // Update the state to reflect the deleted notes
      setNotes((prevNotes) => prevNotes.filter((note) => !selectedNotes.includes(note.id)));
      setSelectedNotes([]); // Clear the selected notes after deletion
    } catch (error) {
      console.error('Error deleting notes:', error);
    }
  };

  return (
    <div>
      <h2>Note List</h2>
      <button onClick={deleteSelectedNotes}>Delete Selected Notes</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <input
              type="checkbox"
              checked={selectedNotes.includes(note.id)}
              onChange={() => toggleSelectNote(note.id)}
            />
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
