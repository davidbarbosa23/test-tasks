import React, { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { TaskBanner } from "./components/TaskBanner";
import { TaskRow } from "./components/TaskRow";
import { TaskForm } from "./components/TaskForm";
import { VisibilityControl } from "./components/VisibilityControl";

export const App = () => {
  const [userName, setUserName] = useState("Dev");
  const [taskItems, setTaskItems] = useState([
    { id: uuidv4(), name: "Task One", done: false },
    { id: uuidv4(), name: "Task Two", done: false },
    { id: uuidv4(), name: "Task Three", done: true },
    { id: uuidv4(), name: "Task Four", done: false },
  ]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [taskEdit, setTaskEdit] = useState({
    edit: false,
    task: {},
  });

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data != null) {
      setTaskItems(JSON.parse(data));
    } else {
      setUserName("Dev");
      setTaskItems([
        { id: uuidv4(), name: "Task One", done: false },
        { id: uuidv4(), name: "Task Two", done: false },
        { id: uuidv4(), name: "Task Three", done: true },
        { id: uuidv4(), name: "Task Four", done: false },
      ]);
      setShowCompleted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems([
        ...taskItems,
        { id: uuidv4(), name: taskName, done: false },
      ]);
    } else {
      alert("Task already created");
    }
  };

  const editTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );

  const deleteTask = (task) =>
    setTaskItems(taskItems.filter((t) => t !== task));

  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t))
    );

  const taskTableRows = (doneValue) =>
    taskItems
      .filter((task) => task.done === doneValue)
      .map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          setTaskEdit={setTaskEdit}
          taskEdit={taskEdit}
          deleteTask={deleteTask}
        />
      ));

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <div className="container-fluid">
        {taskEdit.edit && (
          <TaskForm
            edit={taskEdit}
            setTaskEdit={setTaskEdit}
            callback={editTask}
          />
        )}
        {!taskEdit.edit && (
          <TaskForm edit={taskEdit} callback={createNewTask} />
        )}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={(checked) => setShowCompleted(checked)}
          />
        </div>
        {showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>{taskTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};
