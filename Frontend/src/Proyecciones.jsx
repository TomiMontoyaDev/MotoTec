import { useEffect, useState } from "react";
import "/Proyecciones.css";
import axios from "axios";
import "/assets/Mototecwhite.png";
import { Link } from "react-router-dom";

function Proyeccion() {
  const [años, setAños] = useState([]); //Variable para almacenar los años de la proyeccion
  const [ventas, setVentas] = useState([]); //Variable para almacenar las ventas futuras
  const [componentes, setComponentes] = useState([]); //Variable para almacenar los componentes

  useEffect(() => {
    //Funcion que se ejecuta al cargar el componente y obtiene los datos guardandolos en las variables con estados
    axios
      .get("http://127.0.0.1:5000/proyecciones")
      .then((response) => {
        setAños(response.data.años);
        setVentas(response.data.ventas_futuras);
        setComponentes(response.data.componentes);
      })
      .catch((error) => console.error("Error al obtener datos:", error)); //Si ocurre un error se muestra en la consola
  }, []);

  return (
    //Render del componente
    <div className="App">
      <img
        src="/src/assets/Mototecwhite.png"
        alt=""
        className="logoproyecciones"
      />
      <h1>📈 Proyección de Ventas MotoTec (2023–2027)</h1>

      <h2>Ventas Proyectadas</h2>
      <table className="ventas">
        <thead>
          <tr>
            <th>Año</th>
            <th>Tipo 1</th>
            <th>Tipo 2</th>
            <th>Tipo 3</th>
            <th>Tipo 4</th>
          </tr>
        </thead>
        <tbody>
          {/* //Ciclo que recorre la matriz de ventas futuras y las imprime en tablas HTML */}
          {ventas.map((fila, i) => (
            <tr key={i}>
              <td>{años[i]}</td>
              {fila.map((valor, j) => (
                <td key={j}>{valor.toFixed(0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Componentes Requeridos</h2>
      <table className="componentes">
        <thead>
          <tr>
            <th>Año</th>
            {/* //Ciclo que recorre la matriz de años y los imprime en tablas HTML */}
            {[...Array(10)].map((_, i) => (
              <th key={i}>Comp {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* //Ciclo que recorre la matriz de componentes y las imprime en tablas HTML */}
          {componentes.map((fila, i) => (
            <tr key={i}>
              <td>{años[i]}</td>
              {fila.map((valor, j) => (
                <td key={j}>{valor.toFixed(0)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={"/"}>
        <button className="boton">Volver a Inicio</button>
      </Link>
      <button className="boton">Siguiente</button>
    </div>
  );
}

export default Proyeccion;
