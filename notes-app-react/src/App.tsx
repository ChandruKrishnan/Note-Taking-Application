import React from 'react';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';

const App: React.FC = () => {
  return (
    <div>
      <NoteList />
    </div>
  );
};

export default App;

