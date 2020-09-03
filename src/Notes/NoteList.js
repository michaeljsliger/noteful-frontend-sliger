import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import NoteContext from './NoteContext';



class NoteList extends React.Component {

    render() {
        const notesArray = (cont) => cont.notes.map((el, index) => {
            const timeObj = new Date(el.modified)
            return (
                <div className="note-link" key={el.id}>
                    <Link key={index} to={`notes/${el.id}`} className="note-link-embed">
                        <div>
                            {el.name}
                        </div>
                        <div>
                            Modified {format(timeObj, ['d MMM yyyy'])}
                        </div>
                </Link>
                        <div>
                            <button onClick={() => cont.deleteNote(el.id)}>Delete</button>
                        </div>
                    </div>
            )
        })

        return (
            <NoteContext.Consumer>
                {context => {
                    return (
                <div>
                    <h2>Notes</h2>
                    <ul className="note-list">
                        {notesArray(context)}
                    </ul>
                    <Link to="/addnote"><button>Add Note</button></Link>
                </div>
                    )
                }}
            </NoteContext.Consumer>
        )
    }
}

export default NoteList;