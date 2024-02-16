import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constant";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdatedId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      setTasks(res.data);
    });
  }, [updateUI]);

  const addtask = () => {
    if (input !== "") {
      axios.post(`${baseURL}/save`, { task: input }).then((res) => {
        setInput("");
        setUpdateUI((prevState) => !prevState);
      });
    } else {
      alert("Write a task to Add");
    }
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdatedId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdatedId(null);
      setInput("");
    });
  };

  return (
    <main>
      <h1>CRUD Operation</h1>
      <div className="input_holder">
        <input
          className=""
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={updateId ? updateTask : addtask}>
          {updateId ? "Update Task" : "Add task"}
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
