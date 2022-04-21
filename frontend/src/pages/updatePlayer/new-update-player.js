import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Form from './components/form2/form'
import { API } from '../../config';
import axios from 'axios';
import Label from './components/label/label';
import Title from './components/title/title';
import Header from '../../components/header/header';
import './new-update-player.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const UpdatePlayer = () => {
    const token = cookies.get('accesstoken');
    if (typeof token === 'undefined') {
        window.location.href = "/";
        
    }

    const [id, setId] = useState(0);
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
        if (params.name.length > 0 ) {
            const options = {
                data: params,
                method: 'PUT',
                url: API + `/api/jugador/${id}`,
                headers: { "Content-Type": "application/json", "accesstoken":token }
            }
            try {
                const res = await axios.request(options)
                console.log(res)
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

    function handleSubmit() {
        let account = {
            name, age, squad_number, position, nationality
        };
        if (account) {
            IfMatch(account);
        }
    }

    useEffect(() => {
        setId(localStorage.getItem('id'));
        setName(localStorage.getItem('name'));
        setAge(localStorage.getItem('age'));
        setSquad_number(localStorage.getItem('squad_number'));
        setPosition(localStorage.getItem('position'));
        setNationality(localStorage.getItem('nationality'));
    },[])
    return (
        
        <div className='login-container'>
            <Header />
            <div className='login-content'>

                <Title text='Actualizar jugador' />
                <Label text='Nombre' />
                <Form
                    attribute={{
                        id: 'name',
                        name: 'name',
                        type: 'text',
                        value: name,
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
                        value: age,
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
                        value: squad_number,
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
                        value: position,
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
                        value: nationality,
                        placeholder: 'Ingrese la nacionalidad del jugador'
                    }}
                    handleChange={handleChange}
                />
                
                
                    <Link to="/jugadores">
                        <button className='submit-button' onClick={handleSubmit}>
                            Actualizar Jugador
                        </button>
                    
                    </Link>
                
            </div>
                    
        </div>
    )
}

export default UpdatePlayer;