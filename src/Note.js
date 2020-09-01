import React from 'react';
import { Link } from 'react-router-dom';
import dummyStore from './dummy-store';

function Note(props, state) {
    const note = state.notes.find(el => {
        return el.id === props.match.params.note_id
    })
    const fileName = state.folders.find(el => {
        return note.folderId === el.id
    }).name

    return (
        <div className="a-note">
            <h3>
                {note.name}
            </h3>
            <h6>{fileName}</h6>
            <p>{note.content}</p>
        </div>
    )

}

export default Note;