import { useState } from "react";

function App() {
  const [numberInput, setNumberInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  return (
    <div>
      <h1>PhoneBook</h1>
      <ul>numbers:</ul>
      <h2>Add number</h2>
      <label>
        Name
        <input
          className="rounded border border-black"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </label>
      <label>
        Phone number
        <input
          className="rounded border border-black"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value)}
        />
      </label>
    </div>
  );
}

export default App;
