import React, { useEffect, useState} from 'react';
import Form from './components/form2/form'
import { API } from '../../config';
import axios from 'axios';
import Label from './components/label/label';
import Title from './components/title/title';
import Header from '../../components/header/header';
import './new-update.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const NewUpdateTeam = () => {
    const token = cookies.get('accesstoken');

    const [name, setName] = useState('');
    const [league, setLeage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');

    function handleChange(name, value) {
        if (name === 'name') {
            setName(value);
        } else if (name === 'league'){
            setLeage(value)
        } else if (name === 'country') {
            setCountry(value);
        }
    };

    
    async function IfMatch(params) {
        if (params.name.length > 0 && params.country.length > 0 && params.league.length > 0) {
            const options = {
                data: params,
                method: 'POST',
                url: API + "/api/equipo",
                headers: { "Content-Type": "application/json", "accesstoken":token }
            }
            try {
                const res = await axios.request(options)
                if (res.status === 201) {
                    window.location.href = "/equipos";
                }
                setHasError(false);

            } catch (error) {
                
                setError(error.response.data.message)
                setHasError(true);
            }

        }
        else {
            setHasError(true);
        }
    }

    function handleSubmit() {
        let account = {
            name, league, country
        };
        if (account) {
            IfMatch(account);
        }
    }

    return (
        
        <div className='login-container'>
            <Header />
            <div className='login-content'>

                <Title text='Crear nuevo equipo' />
                    {hasError && 
                        <label className='label-error'>{error} </label>    
                }    
                <Label text='Nombre' />
                <Form
                    attribute={{
                        id: 'name',
                        name: 'name',
                        type: 'text',
                        placeholder: 'Ingrese el nombre del equipo'
                    }}
                    handleChange={handleChange}
                />
                <Label text='Liga' />
                <Form 
                    attribute={{
                        id: 'league',
                        name: 'league',
                        type: 'text',
                        placeholder: 'Ingrese la liga a la que pertenece el equipo'
                    }}
                    handleChange={handleChange}
                    param={passwordError}
                />
                <Label text='Pais' />
                <Form 
                    attribute={{
                        id: 'country',
                        name: 'country',
                        type: 'text',
                        placeholder: 'Ingrese el pais donde juega el equipo'
                    }}
                    handleChange={handleChange}
                />
                {passwordError &&
                    <label className='label-error'>
                    Contraseña invalida o incompleta
                </label>
                }
                
                    <button className='submit-button' onClick={handleSubmit}>
                        
                    Crear equipo
                    </button>
                
            </div>
                    
        </div>
    )
}

export default NewUpdateTeam;