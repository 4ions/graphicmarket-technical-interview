import React from 'react';
import './label.css'

const Label = ({text}) => {
    return (
        <div className='label-container'>
            <label>{text}</label>
        </div>
    )
};

export default Label