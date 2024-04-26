import React, { useState, useContext } from "react";
import Portal from "./Portal";
import DataContext from './DataContext';

function App() {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const dataCtx = useContext(DataContext);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchRes([]); 
      return;
    }
    const filteredNotes = dataCtx.notes.filter((note) =>
      note.name.toLowerCase().includes(query.toLowerCase())
    )
    setSearchRes(filteredNotes)
  }

  const handleChange = (event) => {
    setSearch(event.target.value);
    handleSearch(event.target.value);
  };

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const handleAddNote = (event) => {
    event.preventDefault();
    const data = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value
    }
    dataCtx.addNote(data);
    closeModal();
  };

  return (
    <>
     <h1>NoteBook</h1>
     <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search notes..."
      />
     <p>Total Notes: {dataCtx.notes.length}</p>
     <p>Showing: {search.trim() === '' ? dataCtx.notes.length : searchRes.length}</p>
     <button onClick={openModal}>Add Note</button>
     {modal && (
        <Portal>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" />
            <button onClick={handleAddNote}>Add Note</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </Portal>
      )}
      <div>
      {search.trim() === '' ? (
        <div>
          {dataCtx.notes.map((note, index) => (
            <div key={index}>
              <h3>{note.name}</h3>
              <p>{note.description}</p>
              <button onClick={() => dataCtx.removeNote(index)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <ul>
          {searchRes.map((note) => (
            <li key={note.id}>{note.name}</li>
          ))}
        </ul>
      )}
      </div>
    </>
  );
}

export default App;
