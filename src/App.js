import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Misc/Header';
import FolderList from './Folders/FolderList';
import NoteList from './Notes/NoteList';
import Note from './Notes/Note';
import GoBack from './Misc/GoBack';
import FilteredFolder from './Notes/FilteredNoteFolder';
import NoteContext from './Notes/NoteContext';
import AddFolder from './Folders/AddFolder';
import AddNote from './Notes/AddNote';
import ErrorBoundary from './ErrorHandlers/ErrorBoundary';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
  }

  componentDidMount() {
    fetch('http://localhost:9090/notes').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(json => this.setState({ notes: json }));
    fetch('http://localhost:9090/folders').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(json => this.setState({ folders: json }));
  }

  // deleteNote = (id) => {
  //   const arrA = this.state.notes;
  //   console.log(arrA.splice(arrA.indexOf(arrA.find(el => el.id === id)), 1));
  //   // this.setState({notes: []});
  // }



  deleteNoteAPIRequest = (noteId, params) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {}
    }).then(res => {
      if (!res.ok) {
        return res.json().then(error => { throw error })
      }
      return res.json()
    }).then(data => {
      const arrInd = this.state.notes.indexOf(this.state.notes.find(el => el.id === noteId))
      const newArrB = this.state.notes.slice(0, arrInd);
      const newArrA = this.state.notes.slice(arrInd + 1, this.state.notes.length - 1);
      this.setState({ notes: [...newArrB, ...newArrA] })
    }).then(() => {
      // if the delete button, when clicked in a nested note page, it will have params
      // so if there are params, relocate to /
      if (params) window.location.href = '/';
    })
      .catch(e => console.error(e))
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNoteAPIRequest
    }

    return (
      <div className="App">
        <header>

          <Route path='/' component={Header} />
        </header>
        <main>
          <NoteContext.Provider value={contextValue}>
            <div className="sidebar">
              <Route path='/:notes/' component={GoBack} />
              <Route path='/' render={(props) => {
                return <FolderList {...props} />
              }} />
            </div>
            <div className="content-module">
              <Switch>
                <ErrorBoundary>
                  <Route exact path='/' component={NoteList} />
                  <Route path='/folder/:folder_id/' render={(props) => {
                    return <FilteredFolder {...props} />
                  }} />
                  <Route path='/notes/:note_id' render={(props) => <Note  {...props} />} />
                  <Route path='/addFolder' component={AddFolder} />
                  <Route path='/addnote' component={AddNote} />
                </ErrorBoundary>
              </Switch>
            </div>
          </NoteContext.Provider>
        </main>
      </div>
    );
  }
}

export default App;
