import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const GraficoProyecciones = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://mototec-backend.onrender.com/proyecciones")
      .then((res) => res.json())
      .then((json) => {
        const { años, ventas_futuras } = json;

        const datosFormateados = años.map((año, i) => ({
          año,
          Tipo1: ventas_futuras[i][0],
          Tipo2: ventas_futuras[i][1],
          Tipo3: ventas_futuras[i][2],
          Tipo4: ventas_futuras[i][3],
        }));

        setData(datosFormateados);
      })
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="año" />
          <YAxis tickFormatter={(value) => Math.round(value)} />
          <Tooltip formatter={(value) => Math.round(value)} />
          <Legend />
          <Line type="monotone" dataKey="Tipo1" stroke="#8884d8" />
          <Line type="monotone" dataKey="Tipo2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Tipo3" stroke="#ffc658" />
          <Line type="monotone" dataKey="Tipo4" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
      <Link to={"/app"}>
        <button className="boton">Volver</button>
      </Link>
    </>
  );
};

export default GraficoProyecciones;
