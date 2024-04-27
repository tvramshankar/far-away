import "./App.css";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  function handleClick(addedData) {
    setItems((items) => [...items, addedData]);
  }
  function handleDelete(id) {
    setItems((items) => items.filter((e) => e.id !== id));
  }
  return (
    <div className="app">
      <Logo></Logo>
      <Form handleClick={handleClick}></Form>
      <PackingLists items={items} handleDelete={handleDelete}></PackingLists>
      <Stats></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🥹 Far Away 🥸</h1>;
}

function Form({ handleClick }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    const addedData = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };
    handleClick(addedData);
    setQuantity(1);
    setDescription("");
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
      <button>add</button>
    </form>
  );
}

function PackingLists({ items, handleDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((e) => (
          <List list={e} handleDelete={handleDelete} key={e.id} />
        ))}
      </ul>
    </div>
  );
}

function List({ list, handleDelete }) {
  return (
    <li>
      <span style={list.packed ? { textDecoration: "line-through" } : {}}>
        {list.quantity} {list.description}
      </span>
      <button
        onClick={() => {
          handleDelete(list.id);
        }}
      >
        ❌
      </button>
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
