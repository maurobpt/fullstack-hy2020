import React from 'react'

const Filter = ({ value, onChange }) => {
    return (
      <div>
        filter shown with<input type="text" placeholder="Search"
        value={value}
        onChange={onChange}></input>
      </div>
    );
  }

export default Filter;
