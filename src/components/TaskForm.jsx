import React, { useState } from "react";

export const TaskForm = (props) => {
  const [taskName, setTaskName] = useState(
    props.edit.edit ? props.edit.task.name : ""
  );

  const manageTask = () => {
    if (taskName) {
      if (props.edit.edit) {
        props.callback({
          ...props.edit.task,
          name: taskName,
        });
        props.setTaskEdit({ edit: false, task: {} });
      } else props.callback(taskName);
      setTaskName("");
    } else {
      alert("Task Empty");
    }
  };

  return (
    <div className="my-1">
      <input
        type="text"
        className="form-control"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? manageTask() : "")}
      />
      <button className="btn btn-primary mt-1" onClick={manageTask}>
        {props.edit.edit && "Edit"}
        {!props.edit.edit && "Add"}
      </button>
    </div>
  );
};
