import React, { useState } from "react";
import "./App.css";

import Todo from "./components/layouts/Todo";
import { useAddTaskMutation } from "./api/taskApiSclice";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "./api/taskApiSclice";

const App = () => {
  const [title, setTitle] = useState("");

  /**
   * RTK Query hooks
   */
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const { data, isLoading, isError, isFetching } = useGetTasksQuery();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  /**
   * Handle form submission to add a new task
   */
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

  /**
   * Handle deletion of a task by ID
   */
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Update a task by ID with a new checked status
   */
  const handleUpdateTask = async (id, checked) => {
    console.log({ id, checked });
    try {
      await updateTask({ id, checked }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Delete all tasks in the provided array
   * @param {Array} tasks - An array of task objects to delete
   * @returns {Promise} - A promise that resolves when all tasks have been deleted
   */
  const handleDeleteAll = async (tasks) => {
    if (!window.confirm("Are you sure you want to delete all tasks?")) return;
    try {
      await Promise.all(tasks.map((task) => deleteTask(task.id).unwrap()));
      console.log("✅ All tasks deleted successfully");
    } catch (err) {
      console.log(err);
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
              disabled={isAdding}>
              {isAdding ? "Adding..." : "Add"}
            </button>
          </div>
          <div className="todo-list">
            <Todo
              isLoading={isLoading}
              isDeleting={isDeleting}
              data={data}
              handleDeleteAll={handleDeleteAll}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
