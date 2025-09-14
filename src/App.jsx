import React, { useState } from "react";
import "./App.css";

import Todo from "./components/layouts/Todo";
import { useAddTaskMutation } from "./api/taskApiSclice";

const App = () => {
  const [title, setTitle] = useState("");
  const [addTask, { isLoading }] = useAddTaskMutation();
  console.log(addTask);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTask({
        id: Date.now().toString(),
        title: title,
        checked: false,
      }).unwrap();

      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>RTK Query Todo</h1>
        </div>
        <div className="todo-container">
          <div className="todo-form">
            <input
              type="text"
              placeholder="Add Todo"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="btn"
              type="submit"
              onClick={handleFormSubmit}
              disabled={isLoading}>
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
          <div className="todo-list">
            <Todo />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
