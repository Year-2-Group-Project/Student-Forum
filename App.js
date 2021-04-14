import React from 'react';
import "./App.css";
import { useState } from "react";
import Axios from 'axios'



export default function App() {
  const [name , setName] = useState("");
  const [age , setAge] = useState("");
  

  const addStudent = () => {
    Axios.post('https://group-project-sql.herokuapp.com/create', {
      name: name,
      age: age,
      headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    }).then(() => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
  };


  return (
    <div className="App">
      <div className = "information">
        <label>Name:</label>
        <input 
        type="text" 
        onChange={(event) => {setName(event.target.value)}} 
        />
        <label>Age:</label>
        <input 
        type="text"
        onChange={(event) => {setAge(event.target.value)}}
        />
        <button onClick={addStudent}> Add </button>
      </div>
    </div> 
  );
}


