import React from 'react'

const PersonForm = ({ onSubmit, valueName, onChangeName, valueNumber, onChangeNumber }) => {
    return ( 
      <form onSubmit={onSubmit}>
        <div>
          name: <input id="name" type="text" value={valueName} onChange={onChangeName} />
        </div>
        <div>
          number: <input id="number" type="tel" pattern="[0-9]{3}-[0-9]{6}" value={valueNumber} onChange={onChangeNumber} />
        </div>
        <div>
        <button
          type="submit">add
        </button>
        </div>
      </form>
      );
  }

  export default PersonForm;
