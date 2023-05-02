import axios from "axios";
import React from "react";

export default function TodoItem(props) {
  const deleteTodoHandler = (title) => {
    axios.delete(`http://localhost:8000/api/todo/${title}`).then((res) => {
      console.log(res.data);
      props.deleteTodo(props.todo);
    });
  };

  const createdDateString = new Date(props.todo.created_at).toLocaleString(
    "en-US"
  );


  return (
    <div>
      <p>
        <span style={{ fontWeight: "bold, underline" }}>
          {props.todo.title} :{" "}
        </span>{" "}
        {props.todo.description}
        <br />
        Created at: {createdDateString}
        <button
          onClick={() => deleteTodoHandler(props.todo.title)}
          className="btn btn-outline-danger my-2 mx-2"
          style={{ borderRadius: "50px" }}
        >
          X
        </button>
        {/* <hr></hr> */}
      </p>
    </div>
  );
}
