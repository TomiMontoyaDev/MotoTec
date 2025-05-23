import "/Inicio.css";
import "/assets/Mototec.png";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="Appinicio">
      <div className="contenido">
        <div className="inicio">
          <img src="/src/assets/Mototec.png" alt="" className="logo" />
          <h1 className="titulo">Inicio</h1>
          <p className="subtitulo">Bienvenido a Mototec</p>
          <Link to={"/app"}>
            <button className="boton">Ver el resultado de la proyeccion</button>
          </Link>
        </div>
      </div>

      <video src="/src/assets/motosbackground.mp4" autoPlay loop muted></video>
      <div className="fondo"></div>
    </div>
  );
}

export default Inicio;
