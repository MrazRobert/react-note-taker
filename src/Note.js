import React from 'react';

const Note = ({item, index, openModal, removeItem}) => {
    const {id, note} = item;
    return (
        <div className="note-container">
            <div className="note-header">
            <h3>Note {index+1}</h3>
            <button className="remove-btn" onClick={() => removeItem(id)}>x</button>
            </div>
            <p>{note.substring(0,50)}{note.length < 50 || " ..."}</p>
            {note.length < 50 || 
                <button 
                    className="note-btn"
                    onClick={() => openModal(note)}
                >
                    View Detail
                </button>}
        </div>
    )
}

export default Note;