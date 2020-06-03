import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [ persons, setPersons ] = useState([]);

  const baseUrl = 'http://localhost:3001/persons'
  const getAll = () => axios.get(baseUrl)
  const create = newObject => axios.post(baseUrl, newObject)
  // Application's effect
  useEffect(() => {
    getAll().then(response => {
        setPersons(response.data);
        setSearchResults(response.data);
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

      create({ name: newName, number: newNumber, id: persons.length + 1 })
    .then(response => {
      setPersons(persons.concat(response.data))
      setSearchResults(persons.concat(response.data))
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
      <Persons searchData={searchResults} />
    </div>
  )
}

export default App;
