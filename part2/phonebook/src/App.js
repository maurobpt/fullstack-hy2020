import React, { useState } from 'react'

const Button =(props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
      setSearchTerm(event.target.value);
    };
 React.useEffect(() => {
    const results = persons.filter(person =>
      person.name.includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

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
      const newpersons = persons.concat(personObject)
      setPersons(newpersons);
      setSearchResults(newpersons);
      setNewName('');
      setNewNumber('');
      setSearchTerm('');

    }
    
  }
  /*function PersonsList() {
    const listItems = persons.map(person => <div key={person.id}>{person.name} {person.number}</div>);  
      return ( <div>{listItems}</div>  );
  }*/

  function PersonsFilteredList() {
    const listItems = searchResults.map(person => <div key={person.id}>{person.name} {person.number}</div>);  
      return ( <div>{listItems}</div>  );
  }

  return (
    <div style={{margin:'4px'}}>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input type="text" placeholder="Search"
        value={searchTerm}
        onChange={handleChange}></input>
      </div>
      <h3>add a new</h3>
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
      <PersonsFilteredList />
    </div>
  )
}

export default App;
