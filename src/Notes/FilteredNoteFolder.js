import React from 'react';
import { Link } from 'react-router-dom';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';

class FilteredFolder extends React.Component {

  render() {


    const filtered = (context) => {
      return context.notes.filter(el => {
        return parseInt(el.folderid) === parseInt(this.props.match.params.folder_id)
      });
    }

    const folderName = (context) => (context.folders.find(el => {
      return parseInt(el.id) === parseInt(this.props.match.params.folder_id)
    }) || {}).name;

    const filteredFolder = (filtered) => filtered.map((el, index) => {
      return (
        <Link key={index} to={`/notes/${el.id}`} className="note-link-embed"><div className="note-link" key={el.id}>{el.name}</div></Link>
      )
    })


    return (
      <NoteContext.Consumer>
        {context => {
          console.log(filtered(context));
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

FilteredFolder.propTypes= {
  match: PropTypes.object
};

export default FilteredFolder;