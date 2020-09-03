import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from './NoteContext';

class FilteredFolder extends React.Component {

  render() {


    const filtered = (context) => context.notes.filter(el => {
      return el.folderId === this.props.match.params.folder_id
    }) || [];

    const folderName = (context) => (context.folders.find(el => {
      return el.id === this.props.match.params.folder_id
    }) || {}).name;

    const filteredFolder = (filtered) => filtered.map((el, index) => {
      return (
        <Link key={index} to={`/notes/${el.id}`} className="note-link-embed"><div className="note-link" key={el.id}>{el.name}</div></Link>
      )
    })


    return (
      <NoteContext.Consumer>
        {context => {
          return (
            <div>
              <h2>{folderName(context)}</h2>
              <div className="note-list">{filteredFolder(filtered(context))}</div>
            </div>
          )
        }
        }
      </NoteContext.Consumer>
    )
  }
}

export default FilteredFolder;