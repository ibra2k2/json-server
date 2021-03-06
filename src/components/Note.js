import React from 'react'

 const Note = ({note, toggleImportance}) => {
     const level = note.important ? 'make important' : 'make not important';
    return (
        <div>
            <li>
                {note.content}
                <button onClick = {() => toggleImportance()}>{level}</button> 
            </li>
        </div>
    )
}
export default Note;
