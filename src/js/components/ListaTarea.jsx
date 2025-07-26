import React from "react";
//TAREAS almacenadas en tarea y eliminar tarea recibidas aqui//
const ListaTarea = ({ tarea, eliminarTarea }) => {
    console.log(tarea);

    return (
        <ul className="list-group">
            {tarea.length === 0 ? (
                <li className="list-group-item text-center">
                    .  .  .
                </li>
            ) : (
                tarea.map((todos) => (            //cada tarea de array            
                    <li
                        key={todos.id}  //ID unico de la tarea
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>{todos.label}</span>         
                        <button
                            className="btn btn-outline-light btn-sm"
                            onClick={() => eliminarTarea(todos.id)}
                        >
                            ✖️
                        </button>
                    </li>
                ))
            )}
        </ul>
    );
};

export default ListaTarea;














