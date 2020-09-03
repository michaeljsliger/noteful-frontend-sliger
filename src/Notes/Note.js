import React from 'react';
import format from 'date-fns/format'
import NoteContext from './NoteContext';


class Note extends React.Component {

    render() {
        // const note = this.props.state.notes.find(el => {
        //     return el.id === this.props.match.params.note_id
        // })
        // const fileName = this.props.state.folders.find(el => {
        //     return note.folderId === el.id
        // }).name
        // const timeObj1 = new Date(note.modified)
        return (
            <NoteContext.Consumer>
                {(context) => {
                    console.log(context)
                    const note = context.notes.find(el => {
                        return el.id === this.props.match.params.note_id
                    }) || {};
                    const fileName = context.folders.find(el => {
                        return note.folderId === el.id
                    }) || {};
                    const timeObj1 = new Date(note.modified);
                    console.log(format(timeObj1, 'd MMM yyyy'));
                    return (
                        <div className="a-note">
                            <div>
                                <h3>
                                    {note.name}
                                </h3>
                                <h6>In file {fileName.name}</h6>
                                <button onClick={() => context.deleteNote(note.id, this.props.match.params)}>Delete Note</button>
                            </div>
                            <h6>Modified {/* (timeObj1, 'd MMM yyyy')*/}</h6>
                            <p>{note.content}</p>
                        </div>
                    )
                }
                }

            </NoteContext.Consumer>
        )
    }
}

export default Note;