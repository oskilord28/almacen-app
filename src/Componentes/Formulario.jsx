import React, { useState} from 'react';

const Formulario = ({ nuevoElemento }) => {
    const [form, setform] = useState({
        categoria:"",
        nombre:"",
        fecha:"",
        precio:""
        });

    

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        nuevoElemento(form)
        console.log(form)
}

    return (
        <form onSubmit={handleSubmit}>
            <select name="categoria" className="form-select" value={form.categoria} onChange={handleChange} required>
                <option value="">----</option>
                <option value="egresos">Egresos</option>
                <option value="ingresos">Ingresos</option>
                
            </select>
            <label> Destinatario:

            <input type="text" name="nombre"  value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
            </label>
           
            <label>  Precio :
            <input type="number"  name="precio" value={form.precio} onChange={handleChange} placeholder="$$" required />
            </label>
            <label>  Fecha :
            <input type="date"  name="fecha" value={form.fecha} onChange={handleChange}  required />
            </label>
            
            <button type="submit" className='btn btn-secondary'>Agregar</button>            
            </form>
    );
};

export default Formulario;
