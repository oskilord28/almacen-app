// import React,{useState}from 'react';


// const Tabla = ({ productos, eliminarElemento, editarElemento }) => {
//     const [form, setForm] = useState(null)


//     const eliminar = (elemento) =>
//     {
//         const conf=window.confirm("seguro de eliminar este producto?")
//         if(conf){
//             eliminarElemento(elemento)
//         }



//     }

//     // const editar = (elemento) =>{
//     //     setForm(elemento)
//     // }
    
//     const handleChange =(e) =>{
//     setForm({...form, [e.target.name]: e.target.value})
    
//     }

//     const handleSubmit = () =>{
//         const conf= window.confirm("esta seguro de editar?")
//         if(conf){
//             editarElemento(form)
//             setForm(null)
//         }
//     }

//     return (
//         <table className="table info table-striped my-5 border-end border-start border-primary-subtle w-100">
//             <thead>
//                 <tr>
                    
//                     <th>Categoría</th>
//                     <th>Nombre</th>
                    
//                     <th>Precio </th>
                   
//                     <th>Acciones</th>

//                 </tr>
//             </thead>
//             <tbody>
//                 {productos.map(p=>(form!== null && form.id=== p.id)
//                  ?
//                  <tr key={p.id}>
//                     <td>
                        
//                         <select  name="categoria"
//                             value={form.categoria}
//                             onChange={handleChange}
//                                 className='form-select'>
//                                     <option value="seleccione">Seleccione</option>
//                        <option value="egresos">Egresos</option>
//                         <option value="ingresos">Ingresos</option>
                       
//                                 </select>
                        
                   
//                     </td>
//                     <td>
//                         <input onChange={handleChange} name="nombre" type="text" className='form-control' value={form.nombre}/>
//                     </td>
                    
//                     <td>
//                         <input onChange={handleChange}  name ="precio" type="number" value={form.precio}/>
//                     </td>
//                     {/* <td>
//                         {form.categoria * form.precio}
//                      </td> */}
//                     <td style={{ whiteSpace: 'nowrap' }}>    
//                             <button className="btn btn-primary mx-2 "onClick={()=>handleSubmit(form)}>Aceptar</button>
            
//                             <button className="btn btn-danger mx-2 " onClick={()=> setForm(null)}>Cancelar</button>
//                         </td>
                        


//                  </tr>
//                  :
            
//                     <tr key ={p.id}>
//                         <td>{p.categoria}</td>
//                         <td>{p.nombre}</td>
                        
                       
//                          <td>{p.precio}</td>
//                          {/* <td>{p.cantidad * p.precio}</td> */}
//                         <td>
//                         <button onClick={()=> setForm(p)} className="btn btn-warning mx-2">Editar</button>
//                         <button onClick={() => eliminar(p)} className="btn btn-danger mx-2 " >Eliminar</button>
//                         </td>

//                     </tr>
                
//                     )}
//             </tbody>
//         </table>
//     );
  
// };

// export default Tabla;

import React, { useState, useEffect } from 'react';

const Tabla = ({ productos, eliminarElemento, editarElemento }) => {
    const [form, setForm] = useState(null);
    const [totales, setTotales] = useState({ ingresos: 0, egresos: 0, diferencia: 0 });

    useEffect(() => {
        calcularTotales();
    }, [productos]);

    const calcularTotales = () => {
        let ingresos = 0;
        let egresos = 0;

        productos.forEach(p => {
            if (p.categoria === 'ingresos') {
                ingresos += parseFloat(p.precio);
            } else if (p.categoria === 'egresos') {
                egresos += parseFloat(p.precio);
            }
        });

        setTotales({
            ingresos,
            egresos,
            diferencia: ingresos - egresos
        });
    };

    const eliminar = (elemento) => {
        const conf = window.confirm("¿Seguro de eliminar este producto?");
        if (conf) {
            eliminarElemento(elemento);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const conf = window.confirm("¿Está seguro de editar?");
        if (conf) {
            editarElemento(form);
            setForm(null);
        }
    };

    return (
        <div>
            <table className="table info table-striped my-5 border-end border-start border-primary-subtle w-100">
                <thead>
                    <tr>
                        <th>Categoría</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (form !== null && form.id === p.id) ?
                        <tr key={p.id}>
                            <td>
                                <select
                                    name="categoria"
                                    value={form.categoria}
                                    onChange={handleChange}
                                    className='form-select'>
                                    <option value="seleccione">Seleccione</option>
                                    <option value="egresos">Egresos</option>
                                    <option value="ingresos">Ingresos</option>
                                </select>
                            </td>
                            <td>
                                <input onChange={handleChange} name="nombre" type="text" className='form-control' value={form.nombre} />
                            </td>
                            <td>
                                <input onChange={handleChange} name="precio" type="number" value={form.precio} />
                            </td>
                            <td>
                                <input onChange={handleChange} name="fecha" type="date" className='form-control' value={form.fecha} />
                            </td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <button className="btn btn-primary mx-2" onClick={() => handleSubmit(form)}>Aceptar</button>
                                <button className="btn btn-danger mx-2" onClick={() => setForm(null)}>Cancelar</button>
                            </td>
                        </tr>
                        :
                        <tr key={p.id}>
                            <td>{p.categoria}</td>
                            <td>{p.nombre}</td>
                            <td>{p.precio}</td>
                            <td>{p.fecha}</td>
                            <td>
                                <button onClick={() => setForm(p)} className="btn btn-warning mx-2">Editar</button>
                                <button onClick={() => eliminar(p)} className="btn btn-danger mx-2">Eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="totales">
                <p>Total Ingresos: ${totales.ingresos}</p>
                <p>Total Egresos: ${totales.egresos}</p>
                <p>Diferencia: ${totales.diferencia}</p>
            </div>
        </div>
    );
};

export default Tabla;
