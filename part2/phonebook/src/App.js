import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [ persons, setPersons ] = useState([]);

  // Application's effect
  useEffect(() => {
    personService
    .getAll().then(response => {
        setPersons(response);
        setSearchResults(response);
      })
    }, [])

  const [ newName, setNewName ] = useState('')
  const setToNewName = () => setNewName(document.getElementById("name").value)
  const [ newNumber, setNewNumber ] = useState('')
  const setToNewNumber = () => setNewNumber(document.getElementById("number").value)
  //console.log(persons);
  const handleNameChange = (event) => {
    setToNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setToNewNumber(event.target.value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
      setSearchTerm(event.target.value);
    };
 useEffect(() => {
    const results = persons.filter(person =>
      person.name.includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const deleteName = (event) => {
    event.preventDefault()
    const id = parseInt(event.target.value)
    personService.remove(persons[id -1])
    // prevent manual refresh
    setPersons(persons.filter(person => person.id !== id ))
    setSearchResults(persons.filter(person => person.id !== id ))
  }

  const addPerson = (event) => {
    event.preventDefault();
    let readyToAdd=true;
    persons.map(person => {
      if(person.name===newName){
        alert(person.name + " is already added to phonebook");
        readyToAdd=false;
      }
    })

    if(readyToAdd===true){

    personService
    .create({ name: newName, number: newNumber, id: persons.length + 1 })
    .then(response => {
      setPersons(persons.concat(response))
      setSearchResults(persons.concat(response))
      setNewName('')
      setNewNumber('')
      setSearchTerm('')
    })

    }
    
  }

  return (
    <div style={{margin:'4px'}}>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} onChange={handleChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons searchData={searchResults} deleteName={deleteName}/>
    </div>
  )
}

export default App;
