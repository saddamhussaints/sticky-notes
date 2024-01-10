import { useState } from 'react';
import './App.css';
import StickyNotes from './components/StickyNotes';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "Hello"
    }

  ]);

  const addNotes = () => {
    const newNotes = {
      id: notes.length + 1,
      text: "New Note"
    }
    setNotes([...notes, newNotes])
  }
  const DeleteNotes = (id) => {
    console.log("Dee", id)
    setNotes((prev) => prev.filter((notes) => notes.id !== id))
  }
  const UpdateNotes = (id, newText) => {
    setNotes((prevNotes) => prevNotes.map((note) => note.id === id ? { ...note, text: newText } : note))
  }
  return (
    <div className="App">
      <div className='main-header-section'>
        <h2 className='title'>Sticky Notes</h2>
        <button className='notes-addbtn' onClick={addNotes}>+</button>
      </div>
        <div>
          {notes.map((note) => <StickyNotes
            key={note.id}
            note={note}
            deleteNotes={DeleteNotes}
            updateNotes={UpdateNotes}
          />)}
      </div>
    </div>
  );
}

export default App;
