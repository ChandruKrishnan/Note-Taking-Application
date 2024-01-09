import React, { useState } from 'react';
import axios from 'axios';

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/notes', { title, content });
      // Optionally, you can reset the form or update the notes list
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating note TEST:', error);
    }
  };

  return (
    <div>
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default NoteForm;
