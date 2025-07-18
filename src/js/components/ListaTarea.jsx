import React from "react";




const ListaTarea = ({ tareas, hoveredIndex, setHoveredIndex, eliminarTarea }) => {
  return (
    <ul className="list-group">
      {tareas.length === 0 ? (
        <li className="list-group-item text-center text-muted">
          Añade otra tarea!
        </li>
      ) : (
        tareas.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span>{item}</span>
            {hoveredIndex === index && (
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => eliminarTarea(index)}
              >
                ✖️
              </button>
            )}
          </li>
        ))
      )}
    </ul>
  );
};

export default ListaTarea;