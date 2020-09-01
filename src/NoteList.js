import React from 'react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

class NoteList extends React.Component {

    render() {
        const notesArray = this.props.state.notes.map((el, index) => {
            const timeObj = new Date(el.modified)
            return (
                <Link key={index} to={`notes/${el.id}`} className="note-link-embed">
                    <div className="note-link" key={el.id}>
                        <div>
                            {el.name}
                        </div>
                        <div>
                            Modified {format(timeObj, ['d MMM yyyy'])} 
                        </div>
                    </div>
                </Link>
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