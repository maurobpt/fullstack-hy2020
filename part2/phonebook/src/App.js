import React, { useState } from 'react'

const Button =(props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { id: 0,name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const setToNewName = () => setNewName(document.getElementById("name").value)
  
  const handleNameChange = (event) => {
    setToNewName(event.target.value);
    //console.log(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    //console.log(event);
    const personObject = {
      name: newName,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    //console.log(persons.length);
    //console.log( JSON.stringify(persons));
  }
  function PersonsList() {
    const listItems = persons.map(person => <div key={person.id}>{person.name}</div>);  return (
      <div>{listItems}</div>  );
  }

  return (
    <div style={{margin:'4px'}}>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input id="name" type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
        <Button text="add" />
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonsList/>
    </div>
  )
}

export default App;
