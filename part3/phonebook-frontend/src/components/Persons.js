import React from 'react'

const Persons = ({ searchData, deleteName }) => {
    const listItems = searchData.map(person => <div key={person.id}>
      {person.name} {person.number}
      {' '}
          <button 
            type="button" 
            value={person.id}
            onClick={deleteName}>
            delete
          </button>
    </div>);  
      return ( <div>{listItems}</div>  );
  }


export default Persons;