import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Inicio from "./Inicio.jsx";
import Proyeccion from "./Proyecciones.jsx";
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/app" element={<Proyeccion />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
