import React, { useState } from "react";

const Practice = () => {
  const [names, setNames] = useState([]); // For storing names
  const [name, setName] = useState(""); // For input field

  function addNames(e) {
    e.preventDefault();
    if (name.trim() === "") return; // Prevent empty submissions
    setNames([...names, { id: names.length, name }]);
    setName(""); // Reset input field
  }

  return (
    <div>
      <h3>Practice</h3>
      <form onSubmit={addNames}>
        <input
          type="text"
          value={name}
          placeholder="Add your Name"
          onChange={(e) => setName(e.target.value)} // Updating input state
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {names.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Practice;
