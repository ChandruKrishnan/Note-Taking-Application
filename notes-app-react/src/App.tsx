import React from 'react';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';

const App: React.FC = () => {
  return (
    <div>
      <h1> Note Taking App</h1>
      <NoteList />
      <NoteForm  />
    </div>

  );
};

export default App;

