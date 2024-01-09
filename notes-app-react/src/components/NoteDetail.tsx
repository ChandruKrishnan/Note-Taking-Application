import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Note {
  id: number;
  title: string;
  content: string;
}

interface NoteDetailProps {
  noteId: number;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ noteId }) => {
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`/api/notes/${noteId}`);
        setNote(response.data);
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [noteId]);

  return (
    <div>
      <h2>Note Details</h2>
      {note ? (
        <div>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NoteDetail;
