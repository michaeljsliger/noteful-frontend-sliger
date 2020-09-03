import React from 'react';
import NoteContext from './NoteContext';




class AddNote extends React.Component {
    render() {
        return (
            <NoteContext.Consumer>
                {context => {
                    console.log(context)
                    const folderOptions = context.folders.map(el => {
                    return (<option value={el.id}>{el.name}</option>)
                    })
                    return (
                        <div>
                            <form>
                                <fieldset>
                                    <legend>Add a note:</legend>
                                    <label htmlFor="addnote-input-name">Name:</label>
                                    <input type='text' name="addnote-input" id="addnote-input" />
                                    <label htmlFor="addnote-input-content">Content:</label>
                                    <input type='text' name="addnote-input" id="addnote-input" />
                                    <label htmlFor="addnote-input-folder">Select Folder:</label>
                                    <select name="addnote-input" id="addnote-input">
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
