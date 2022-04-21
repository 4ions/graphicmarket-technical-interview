import React, { useState } from 'react';
import withRouter from '../../components/withRouter';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


import './login.css'
import Title from './components/title/title';
import Label from './components/label/label';
import Form from './components/form/form';
import { API } from '../../config';
import axios from 'axios';

const cookies = new Cookies();

const Login = () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [hasError, setHasError] = useState(false);
    

    function handleChange(name, value) {
        if (name === 'usuario') {
            setUser(value);
        } else {
            if (value.length < 6) {
                setPasswordError(true);
            } else {
                setPasswordError(false);
                setPassword(value)
            }
        }
    };

    if (isLogin) {
        window.location.href = "/equipos";
    }

    async function ifMatch(params) {
        if (params.username.length > 0 && params.password.length > 0) {
            const options = {
                data: params,
                method: 'POST',
                url: API + "/api/auth/v01/register/signin",
                headers: { "Content-Type": "application/json" }
            }
            try {
                const res = await axios.request(options)
                cookies.set('accesstoken', res.data.accessToken, {path:'/'})
                setIsLogin(true);
                setHasError(false);

            } catch (error) {
                console.log(error);
                setIsLogin(false);
                setHasError(true);
            }
        }
        else {
            setIsLogin(false);
            setHasError(true);
        }
    }

    function handleSubmit() {
        let account = {
            username, password
        };
        if (account) {
            ifMatch(account);
        }
    }

    return (
        <div className='login-container'>
            <div className='login-content'>

                <Title text='Iniciar sesion' />
                    {hasError && 
                    <label className='label-error'>Su usuario o contraseña son incorrectos o no existen.</label>    
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
                {passwordError &&
                    <label className='label-error'>
                    Contraseña invalida o incompleta
                </label>
                }
                
                <button className='submit-button' onClick={handleSubmit}>
                    Ingresar
                </button>
                <a href="/register">
                    <small>
                        Registrarse
                    </small>
                </a>
                
            </div>
            
        </div>
    )
};

export default withRouter(Login);