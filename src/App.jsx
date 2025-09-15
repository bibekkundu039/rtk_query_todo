import React, { useState } from "react";
import "./App.css";

import Todo from "./components/layouts/Todo";
import { useAddTaskMutation, useDetailsTaskQuery } from "./api/taskApiSclice";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "./api/taskApiSclice";
import DetailsTask from "./components/layouts/DetailsTask";

const App = () => {
  const [title, setTitle] = useState("");
  const [taskId, setTaskId] = useState(null);

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

  const handleTaskDetail = async (id) => {
    setTaskId(id);
    // console.log(id);
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
              handleTaskDetail={handleTaskDetail}
            />
          </div>
          <div className="todo-footer flex justify-end mt-2">
            {data?.length !== 0 && (
              <div className="h-10">
                <button
                  className="text-[12px] bg-red-600 px-4 py-1 text-white rounded-sm cursor-pointer"
                  onClick={() => handleDeleteAll(data)}>
                  {isDeleting ? "Clearing..." : "Clear All"}
                </button>
              </div>
            )}
          </div>
        </div>
        {/* <DetailsTask id={taskId} /> */}
        {taskId !== null && (
          <div className="todo-details-container">
            <DetailsTask id={taskId} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
