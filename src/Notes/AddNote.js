import React from 'react';
import NoteContext from './NoteContext';
import cuid from 'cuid';
import ErrorForm from '../ErrorHandlers/ErrorForm';


const postObj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
        this.setState({ name: { value: name, touched: true } })
    }
    updateContent(content) {
        this.setState({ content: { value: content, touched: true } })
    }
    updateFolder(folder) {
        this.setState({ folder: { value: folder, touched: true } })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, content, folder } = this.state;

        postObj.body = JSON.stringify({
            name: name.value,
            content: content.value,
            folderId: folder.value,
            modified: Date.now(),
            id: cuid()
        })
        fetch(`http://localhost:9090/notes`, postObj)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    name: {
                        value: '',
                        touched: false,
                    },
                    content: {
                        value: '',
                        touched: false
                    },
                    folder: {
                        value: '',
                        touched: false
                    }
                })
                window.location.href = '/'
            })
    }

    validateName = () => {
        const name = this.state.name.value.trim()
        if (name.length === 0) {
            return "Name is required"
        } else if (name.length < 2) {
            return "Name must be longer than 2 characters"
        }
    }
    validateContent = () => {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return "A description is required"
        }
    }
    validateFolder = () => {
        const folder = this.state.folder.value;
        if (folder === '') {
            return 'A folder must be selected'
        }
    }


    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const folderError = this.validateFolder();

        return (
            <NoteContext.Consumer>
                {context => {
                    const folderOptions = context.folders.map((el, index) => {
                        return (<option key={index} value={el.id}>{el.name}</option>)
                    })
                    return (
                        <div>
                            <form className="addnote-form" onSubmit={e => this.handleSubmit(e)}>
                                <fieldset className="addnote-form">
                                    <legend>Add a note:</legend>
                                    <label htmlFor="addnote-input-name">Name:</label>
                                    <input type='text' name="addnote-name" id="addnote-name" onChange={event => this.updateName(event.target.value)}
                                        required maxLength={12} minLength={2}
                                    />
                                    {this.state.name.touched && <ErrorForm error={nameError} />}

                                    <label htmlFor="addnote-input-content">Content:</label>
                                    <input type='text' name="addnote-content" id="addnote-content" onChange={event => this.updateContent(event.target.value)} />
                                    {this.state.content.touched && <ErrorForm error={contentError} />}

                                    <label htmlFor="addnote-input-folder">Select Folder:</label>
                                    <select name="addnote-folder" id="addnote-folder" onChange={event => this.updateFolder(event.target.value)}>
                                        <option value="">Select one!</option>
                                        {folderOptions}
                                    </select>
                                    {this.state.folder.touched && <ErrorForm error={folderError} />}

                                    <div>
                                        <button type='submit'>Submit</button>
                                    </div>
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
