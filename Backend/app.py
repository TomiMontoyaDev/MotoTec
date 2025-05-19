from flask import Flask, jsonify
import numpy as np
from numpy.linalg import lstsq
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  #Para recibir peticiones de React

@app.route('/proyecciones')
def proyecciones():
    años = np.arange(2013, 2023) #Rango de ventas de motos desde 2013 hasta 2023
    ventas = np.array([ #Matriz con registro de ventas historicas de cada tipo de moto en cada year
        [172, 89, 18, 28],
        [185, 116, 49, 33],
        [202, 155, 98, 49],
        [225, 188, 96, 44],
        [252, 200, 148, 59],
        [286, 199, 173, 72],
        [316, 240, 204, 70],
        [342, 245, 235, 96],
        [371, 280, 266, 140],
        [402, 302, 297, 250],
    ])
    componentes = np.array([ #Matriz de componentes (unidades por moto) para cada tipo son 10
        [1, 1, 1, 0],
        [2, 0, 1, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [3, 2, 0, 0],
        [1, 4, 0, 0],
        [5, 2, 0, 1],
        [1, 1, 2, 0],
        [1, 1, 0, 0],
    ])

    años_futuros = np.arange(2023, 2028) #Rango de years guardados en una variable
    X = np.vstack([np.ones_like(años), años]).T #Convierte los arrays en 1 ([2023]->[1]) con el ones_like y los fusiona ([N,]->[1,N]) vstack

    ventas_futuras = [] #Matriz de ventas futuras
    for i in range(ventas.shape[1]): #Bucle que itera en la matriz ventas
        coeffs, _, _, _ = lstsq(X, ventas[:, i], rcond=None) #Calcula los coeficientes usando minimos cuadrados de lstsq que reemplazan la recta y = a + b * x donde a es el intercepto y b es la pendiente
        a, b = coeffs
        pred = a + b * años_futuros
        ventas_futuras.append(pred)

    ventas_futuras = np.array(ventas_futuras).T #Transpone la matriz a una matriz Numpy donde las filas son los años futuros y las columnas productos
    componentes_necesarios = ventas_futuras @ componentes.T #Multiplica la matriz de ventas futuras con la matriz de componentes usando el operador @ que es el producto matricial y la traspone con .T

    return jsonify({ #Retorna la informacion en un JSON para poder usarla en React
        "años": años_futuros.tolist(),
        "ventas_futuras": ventas_futuras.tolist(),
        "componentes": componentes_necesarios.tolist()
    })

if __name__ == '__main__': #Ejecutar la app con flask
    app.run(debug=True)