import React from 'react'

const Persons = ({ searchData }) => {
    const listItems = searchData.map(person => <div key={person.id}>{person.name} {person.number}</div>);  
      return ( <div>{listItems}</div>  );
  }


export default Persons;