import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from './NoteContext';




class NoteList extends React.Component {

    render() {
        const notesArray = (cont) => cont.notes.map((el, index) => {
            const timeObj = new Date(el.modified)
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            return (
                <div className="note-link" key={el.id}>
                    <Link key={index} to={`notes/${el.id}`} className="note-link-embed">
                        <div>
                            {el.name}
                        </div>
                        <div>
                            Modified {timeObj.toLocaleDateString('en-US', options)}
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
                        {!(notesArray(context)).length ? <p>'Make sure you have the server up'</p> : ''}
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