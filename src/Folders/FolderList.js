import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NoteContext from '../Notes/NoteContext';


class FolderList extends React.Component {

    render() {
        const folderArr = (cont) => {
            if (cont) return cont.folders.map((el, index) => {
                return (
                    <NavLink key={index} to={`/folder/${el.id}`} className="folder-box"><h3>{el.name}</h3></NavLink>
                )
            })
        }
        return (
            <NoteContext.Consumer>
                {(context) => {
                    return (
                        <div>
                        <ul className="folder-list">
                            <h3>Folders</h3>
                            {folderArr(context)}
                        </ul>
                        <Link to="/addfolder"><button>Add Folder</button></Link>
                        </div>
                    )
                }}
            </NoteContext.Consumer>
        )
    }
}

export default FolderList;