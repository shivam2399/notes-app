import React, { createContext, useState } from "react";

const DataContext = createContext({
    notes: [],
    addNote: () => {},
    removeNote: () => {},
});

export const DataContextProvider = (props) => {
    const [notes, setNotes] = useState([]);

    const addNote = ({name, description}) => {
        const newNote = {
            name: name,
            description: description
        }
        setNotes((prevNotes) => [...prevNotes, newNote])
    }

    const removeNote = (noteIndex) => {
        setNotes((prevNotes) => {
            const updatedNotes = [...prevNotes];
            updatedNotes.splice(noteIndex, 1);
            return updatedNotes
        })
    }

    const contextValue = {
        notes: notes,
        addNote: addNote,
        removeNote: removeNote,
      };
    
      return (
        <DataContext.Provider value={contextValue}>
          {props.children}
        </DataContext.Provider>
      );
}

export default DataContext;