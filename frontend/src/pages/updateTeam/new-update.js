import React, { useEffect, useState} from 'react';
import Form from './components/form2/form'
import { API } from '../../config';
import axios from 'axios';
import Label from './components/label/label';
import Title from './components/title/title';
import Header from '../../components/header/header';
import './new-update.css'
import Cookies from 'universal-cookie';
//import { Form } from 'semantic-ui-react';

const cookies = new Cookies();

const UpdateTeam = () => {
    const token = cookies.get('accesstoken');
    if (typeof token === 'undefined') {
        window.location.href = "/";
        
    }

    const [id, setId] = useState(0);
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
                method: 'PUT',
                url: API + `/api/equipo/${id}`,
                headers: { "Content-Type": "application/json", "accesstoken":token }
            }
            try {
                const res = await axios.request(options)
                if (res.status === 200) {
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

    useEffect(() => {
        setId(localStorage.getItem('id'));
        setName(localStorage.getItem('name'));
        setLeage(localStorage.getItem('league'));
        setCountry(localStorage.getItem('country'));
    }, [])
    return (
        
        <div className='login-container'>
            <Header />
            <div className='login-content'>

                <Title text='Actualizar equipo' />
                    {hasError && 
                        <label className='label-error'>{error} </label>    
                }    
                <Label text='Nombre' />
                <Form
                    attribute={{
                        id: 'name',
                        name: 'name',
                        type: 'text',
                        placeholder: 'Ingrese el nombre del equipo',
                        value:name
                    }}
                    handleChange={handleChange}
                />
                <Label text='Liga' />
                <Form 
                    attribute={{
                        id: 'league',
                        name: 'league',
                        type: 'text',
                        placeholder: 'Ingrese la liga a la que pertenece el equipo',
                        value: league

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
                        placeholder: 'Ingrese el pais donde juega el equipo',
                        value:country
                    }}
                    handleChange={handleChange}
                />
                {passwordError &&
                    <label className='label-error'>
                    Contraseña invalida o incompleta
                </label>
                }
                
                    <button className='submit-button' onClick={handleSubmit}>
                        
                    Guardar Cambios
                    </button>

            </div>
                    
        </div>
    )
}

export default UpdateTeam;