import React from 'react';
import './form.css'

const Form = ({ attribute, handleChange, param }) => {//
    return (
        <div className='input-container'>
            <input
                id={attribute.id}//Identificar con que input estamos trabajando
                name={attribute.name}//Accesibilidad y poder nombrar un input y trabajar con funciones dinamicas
                placeholder={attribute.placeholder}//el texto dentro del cuadro
                type={attribute.type}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className={param ? 'input-error' : 'regular-style'}
            />
        </div>
    )
};

export default Form;