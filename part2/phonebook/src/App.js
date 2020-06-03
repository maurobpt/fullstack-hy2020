import React, { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  // Application's effect
  useEffect(() => {
    personService
    .getAll().then(initialPersons => {
        setPersons(initialPersons);
        setSearchResults(initialPersons);
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
    const duplicateCheck = persons.find(person => person.name === newName)
    if (typeof duplicateCheck !== 'undefined' && duplicateCheck.number !== newNumber) {
      personService
        .update(duplicateCheck.id, { name: duplicateCheck.name, number: newNumber})
        .then(returnedPerson => {
          if (window.confirm(`${returnedPerson.name} is already added to phonebook, 
            replace the old number with a new one?`)) {
            setPersons(persons.map(person => person.id !== duplicateCheck.id ? person : returnedPerson))
            setSearchResults(persons.map(person => person.id !== duplicateCheck.id ? person : returnedPerson))
          }
          setNewName('')
          setNewNumber('')
        })
        return
    } else if (typeof duplicateCheck !== 'undefined') {
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNumber('')
        return
    }

    // If the name is not in phonebook, add a new person
    personService
      .create({ name: newName, number: newNumber })
      .then(response => {
        setPersons(persons.concat(response))
        setSearchResults(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setConfirmationMessage(`Added ${response.name}`)
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 5000)
      })
    
  }

  return (
    <div style={{margin:'4px'}}>
      <h2>Phonebook</h2>
      <Notification message={confirmationMessage} />
      <Filter value={searchTerm} onChange={handleChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons searchData={searchResults} deleteName={deleteName}/>
    </div>
  )
}

export default App;
