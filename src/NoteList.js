import React from 'react';
import { Link } from 'react-router-dom'

class NoteList extends React.Component {

    render() {
        const notesArray = this.props.state.notes.map((el, index) => {
            return (
                <Link key={index} to={`notes/${el.id}`} className="note-link-embed"><div className="note-link" key={el.id}>{el.name}</div></Link>
            )
        })
        return (
            <div>
                <h2>Notes</h2>
                <ul className="note-list">
                    {notesArray}
                </ul>
            </div>
        )
    }
}

export default NoteList;