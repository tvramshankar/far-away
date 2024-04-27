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
  function handleToggle(id) {
    setItems((items) =>
      items.map((e) => (e.id === id ? { ...e, packed: !e.packed } : e))
    );
  }
  return (
    <div className="app">
      <Logo></Logo>
      <Form handleClick={handleClick}></Form>
      <PackingLists
        items={items}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
      ></PackingLists>
      <Stats items={items}></Stats>
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

function PackingLists({ items, handleDelete, handleToggle }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedList;
  if (sortBy === "input") sortedList = items;
  if (sortBy === "description")
    sortedList = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedList = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedList.map((e) => (
          <List
            list={e}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
            key={e.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function List({ list, handleDelete, handleToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        value={list.packed}
        onChange={() => {
          handleToggle(list.id);
        }}
      ></input>
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

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>You haven't added any list of items🥹</em>
      </footer>
    );
  }
  const numberOfItems = items.length;
  const numberOfPackedItems = items.filter((e) => e.packed).length;
  const percentageOfPackedItems = Math.round(
    (numberOfPackedItems / numberOfItems) * 100
  );
  return (
    <footer className="stats">
      <em>
        {percentageOfPackedItems === 100
          ? "You have packed everything😍"
          : `You have ${numberOfItems} items on your list, and you already packed
        ${numberOfPackedItems}(${percentageOfPackedItems}%) 😘`}
      </em>
    </footer>
  );
}

export default App;
