import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Form from './components/form2/form'
import { API } from '../../config';
import axios from 'axios';
import Label from './components/label/label';
import Title from './components/title/title';
import Header from '../../components/header/header';
import './new-update-player.css'
import Cookies from 'universal-cookie';
import { UseFetch } from '../../components/useFectch';

const cookies = new Cookies();

const NewUpdatePlayer = () => {
    const token = cookies.get('accesstoken');
    if (typeof token === 'undefined') {
        window.location.href = "/";
        
    }

    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [squad_number, setSquad_number] = useState(0);
    const [position, setPosition] = useState('');
    const [hasError, setHasError] = useState(false);
    const [nationality, setNationality] = useState('');
    const [error, setError] = useState('');
    const [team_id, setTeam_id] = useState(0);
    

    function handleChange(name, value) {
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'age':
                setAge(parseInt(value));
                break;
            case 'squad_number':
                setSquad_number(parseInt(value));
                break;
            case 'position':
                setPosition(value);
                break;
            case 'nationality':
                setNationality(value);
                break;
            case 'team_id':
                setTeam_id(parseInt(value));
                break;
            default:
                break;
        }
        
    };

    const teams = cookies.get('equipos');
    
    async function IfMatch(params) {
        console.log("Params: ",params)
        if (params.name.length > 0 && params.team_id !== 0) {
            console.log(params)
            const options = {
                data: params,
                method: 'POST',
                url: API + "/api/jugador",
                headers: { "Content-Type": "application/json", "accesstoken":token }
            }
            try {
                console.log("Before", options)
                const res = await axios.request(options)
                console.log(res)
                if (res.status === 200) {
                    window.location.href = "/jugadores";
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
    const handleSelect = (e) => {
        setTeam_id(e.target.value);
    };
    console.log(team_id)
    function handleSubmit() {
        let account = {
            name, age, squad_number, position, nationality, team_id
        };
        if (account) {
            IfMatch(account);
        }
    }

    return (
        
        <div className='login-container'>
            <Header />
            <div className='login-content'>

                <Title text='Crear nuevo jugador' />
                <Label text='Nombre' />
                <Form
                    attribute={{
                        id: 'name',
                        name: 'name',
                        type: 'text',
                        placeholder: 'Ingrese el nombre del jugador'
                    }}
                    handleChange={handleChange}
                />
                <Label text='Edad' />
                <Form 
                    attribute={{
                        id: 'age',
                        name: 'age',
                        type: 'text',
                        placeholder: 'Ingrese la edad del jugador'
                    }}
                    handleChange={handleChange}
                />
                <Label text='Numero de la camiseta' />
                <Form 
                    attribute={{
                        id: 'squad_number',
                        name: 'squad_number',
                        type: 'text',
                        placeholder: 'Ingrese el numero de la camiseta'
                    }}
                    handleChange={handleChange}
                />
                <Label text='Posición' />
                <Form 
                    attribute={{
                        id: 'position',
                        name: 'position',
                        type: 'text',
                        placeholder: 'Ingrese la posicion del jugador'
                    }}
                    handleChange={handleChange}
                />
                <Label text='Nacionalidad' />
                <Form 
                    attribute={{
                        id: 'nationality',
                        name: 'nationality',
                        type: 'text',
                        placeholder: 'Ingrese la nacionalidad del jugador'
                    }}
                    handleChange={handleChange}
                />
                
                <Label text="Seleccione el equipo*" />
                
                <select value={team_id} onChange={handleSelect}>
                    <option value='0'>
                        -
                    </option>
                    {
                        teams.map(event => {
                            console.log(event)
                            return (
                                <option value={event.id}>
                                    {event.name}
                                </option>
                            )
                        })
                    }
                </select>
                <Link to='/jugadores'>
                    <button className='submit-button' onClick={handleSubmit}>
                        
                        Crear jugador
                    </button>
                </Link>
                    
                
            </div>
                    
        </div>
    )
}

export default NewUpdatePlayer;