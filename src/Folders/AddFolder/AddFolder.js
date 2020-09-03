// on submit, make a fetch req with form data

import React from 'react';
import cuid from 'cuid';


const postObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
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
       this.setState({name: {value: value, touched: true}})
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
        .then(this.setState({name: {value: '', touched: false}}))

   }
    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor="folder-name-input">Add a Folder:</label>
                    <input type='text' name="folder-name-input" id="folder-name-input" onChange={event => this.handleFolderInputChange(event.target.value)} />
                    <button type='submit'>submit</button>
                </form>
            </div>
        )
    }
}




















export default AddFolder;