import "./App.css";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import TodoView from "./components/TodoListView";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [todoList, setTodoList] = useState([{}]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState(
    localStorage.getItem("display") === "true" || false
  );

  // read all todos
  useEffect(() => {
    // persisting the TodoView component once the page refreshes
    localStorage.setItem("display", display);
    axios.get("http://localhost:8000/api/todo").then((res) => {
      setTodoList(res.data);
    });
  }, [display]);

  // post todo
  const addTodoHandler = () => {
    if (!title || !description) {
      alert("Please fill in both fields");
      return;
    }
    const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    axios
      .post("http://localhost:8000/api/todo/", {
        title: title,
        description: description,
        client_timezone: clientTimezone,
      })
      .then((res) => {
        console.log(res);
        setTitle("");
        setDescription("");
        localStorage.setItem("display", true);
        // add the new task to the todoList state variable
        setTodoList([...todoList, res.data]);
      });
  };

  const deleteTodoHandler = useCallback(
    (todoId) => {
      axios.delete(`http://localhost:8000/api/todo/${todoId}`).then(() => {
        setDisplay(true);
        setTodoList(todoList.filter((todo) => todo.id !== todoId)); // update the todoList state variable
      });
    },
    [todoList]
  );

  const memoizedTodoView = useMemo(() => {
    const updateTodoList = (newTodoList) => {
      setTodoList(newTodoList);
    };

    return (
      <TodoView
        todoList={todoList}
        updateTodoList={updateTodoList}
        deleteTodoHandler={deleteTodoHandler}
      />
    );
  }, [todoList, deleteTodoHandler]);

  return (
    <div
      className="App list-group-item justify-content-center align-items-center mx-auto"
      style={{ width: 400, backgroundColor: "white", marginTop: 15 }}
    >
      <h1 className="card text-white bg-primary mb-1">Task Manager</h1>
      <h6 className="card text-white bg-primary mb-3">
        FASTAPI - React - MongoDB
      </h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-3">Add Your Task</h5>
        <span className="card-text">
          <input
            className="mb-2 form-control titleIn"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="mb-2 form-control descriptionIn"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="btn btn-outline-primary mx-2 mb-3"
            style={{ borderRadius: 50, fontWeight: "bold" }}
            onClick={addTodoHandler}
          >
            Add Task
          </button>
        </span>
        <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>

        <div>
          {/* display all todos */}
          {display && memoizedTodoView}
        </div>
      </div>
      <h6 className="card text-dark bg-warning py-1 mb-0">
        Copyright 2023, All rights reserved &copy;
      </h6>
    </div>
  );
}

export default App;
