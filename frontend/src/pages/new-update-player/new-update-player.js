import React, { useEffect, useState} from 'react';
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
        console.log(`name: ${value}, value ${name}`);
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
        // if (name === 'name') {
        //     setName(value);
        // } else if (name === 'league'){
        //     setLeage(value)
        // } else if (name === 'country') {
        //     setCountry(value);
        // }
    };

    const teams = cookies.get('equipos');
    
    async function IfMatch(params) {
        if (params.name.length > 0 && params.team_id !== 0) {
            const options = {
                data: params,
                method: 'POST',
                url: API + "/api/jugador",
                headers: { "Content-Type": "application/json", "accesstoken":token }
            }
            try {
                const res = await axios.request(options)
                if (res.status === 201) {
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
        console.log(e.target.value)
        setTeam_id(e.target.value);
    };

    function handleSubmit() {
        let account = {
            name, age, squad_number, position, nationality, team_id
        };
        if (account) {
            console.log(account)
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
                    {
                        teams.map(event => {
                            return (
                                <option value={event.id}>
                                    {event.name}
                                </option>
                            )
                        })
                    }
                </select>
                
                    <button className='submit-button' onClick={handleSubmit}>
                        
                    Crear jugador
                    </button>
                
            </div>
                    
        </div>
    )
}

export default NewUpdatePlayer;