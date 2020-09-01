import React from 'react';
import format from 'date-fns/format'

function Note(props, state) {
    const note = state.notes.find(el => {
        return el.id === props.match.params.note_id
    })
    const fileName = state.folders.find(el => {
        return note.folderId === el.id
    }).name
    const timeObj1 = new Date(note.modified)

    return (
        <div className="a-note">
            <h3>
                {note.name}
            </h3>
            <h6>In file > {fileName}</h6>
            <h6>Modified {format(timeObj1, 'd MMM yyyy')}</h6>
            <p>{note.content}</p>
        </div>
    )
}

export default Note;