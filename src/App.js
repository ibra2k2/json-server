import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import Note from './components/Note';


function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  
  const notesToShow = showAll ? notes : notes.filter(notes => notes.important === true);

  const rows = () => notesToShow.map(note =>
    <Note 
     key = {note.id}
     note = {note}
     toggleImportance = {() => toggleImportanceOf(note.id)}
    />
  );


    axios.get('http://localhost:3001/notes')

      .then(response => {
        //const note = response.data
        // console.log('Note Data', note) 
        setNotes(response.data);  
      })
      .catch (error => {
        console.log(error);
           
      })




  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important}
    axios.put(url, changeNote).then(response => {
      setNotes(notes.map(note => note.id !== id ? note : response.data));
    })
    console.log(`important of '${id}' need to toggled`);
  }


  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    }
    axios.post('http://localhost:3001/notes', noteObject)
    .then(response => {
     console.log(response);
     setNotes(notes.concat(response.data));
     setNewNote('');
      
    })
  }
  const handleNodeChange = (event) => {
    setNewNote(event.target.value);
  }



  return (
    <div className="App">
      <div>
        <div>
          <h1>Notes</h1>
          <button onClick = {() => setShowAll(!showAll)}>Show {showAll ? 'important' : 'all'}</button>
        </div>
      <ul>
        {/* {notesToShow.map(nod => (<li key = {nod.id}>{nod.content}<br/>{nod.date}</li>))} */}
        {/* <button onClick = {toggleImportance}>{level}</button>   */}
        {rows()}
      </ul>
      </div>
      <div>
      <form onSubmit = {addNote}>
        <input type = "text" 
        value = {newNote}
        onChange = {handleNodeChange}
        />
        <button type = "submit">Save</button>
      </form>
      </div>
    </div>
  );
}

export default App;
