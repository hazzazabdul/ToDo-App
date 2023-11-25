import {useState } from "react";
import "./App.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [complete, setComplete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newItem) {
      setTodos([...todos, newItem]);
      setNewItem("");
    } else {
      alert("Add Your Task");
    }
  };

  const isChecked = (key) => {
    setComplete(!complete);
    setSelectedId(key);
  };

  const deleteTodoItem = (id) => {
    const filteredTodos = todos.filter((todo, id) => selectedId !== id);
    if (selectedId === id && complete) {
      setTodos(filteredTodos);
      setComplete(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="new-item-form"
      >
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">ToDo List</h1>
      <ol className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map((todo, id) => (
          <li
            className="parentListItem"
            key={id}
          >
            <li title={todo} className="childListItem">
              <label>
                <input
                  onClick={() => {
                    isChecked(id);
                  }}
                  type="checkbox"
                  checked={complete && id == selectedId}
                  onChange={() => setComplete(!complete)}
                />
                {todo}
              </label>
            </li>
            <button
              onClick={() => deleteTodoItem(id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </>
  );
}
