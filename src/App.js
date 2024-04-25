import "./App.css";
import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 3, packed: false },
  { id: 3, description: "Charger", quantity: 6, packed: false },
  { id: 4, description: "Perfume", quantity: 1, packed: true },
];
function App() {
  return (
    <div className="app">
      <Logo></Logo>
      <Form></Form>
      <PackingLists></PackingLists>
      <Stats></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🥹 Far Away 🥸</h1>;
}

function Form() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip😍</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((e) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item..."
      ></input>
      <button
        onClick={() => {
          const addedData = {
            id: 1,
            description: description,
            quantity: quantity,
            packed: false,
          };
          console.log(addedData);
        }}
      >
        add
      </button>
    </form>
  );
}

function PackingLists() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((e) => (
          <List list={e} key={e.id} />
        ))}
      </ul>
    </div>
  );
}

function List({ list }) {
  return (
    <li>
      <span style={list.packed ? { textDecoration: "line-through" } : {}}>
        {list.quantity} {list.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (x%) 😘</em>
    </footer>
  );
}

export default App;
