import React, { useState, useEffect } from "react";
import ListaTarea from "./ListaTarea";

// const API_BASE = `https://playground.4geeks.com/todo/users/`; //en caso de que  lo quisiera hacer mas escalable y use el url base pasandole solo el usuario como dato adicional//
// const USER = "alberto"

const Home = () => {
  const [tarea, setTarea] = useState([]);
  const [inputValue, setinputValue] = useState([])//info recibida del usuario tarea modificada!//////

  //guardo usuario/ post cuerpo no need it porque solo lo guarda/
  const crearUsuario = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/alberto", {
      method: "POST",
    })
  }


  //pedir tarea/get///
  const getTodos = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/alberto")

    if (!response.ok) {
      console.log("crea la tarea");
      crearUsuario();


    }
//data del json puesta en setTarea mas data y todos///
    const data = await response.json()
    setTarea(data.todos);   //recibiendo la info//
    console.log(data.todos); 


  }
  //crear tarea  post! usando toda la esctructura del mismo, en el label le paso el input value osea la tarea modificada//
  const creainputValue = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/todos/alberto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        label: inputValue,
        is_done: false
      })
    }

    )


    //llamo al getTodos , tareas anteriores y me da la siguiente tarea vacia lista para la info!
    const data = await response.json()
    console.log(data);
    getTodos()
    setinputValue("")
  }

  //  recibo todas las tareas again del getTodos  
  useEffect(() => {
    getTodos()
  }, [])



//cuando escriba tarea me protejo deq lo deje vacio con trimp y llamo a crear la tarea///
  const handleKeyUp = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      creainputValue();

    }
  };

// elimino tarea  y vuelve a pedir tareas del gettods!!!
  const eliminarTarea = async (id) => {
    const responsive = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE"
    })
    getTodos()
  }



  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4"> 🖇️ Lista de Tareas</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Siguiente tarea"
        value={inputValue}                                 
        onChange={(e) => setinputValue(e.target.value)}    
        onKeyUp={handleKeyUp}
      />

      {/* //para pasarle info al lista tarea// */}

      <ListaTarea tarea={tarea} eliminarTarea={eliminarTarea} />
    </div>
  );
};

export default Home;

