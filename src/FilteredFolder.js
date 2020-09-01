import React from 'react';
import {Link} from 'react-router-dom';

function FilteredFolder(props){

        const filtered = props.state.notes.filter(el => {
            return el.folderId === props.match.params.folder_id
        });

        const folderName = props.state.folders.find(el => {
            return el.id === props.match.params.folder_id
        }).name

        const filteredFolder = filtered.map((el, index) => {
          return (
            <Link key={index} to={`/notes/${el.id}`} className="note-link-embed"><div className="note-link" key={el.id}>{el.name}</div></Link>
          )  
        })
        
        
        return (
        <div>
            <h2>{folderName}</h2>
            <div className="note-list">{filteredFolder}</div>
        </div>
        )

}

export default FilteredFolder;