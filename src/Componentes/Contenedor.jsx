import React, { useState, useEffect } from 'react';

import Header from './Header';
import Formulario from './Formulario';
import Tabla from './Tabla';
import axios from 'axios';


const Contenedor = () => {
    const url = "http://localhost:5000/productos";

    const [productos, setProductos] = useState([]);
    

    useEffect(() => {
        axios.get(url)
            .then(resp => setProductos(resp.data));
    }, []);

    const nuevoElemento = (nuevo) => {
        axios.post(url, nuevo)
            .then((resp) => {
                setProductos([...productos, resp.data]);
            });
    };

    const eliminarElemento = (elemento) => {
        axios.delete(url + "/" + elemento.id)
            .then(() => setProductos(productos.filter(p => p.id !== elemento.id)));
    };

    const editarElemento = (elemento) => {
        const nuevosProductos = [...productos]
        const index = productos.findIndex(p => p.id === elemento.id)

        nuevosProductos[index] = elemento

        axios.put(url + "/" + elemento.id, elemento)
            .then(() => setProductos(nuevosProductos))
    };

   
    return (
        <div className='kpo'>
            <div className='contenedor'>
                <Header titulo={"Productos"} />
                <Formulario nuevoElemento={nuevoElemento}  />
                <Tabla productos={productos}  editarElemento={editarElemento} eliminarElemento={eliminarElemento}  />
            </div>
        </div>
    );
};

export default Contenedor;
