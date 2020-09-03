// on submit, make a fetch req with form data

import React from 'react';
import cuid from 'cuid';
import ErrorForm from '../ErrorHandlers/ErrorForm';


const postObj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {}
}


class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            }
        }
    }

    handleFolderInputChange = (value) => {
        this.setState({ name: { value: value, touched: true } })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { name } = this.state;
        postObj.body = JSON.stringify({
            name: name.value,
            id: cuid()
        })
        fetch(`http://localhost:9090/folders`, postObj)
            .then(res => res.json())
            .then(data => {
                this.setState({ name: { value: '', touched: false } })
            })
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return "Name is required"
        } else if (name.length < 3) {
            return "Name must be at least 3 characters"
        }
    }

    render() {
        const nameError = this.validateName();

        return (
            <div>
                <form className="addnote-form" onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="folder-name-input">Add a Folder:</label>
                    <input type='text'
                        name="folder-name-input"
                        id="folder-name-input"
                        onChange={event => this.handleFolderInputChange(event.target.value)}
                        placeholder="Name"
                        minLength={3}
                        maxLength={12}
                        required />
                    {this.state.name.touched && <ErrorForm error={nameError} />}
                    <button type='submit'>submit</button>
                </form>
            </div>
        )
    }
}




















export default AddFolder;