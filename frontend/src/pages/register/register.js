import React, { useState } from 'react';
import withRouter from '../../components/withRouter';

import './register.css'
import Title from './components/title/title';
import Label from './components/label/label';
import Form from './components/form/form';
import { API } from '../../config';
import axios from 'axios';

/* Pages */

const Register = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    function handleChange(name, value) {
        if (name === 'usuario') {
            setUser(value);
        } else if (name === 'contraseña'){
            if (value.length < 6) {
                setPasswordError(true);
            } else {
                setPasswordError(false);
                setPassword(value)
            }
        } else if (name === 'correo') {
            setEmail(value);
        }
    };

    
    async function IfMatch(params) {
        if (params.username.length > 0 && params.password.length > 0 && params.email.length > 0) {
            const options = {
                data: params,
                method: 'POST',
                url: API + "/api/auth/v01/register/signup",
                headers: { "Content-Type": "application/json" }
            }
            try {
                console.log("sdsds")
                console.log(options)
                const res = await axios.request(options)
                console.log('sdasdsddsdd')
                if (res.status === 201) {
                    window.location.href = "/";
                }
                setHasError(false);

            } catch (error) {
                console.log("Aqui")
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
            username, password, email
        };
        if (account) {
            IfMatch(account);
        }
    }

    return (
        <div className='login-container'>
            <div className='login-content'>

            <Title text='Registro' />
                {hasError && 
                    <label className='label-error'>{error} </label>    
            }    
            <Label text='Usuario' />
            <Form
                attribute={{
                    id: 'usuario',
                    name: 'usuario',
                    type: 'text',
                    placeholder: 'Ingrese su usuario'
                }}
                handleChange={handleChange}
            />
            <Label text='Contraseña' />
            <Form 
                attribute={{
                    id: 'contraseña',
                    name: 'contraseña',
                    type: 'password',
                    placeholder: 'Ingrese su contraseña'
                }}
                handleChange={handleChange}
                param={passwordError}
            />
            <Label text='Email' />
            <Form 
                attribute={{
                    id: 'email',
                    name: 'correo',
                    type: 'email',
                    placeholder: 'example@gmail.com'
                }}
                handleChange={handleChange}
            />
            {passwordError &&
                <label className='label-error'>
                Contraseña invalida o incompleta
            </label>
            }
            
                <button className='submit-button' onClick={handleSubmit}>
                    
                Registrarse
                </button>
                <a href="/">
                    <small>
                        Iniciar Sesion
                    </small>
                </a>
            </div>
                    
        </div>
    )
};

export default withRouter(Register);