import React from 'react';
import NoteContext from './NoteContext';
import cuid from 'cuid';

const postObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: {}
}


class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            folder: {
                value: '',
                touched: false
            }
        }
    }

    updateName(name) {
        this.setState({name: {value: name, touched: true}})
    }
    updateContent(content) {
        this.setState({content: {value: content, touched: true}})
    }
    updateFolder(folder) {
        this.setState({folder: {value: folder, touched: true}})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {name, content, folder} = this.state;
        console.log(name.value)
        console.log(content.value)
        console.log(folder.value)
        postObj.body = JSON.stringify({
            name: name.value,
            content: content.value,
            folderId: folder.value,
            modified: Date.now(),
            id: cuid()
        })
        console.log(postObj)
        fetch(`http://localhost:9090/notes`, postObj)
            .then(res => res.json())
            .then(data => {
                this.updateFolder('');
                this.updateContent('');
                this.updateName('');
                window.location.href = '/'
            })

    }


    render() {
        return (
            <NoteContext.Consumer>
                {context => {
                    const folderOptions = context.folders.map((el, index) => {
                    return (<option key={index} value={el.id}>{el.name}</option>)
                    })
                    return (
                        <div>
                            <form onSubmit={e => this.handleSubmit(e)}>
                                <fieldset>
                                    <legend>Add a note:</legend>
                                    <label htmlFor="addnote-input-name">Name:</label>
                                    <input type='text' name="addnote-name" id="addnote-name" onChange={event => this.updateName(event.target.value)}/>
                                    <label htmlFor="addnote-input-content">Content:</label>
                                    <input type='text' name="addnote-content" id="addnote-content" onChange={event => this.updateContent(event.target.value)}/>
                                    <label htmlFor="addnote-input-folder">Select Folder:</label>
                                    <select name="addnote-folder" id="addnote-folder" onChange={event => this.updateFolder(event.target.value)}>
                                       <option value="">Select one!</option>
                                        {folderOptions}
                                    </select>
                                    <button type='submit'>Submit</button>
                                </fieldset>
                            </form>
                        </div>
                    )
                }
                }
            </NoteContext.Consumer>
        )
    }
}



export default AddNote;
