import React from "react";
// import "./App.css";
import { useState } from "react";
import Axios from "axios";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addStudent = () => {
    Axios.post("https://group-project-sql.herokuapp.com/create", {
      username: username,
      password: password,
      headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
    })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={addStudent}> Add </button>
      </div>
    </div>
  );
}
