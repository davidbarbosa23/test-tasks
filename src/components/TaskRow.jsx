import React from "react";
import { Button, ButtonGroup } from "reactstrap";

export const TaskRow = (props) => (
  <tr key={props.task.name}>
    <td>{props.task.name}</td>
    <td>
      <input
        type="checkbox"
        checked={props.task.done}
        onChange={() => props.toggleTask(props.task)}
      />
    </td>
    <td>
      <ButtonGroup>
        <Button
          type="button"
          outline
          color="danger"
          onClick={() =>
            props.setTaskEdit({
              ...props.taskEdit,
              edit: true,
              task: props.task,
            })
          }
        >
          Edit
        </Button>
        <Button
          type="button"
          color="danger"
          onClick={() => props.deleteTask(props.task)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </td>
  </tr>
);
