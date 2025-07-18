import React, { useState, useEffect } from "react";
import ListaTarea from "../components/ListaTarea";

const Home = () => {

  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState(() => {
    // Cargar tareas de localStorage como respaldo
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Cargar tareas del backend al montar, si falla usar localStorage
  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const resp = await fetch('https://playground.4geeks.com/todo/users/alberto%20zambrano');
        if (!resp.ok) throw new Error("Error al obtener tareas");
        const data = await resp.json();

        // Mapear solo labels y actualizar estado y localStorage
        const tareasBackend = data.todos.map((t) => t.label);
        setTareas(tareasBackend);
        localStorage.setItem("tareas", JSON.stringify(tareasBackend));
      } catch (error) {
        console.warn("No se pudo cargar del backend, usando localStorage");
        // Ya está cargado localStorage en useState inicial!!!!!!!
      }
    };

    obtenerTareas();
  }, []);

  // Función para guardar tareas en backend y localStorage
  const guardarTareas = async (nuevasTareas) => {
    setTareas(nuevasTareas);
    localStorage.setItem("tareas", JSON.stringify(nuevasTareas));

    try {
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevasTareas.map((t) => ({ label: t, done: false }))),
      });
    } catch (error) {
      console.error("Error guardando tareas en backend:", error.message);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && tarea.trim() !== "") {
      const nuevasTareas = [...tareas, tarea.trim()];
      guardarTareas(nuevasTareas);
      setTarea("");
    }
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    guardarTareas(nuevasTareas);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mt-4">Lista De Tareas</h1>
      <label className="form-label" htmlFor="name">
        <strong>Tareas</strong>
      </label>
      <input
        className="form-control"
        id="name"
        type="text"
        placeholder="Tareas pendientes!"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <ListaTarea
        tareas={tareas}
        eliminarTarea={eliminarTarea}
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
      />
    </div>
  );
};

export default Home;
