import React from 'react';
import dummyStore from './dummy-store';
import { NavLink } from 'react-router-dom';

class FolderList extends React.Component {

    render() {
        const folderArr = dummyStore.folders.map((el, index) => {
            return (
            <NavLink key={index} to={`/folder/${el.id}`} className="folder-box"><h3>{el.name}</h3></NavLink>
            )
        })
        return(
            <ul className="folder-list">
                <h3>Folders</h3>
                {folderArr}
            </ul>
        )
    }
}

export default FolderList;