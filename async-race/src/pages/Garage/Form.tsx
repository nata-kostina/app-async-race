import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3e983e');
  return (
    <form id="car">
      <label htmlFor="name">
        Name
        <input id="name" type="text" placeholder="Enter name..." value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label htmlFor="color">
        Color
        <input id="color" type="color" placeholder="Enter color..." value={color} onChange={(event) => setColor(event.target.value)} />
      </label>
      <button type="button">Create</button>
    </form>
  );
}
export default Form;
