import React, { useState } from "react";

export const TaskEditor = (props) => {
  const [newTaskName, setNewTaskName] = useState(props.task.name);

  const updateNewTaskValue = (e) => setNewTaskName(e.target.value);

  const createNewTask = () => {
    if (newTaskName) {
      props.callback(newTaskName)
      setNewTaskName("")
    } else {
      alert("Task Empty")
    }
  };

  return (
    <div className="my-1">
      <input
        type="text"
        className="form-control"
        value={newTaskName}
        onChange={updateNewTaskValue}
        onKeyDown={(e) => (e.key === "Enter" ? createNewTask() : "")}
      />
      <button className="btn btn-primary mt-1" onClick={createNewTask}>
        Add
      </button>
    </div>
  );
};
