import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  /*const test_data = axios.get('http://localhost:3001/persons');
  test_data.then(response => {
    console.log(response)
  })*/

  const [ persons, setPersons ] = useState([]);

  // Application's effect
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
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
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      const newpersons = persons.concat(personObject)
      setPersons(newpersons);
      setSearchResults(newpersons);
      setNewName('');
      setNewNumber('');
      setSearchTerm('');

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
