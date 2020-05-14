import React, { useState } from 'react'

const Button =(props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { id: 0, name: 'Arto Hellas', number: '' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const setToNewName = () => setNewName(document.getElementById("name").value)
  const [ newNumber, setNewNumber ] = useState('')
  const setToNewNumber = () => setNewNumber(document.getElementById("number").value)
  
  const handleNameChange = (event) => {
    setToNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setToNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    let readyToAdd=true;
    persons.map(person => {
      if(person.name==newName){
        alert(person.name + " is already added to phonebook");
        readyToAdd=false;
      }
    })

    if(readyToAdd==true){
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
    
  }
  function PersonsList() {
    const listItems = persons.map(person => <div key={person.id}>{person.name} {person.number}</div>);  return (
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
          number: <input id="number" type="tel" pattern="[0-9]{3}-[0-9]{6}" value={newNumber} onChange={handleNumberChange} />
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
